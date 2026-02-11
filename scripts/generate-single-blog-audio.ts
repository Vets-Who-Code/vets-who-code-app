import fs from "fs";
import path from "path";
import cloudinary from "@/lib/cloudinary";

// Helper function to convert PCM data to WAV format
export function pcmToWav(
  pcmData: Buffer,
  sampleRate = 24000,
  channels = 1,
): Buffer {
  const bitsPerSample = 16;
  const blockAlign = channels * (bitsPerSample / 8);
  const byteRate = sampleRate * blockAlign;
  const dataSize = pcmData.length;
  const fileSize = 36 + dataSize;

  const header = Buffer.alloc(44);

  // RIFF chunk descriptor
  header.write("RIFF", 0);
  header.writeUInt32LE(fileSize, 4);
  header.write("WAVE", 8);

  // fmt sub-chunk
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
  header.writeUInt16LE(1, 20); // AudioFormat (1 for PCM)
  header.writeUInt16LE(channels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);

  // data sub-chunk
  header.write("data", 36);
  header.writeUInt32LE(dataSize, 40);

  return Buffer.concat([header, pcmData]);
}

interface GeminiTTSResponse {
  candidates?: Array<{
    content: {
      parts: Array<{
        text?: string;
        inlineData?: {
          mimeType: string;
          data: string;
        };
      }>;
    };
  }>;
  error?: {
    message: string;
    code: number;
  };
}

async function generateAudioWithGemini(
  text: string,
  apiKey: string,
): Promise<Buffer> {
  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text,
            },
          ],
        },
      ],
      generationConfig: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: "Kore",
            },
          },
        },
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Gemini TTS API request failed: ${response.status} ${response.statusText}\n${errorText}`,
    );
  }

  const data = (await response.json()) as GeminiTTSResponse;

  if (data.error) {
    throw new Error(`Gemini TTS API error: ${data.error.message}`);
  }

  if (!data.candidates || data.candidates.length === 0) {
    throw new Error("No candidates returned from Gemini TTS API");
  }

  const audioData = data.candidates[0].content.parts.find(
    (part) => part.inlineData,
  );

  if (!audioData || !audioData.inlineData) {
    throw new Error("No audio data returned from Gemini TTS API");
  }

  const pcmData = Buffer.from(audioData.inlineData.data, "base64");
  return pcmToWav(pcmData, 24000, 1);
}

async function uploadToCloudinary(
  audioBuffer: Buffer,
  publicId: string,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "video", // Audio files use 'video' resource type in Cloudinary
        public_id: publicId,
        folder: "blog-audio",
        format: "wav",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result?.secure_url);
        }
      },
    );

    uploadStream.end(audioBuffer);
  });
}

async function main() {
  const blogSlug = process.argv[2];

  if (!blogSlug) {
    console.error("Please provide a blog slug as an argument.");
    console.error("Usage: npm run generate-blog-audio <blog-slug>");
    process.exit(1);
  }

  const apiKey =
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_PRIVATE_KEY;

  if (!apiKey) {
    console.error(
      "GOOGLE_GENERATIVE_AI_API_KEY environment variable is not set.",
    );
    console.error("Please add this key to your .env file.");
    process.exit(1);
  }

  const blogPath = path.join(process.cwd(), "src/data/blogs", `${blogSlug}.md`);

  if (!fs.existsSync(blogPath)) {
    console.error(`Blog file not found: ${blogPath}`);
    process.exit(1);
  }

  const blogContent = fs.readFileSync(blogPath, "utf-8");

  // Extract content after frontmatter
  const contentMatch = blogContent.match(/---\n[\s\S]*?\n---\n([\s\S]*)/);

  if (!contentMatch) {
    console.error("Could not parse blog content");
    process.exit(1);
  }

  const content = contentMatch[1];

  // Clean the content: remove markdown formatting and extract readable text
  const cleanContent = cleanMarkdownToText(content);
  const audioBuffer = await generateAudioWithGemini(cleanContent, apiKey);
  uploadToCloudinary(audioBuffer, blogSlug);
}

if (require.main === module) {
  main().catch((error) => {
    console.error("Script failed:", error);
    process.exit(1);
  });
}

export function cleanMarkdownToText(markdown: string): string {
  return markdown
    .replace(/^#{1,6}\s+/gm, "") // Remove headers
    .replace(/\*\*/g, "") // Remove bold
    .replace(/\*/g, "") // Remove italics
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Remove links but keep text
    .replace(/<[^>]+>/g, "") // Remove HTML tags
    .replace(/^[-*+]\s+/gm, "") // Remove list markers
    .trim();
}
