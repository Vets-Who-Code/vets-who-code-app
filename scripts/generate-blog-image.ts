import "dotenv/config";
import * as fs from "fs";
import * as path from "path";
import { GoogleGenAI } from "@google/genai";
import { v2 as cloudinary } from "cloudinary";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Missing GEMINI_API_KEY.");
}

const ai = new GoogleGenAI({ apiKey });

const BLOG_DIR = path.resolve(process.cwd(), "src/data/blogs");

function readBlogPost(slug: string) {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);

  if (!filePath) {
    throw new Error(`Blog post not found for slug "${slug}".}`);
  }

  const raw = fs.readFileSync(filePath, "utf-8");

  const titleMatch = raw.match(/^title:\s*["']?(.+?)["']?\s*$/m);
  const title = titleMatch?.[1]?.trim() ?? slug;
  const content = raw.replace(/^---[\s\S]*?---\n?/, "").trim();

  return { title, content };
}

async function extractVisualTheme(title: string, content: string) {
  console.log("Analyzing blog content with Gemini...");

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

  const theme = JSON.parse(cleaned);
  return theme;
}

function buildImagenPrompt(theme: any): string {
  return `Create a high-impact 1950s military propaganda-style poster illustration.

Visual Theme: ${theme.fullThemeDescription}
Subject Focus: ${theme.mainSubject}
Central Visual Metaphor: ${theme.visualMetaphor}
Symbolic Elements to Include: ${theme.symbolicElements}

Style Requirements:
- Era: 1950s American military propaganda poster aesthetic
- Colors: Use ONLY deep navy blue hex code: #091f40, red hex code: #c5203e, and white hexcode: #ffffff. No other colors.
- Line Work: Bold, clean lines and strong geometric shapes
- Composition: High-impact, heroic composition that emphasizes the subject
- Mood: Positive, mission-oriented, uplifting, empowering
- Texture: Subtle distressed paper or aged print texture overlay
- Illustration style: Flat graphic design with strong silhouettes, not photorealistic

Hard Constraints:
- Colors: Use only Navy Blue (#091f40), Red (#c5203e), and White (#ffffff).
- Style: Bold lines, strong shapes, and a positive, mission-oriented feel.
- Texture: Add a subtle, distressed paper texture.
- Text: No text or hex codes.
- Tone: Positive, uplifting, empowering.`;
}

async function generateImage(prompt: string, slug: string): Promise<string> {
  console.log("\nGenerating image with Imagen 4...");

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

  // Save locally so you can preview it before uploading
  const outputPath = path.resolve(process.cwd(), `${slug}.png`);
  fs.writeFileSync(outputPath, Buffer.from(imageBytes, "base64"));
  console.log(`Image saved to: ${outputPath}`);

  return imageBytes;
}

// async function uploadToCloudinary(
//   imageBytes: string,
//   slug: string,
// ): Promise<string> {
//   console.log("\nUploading to Cloudinary...");

//   cloudinary.config({
//     cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//     secure: true,
//   });

//   // Wrap base64 bytes as a data URI so Cloudinary knows the format
//   const dataUri = `data:image/png;base64,${imageBytes}`;

//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload(
//       dataUri,
//       {
//         resource_type: "image",
//         public_id: slug,
//         folder: "blog-images",
//         overwrite: true,
//       },
//       (error, result) => {
//         if (error) {
//           reject(error);
//         } else if (result?.secure_url) {
//           resolve(result.secure_url);
//         } else {
//           reject(new Error("Upload succeeded but no secure_url returned"));
//         }
//       },
//     );
//   });
// }

async function main() {
  // Read the slug from the command line: `ts-node script.ts my-post-slug`
  const slug = process.argv[2];
  if (!slug) {
    throw new Error("No slug provided as argument.");
  }

  // Read the blog post content from markdown file.
  const { title, content } = readBlogPost(slug);

  // Call Gemini to analyze the content and return JSON describing a visual theme.
  const theme = await extractVisualTheme(title, content);

  const prompt = buildImagenPrompt(theme);
  const imageBytes = await generateImage(prompt, slug);

  //   const url = await uploadToCloudinary(imageBytes, slug);
  console.log("\nUploaded! Cloudinary URL:");
  //   console.log(url);
}

main();
