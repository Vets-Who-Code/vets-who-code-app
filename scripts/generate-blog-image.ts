import "dotenv/config";
import * as fs from "fs";
import * as path from "path";
import { GoogleGenAI } from "@google/genai";
import cloudinary from "@/lib/cloudinary";

let ai: GoogleGenAI;
const BLOG_DIR = path.resolve(process.cwd(), "src/data/blogs");
const MAX_RETRIES = 3;

type Theme = {
  mainSubject: string;
  keyMessage: string;
  visualMetaphor: string;
  symbolicElements: string;
  fullThemeDescription: string;
};

type BlogPostSummary = {
  title: string;
  content: string;
};

export function readBlogPost(slug: string): BlogPostSummary {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Blog post not found for slug "${slug}".`);
  }

  const raw = fs.readFileSync(filePath, "utf-8");

  const titleMatch = raw.match(/^title:\s*["']?(.+?)["']?\s*$/m);
  const title = titleMatch?.[1]?.trim() ?? slug;
  const content = raw.replace(/^---[\s\S]*?---\n?/, "").trim();

  return { title, content };
}

async function generateBlogStructuredDataWithGemini(
  title: string,
  content: string,
): Promise<Theme> {
  console.log(
    "\x1b[34m\x1b[43m\x1b[1m🤖 Analyzing blog content with Gemini...\x1b[0m",
  );

  const prompt = `Analyze this blog post and create a visual theme for a 1950s propaganda-style poster.

Blog Title: ${title}
Blog Content: ${content}

Return a JSON object with these exact keys:
{
  "mainSubject": "The primary subject or topic in 1-2 sentences",
  "keyMessage": "The core positive message or transformation described",
  "visualMetaphor": "A single concrete visual metaphor that represents this subject",
  "symbolicElements": "2-4 specific symbolic objects or figures that relate to this topic",
  "fullThemeDescription": "A 3-5 sentence poster theme. Positive, mission-oriented, uplifting. Describe what the image should depict, not text or typography."
}

Rules:
- Theme must come from THIS post's specific subject matter
- All tone must be positive and empowering
- No references to text or typography`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const raw = response.text ?? "";
  const cleaned = raw.replace(/```(?:json)?|```/g, "").trim();

  let theme;

  try {
    theme = JSON.parse(cleaned);
  } catch (err: any) {
    const truncated =
      cleaned.length > 1000 ? `${cleaned.slice(0, 1000)}...` : cleaned;
    throw new Error(
      `Failed to parse Gemini JSON response: ${err?.message ?? err}\nCleaned payload (truncated):\n${truncated}`,
    );
  }

  return theme;
}

export function buildImagenPrompt(theme: Theme): string {
  return `A wordless, text-free 1950s-style graphic illustration. 
  
  This is a PURE VISUAL composition with absolutely no typography, lettering, or characters.

  Visual Theme: ${theme.fullThemeDescription}
  Subject Focus: ${theme.mainSubject}
  Central Visual Metaphor: ${theme.visualMetaphor}
  Symbolic Elements: ${theme.symbolicElements}

  Style & Composition:
  - Aesthetics: 1950s American military propaganda art style, but strictly as a wordless illustration.
  - Composition: A heroic, central silhouette that fills the frame. High-impact geometric shapes.
  - Palette: Limited to three flat colors: Deep Navy Blue, Bold Red, and Crisp White. 
  - Texture: A heavy, distressed vintage paper texture with aged print ink effects.
  - Rendering: Flat vector-style graphics with bold, clean outlines. No photorealism.
  
  Constraint: Zero text. The image communicates entirely through symbolism and imagery. No text at all.`;
}

async function generateImage(prompt: string): Promise<string> {
  console.log(
    "\n\x1b[34m\x1b[43m\x1b[1m🖼️ Generating image with Imagen 4...\x1b[0m",
  );

  const response = await ai.models.generateImages({
    model: "imagen-4.0-generate-001",
    prompt,

    config: {
      numberOfImages: 1,
      aspectRatio: "16:9",
    },
  });

  const imageBytes = response.generatedImages?.[0]?.image?.imageBytes;
  if (!imageBytes) {
    throw new Error("Imagen returned no image bytes.");
  }

  return imageBytes;
}

async function uploadToCloudinary(
  imageBytes: string,
  slug: string,
): Promise<string> {
  // Wrap base64 bytes as a data URI so Cloudinary knows the format
  const dataUri = `data:image/png;base64,${imageBytes}`;

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      dataUri,
      {
        resource_type: "image",
        public_id: slug,
        folder: "blog-images",
        overwrite: true,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else if (result?.secure_url) {
          resolve(result.secure_url);
        } else {
          reject(new Error("Upload succeeded but no secure_url returned"));
        }
      },
    );
  });
}

export async function main() {
  // Read the slug from the command line
  const slug = process.argv[2];
  if (!slug) {
    throw new Error("No slug provided as argument.");
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY.");
  }

  // Initialize the client here
  ai = new GoogleGenAI({ apiKey });

  // Read the blog post content from markdown file.
  const { title, content } = readBlogPost(slug);

  // Call Gemini to analyze the content and return JSON describing a visual theme.
  const theme = await generateBlogStructuredDataWithGemini(title, content);

  const prompt = buildImagenPrompt(theme);
  const imageBytes = await generateImageWithRetry(prompt);

  const url = await uploadToCloudinary(imageBytes, slug);

  console.log(
    `\n\x1b[34m\x1b[43m\x1b[1m Uploaded! Cloudinary URL: ${url}\x1b[0m`,
  );
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

// Detect if any tecxt exists on image
async function detectTextInImage(
  imageBase64: string,
): Promise<{ hasText: boolean; detectedText?: string }> {
  console.log("  🔍 Checking image for text...");

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: [
      {
        role: "user",
        parts: [
          {
            inlineData: {
              mimeType: "image/png",
              data: imageBase64,
            },
          },
          {
            text: `Analyze this image carefully. Does it contain ANY text, letters, numbers, words, labels, captions, or typography of any kind?

Be VERY strict: even a single letter or number counts as text.

Respond with ONLY a JSON object (no markdown fences):
{
  "hasText": true or false,
  "detectedText": "describe any text you see, or null if none"
}`,
          },
        ],
      },
    ],
  });

  const raw = response.text ?? "{}";
  const cleaned = raw.replace(/```(?:json)?|```/g, "").trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    // If parsing fails, assume no text (fail open)
    return { hasText: false };
  }
}

async function generateImageWithRetry(prompt: string): Promise<string> {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    console.log(`\n📸 Attempt ${attempt}/${MAX_RETRIES}`);

    const imageBytes = await generateImage(prompt);

    // Check for text
    const textCheck = await detectTextInImage(imageBytes);

    if (!textCheck.hasText) {
      console.log("  ✅ No text detected - image is valid!");
      return imageBytes;
    }

    console.log(` ⚠️  Text detected: "${textCheck.detectedText}"`);

    if (attempt < MAX_RETRIES) {
      console.log("  🔄 Retrying...");
    } else {
      console.log(
        " ⚠️  Max retries reached. Proceeding with last image (manual review recommended).",
      );
      return imageBytes;
    }
  }

  throw new Error("Failed to generate image without text after max retries");
}
