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

  return Buffer.from(audioData.inlineData.data, "base64");
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
        overwrite: true,
        // The site builds versionless URLs, so a re-upload must purge the CDN
        // copy and its derived f_mp3 transcode or viewers keep the old audio.
        invalidate: true,
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

    uploadStream.end(audioBuffer);
  });
}

export async function main() {
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

  // A post read verbatim sounds like a document being recited. Where a spoken
  // script exists in src/data/blog-audio, narrate that instead. It lives
  // outside src/data/blogs because getSlugs treats every entry there as a post.
  const scriptPath = path.join(
    process.cwd(),
    "src/data/blog-audio",
    `${blogSlug}.md`,
  );
  const content = fs.existsSync(scriptPath)
    ? fs.readFileSync(scriptPath, "utf-8")
    : contentMatch[1];
  console.log(
    fs.existsSync(scriptPath)
      ? "Narrating the spoken script."
      : "No spoken script found; narrating the post body.",
  );

  // Clean the content: remove markdown formatting and extract readable text
  const cleanContent = cleanMarkdownToText(content);
  const chunks = chunkForTts(cleanContent);

  const pause = Buffer.alloc(24000 * 2 * 0.35); // 350ms between chunks
  const pcmParts: Buffer[] = [];
  for (const [index, chunk] of chunks.entries()) {
    console.log(`Generating audio ${index + 1}/${chunks.length}...`);
    // biome-ignore lint/performance/noAwaitInLoops: sequential to respect API rate limits
    const pcm = await generateAudioWithGemini(
      `${NARRATION_STYLE}\n\n${chunk}`,
      apiKey,
    );
    if (index > 0) {
      pcmParts.push(pause);
    }
    pcmParts.push(pcm);
  }

  const audioBuffer = pcmToWav(normalizeLoudness(Buffer.concat(pcmParts)));
  const url = await uploadToCloudinary(audioBuffer, blogSlug);
  console.log(`Uploaded audio: ${url}`);
}


// The TTS model caps a response at 16,384 audio tokens (~655s, ~2,040 words at
// the Kore voice's 187 wpm) and returns finishReason STOP without warning, so
// anything longer must be generated in pieces and concatenated.
// Each chunk is a separate request, so without a fixed directive the model
// picks its own delivery per chunk and the pieces sound like different reads.
export const NARRATION_STYLE =
  "Read the following blog post aloud in a single, steady, clear narration voice. " +
  "Keep an even pace and consistent volume throughout. Do not add commentary.";

// Levels drift within and between chunks (measured at 6.8dB across one post) and
// the raw output clips at 0dBFS. Ride the gain toward a target RMS, slowly enough
// not to pump, then leave a decibel of headroom.
export function normalizeLoudness(pcm: Buffer, sampleRate = 24000): Buffer {
  const TARGET_RMS = 0.158; // -16 dBFS
  const PEAK_CEILING = 0.891; // -1 dBFS
  const SILENCE_RMS = 0.00316; // -50 dBFS
  const MAX_GAIN = 4;
  const MIN_GAIN = 0.25;

  const samples = new Float32Array(pcm.length / 2);
  for (let i = 0; i < samples.length; i++) {
    samples[i] = pcm.readInt16LE(i * 2) / 32768;
  }

  const hop = Math.round(sampleRate * 0.1);
  const smoothing = Math.exp(-0.1 / 1.5); // one-pole, ~1.5s time constant
  const gains: number[] = [];
  let gain = 1;

  for (let start = 0; start < samples.length; start += hop) {
    const end = Math.min(start + hop, samples.length);
    let sum = 0;
    for (let i = start; i < end; i++) {
      sum += samples[i] * samples[i];
    }
    const rms = Math.sqrt(sum / (end - start));

    if (rms > SILENCE_RMS) {
      const wanted = Math.min(MAX_GAIN, Math.max(MIN_GAIN, TARGET_RMS / rms));
      gain = smoothing * gain + (1 - smoothing) * wanted;
    }
    gains.push(gain);
  }

  let peak = 0;
  for (let i = 0; i < samples.length; i++) {
    const frame = Math.min(gains.length - 1, Math.floor(i / hop));
    const next = Math.min(gains.length - 1, frame + 1);
    const blend = (i % hop) / hop;
    samples[i] *= gains[frame] * (1 - blend) + gains[next] * blend;
    peak = Math.max(peak, Math.abs(samples[i]));
  }

  const limiter = peak > PEAK_CEILING ? PEAK_CEILING / peak : 1;

  const out = Buffer.alloc(pcm.length);
  for (let i = 0; i < samples.length; i++) {
    const v = Math.round(samples[i] * limiter * 32767);
    out.writeInt16LE(Math.max(-32768, Math.min(32767, v)), i * 2);
  }
  return out;
}

export function chunkForTts(text: string): string[] {
  // Rates measured across the blog run 170-213 wpm for anything longer than a
  // few hundred words, so the 655s cap holds ~1,850 words at the slow end.
  // 1,700 keeps headroom, and a script written to fit under it is narrated in
  // one take with no seam to hear.
  const WORDS_PER_CHUNK = 1700;
  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim());
  const chunks: string[] = [];
  let current: string[] = [];
  let words = 0;

  for (const paragraph of paragraphs) {
    const count = paragraph.split(/\s+/).length;
    if (words + count > WORDS_PER_CHUNK && current.length > 0) {
      chunks.push(current.join("\n\n"));
      current = [];
      words = 0;
    }
    current.push(paragraph);
    words += count;
  }

  if (current.length > 0) {
    chunks.push(current.join("\n\n"));
  }

  return chunks;
}

export function cleanMarkdownToText(markdown: string): string {
  return markdown
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "") // Remove images (alt text is not narration)
    .replace(/^#{1,6}\s+/gm, "") // Remove headers
    .replace(/\*\*/g, "") // Remove bold
    .replace(/\*/g, "") // Remove italics
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Remove links but keep text
    .replace(/<[^>]+>/g, "") // Remove HTML tags
    .replace(/^[-*+]\s+/gm, "") // Remove list markers
    .trim();
}

if (require.main === module) {
  main().catch((error) => {
    console.error("Script failed:", error);
    process.exit(1);
  });
}
