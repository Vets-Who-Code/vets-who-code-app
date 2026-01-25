import fs from 'fs';
import path from 'path';
import { getAllBlogs } from '../src/lib/blog';

const audioDir = path.join(process.cwd(), 'public/audio/blogs');

// Helper function to convert PCM data to WAV format
function pcmToWav(pcmData: Buffer, sampleRate: number = 24000, channels: number = 1): Buffer {
  const bitsPerSample = 16;
  const blockAlign = channels * (bitsPerSample / 8);
  const byteRate = sampleRate * blockAlign;
  const dataSize = pcmData.length;
  const fileSize = 36 + dataSize;

  const header = Buffer.alloc(44);

  // RIFF chunk descriptor
  header.write('RIFF', 0);
  header.writeUInt32LE(fileSize, 4);
  header.write('WAVE', 8);

  // fmt sub-chunk
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
  header.writeUInt16LE(1, 20); // AudioFormat (1 for PCM)
  header.writeUInt16LE(channels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);

  // data sub-chunk
  header.write('data', 36);
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

async function generateAudioWithGemini(text: string, apiKey: string): Promise<Buffer> {
  // Use Gemini TTS API endpoint with header-based authentication
  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey,
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: text,
            },
          ],
        },
      ],
      generationConfig: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: 'Kore',
            },
          },
        },
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini TTS API request failed: ${response.status} ${response.statusText}\n${errorText}`);
  }

  const data = (await response.json()) as GeminiTTSResponse;

  if (data.error) {
    throw new Error(`Gemini TTS API error: ${data.error.message}`);
  }

  if (!data.candidates || data.candidates.length === 0) {
    throw new Error('No candidates returned from Gemini TTS API');
  }

  // Find the audio data in the response
  const audioData = data.candidates[0].content.parts.find((part) => part.inlineData);

  if (!audioData || !audioData.inlineData) {
    throw new Error('No audio data returned from Gemini TTS API');
  }

  // Convert base64 PCM audio data to Buffer
  // The API returns audio in PCM format at 24000 Hz
  const pcmData = Buffer.from(audioData.inlineData.data, 'base64');

  // Convert PCM to WAV format for browser compatibility
  return pcmToWav(pcmData, 24000, 1);
}

async function main() {
  // Try both API key environment variables
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_PRIVATE_KEY;

  if (!apiKey) {
    console.error('GEMINI_API_KEY or GOOGLE_PRIVATE_KEY environment variable is not set.');
    console.error('Please add one of these keys to your .env file.');
    process.exit(1);
  }

  console.log('Starting blog audio overview generation with Gemini 2.5 Flash Lite...');

  if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
    console.log(`Created audio directory: ${audioDir}`);
  }

  const { blogs } = getAllBlogs('all');

  if (blogs.length === 0) {
    console.log('No blog posts found.');
    return;
  }

  console.log(`Found ${blogs.length} blog posts to process.`);

  for (const blog of blogs) {
    try {
      const audioFilePath = path.join(audioDir, `${blog.slug}.wav`);

      // Skip if audio already exists
      if (fs.existsSync(audioFilePath)) {
        console.log(`Audio already exists for: ${blog.title}`);
        continue;
      }

      console.log(`Processing blog: ${blog.title}`);

      // Clean the content: remove markdown formatting and extract readable text
      const cleanContent = blog.content
        .replace(/^#{1,6}\s+/gm, '') // Remove headers
        .replace(/\*\*/g, '') // Remove bold
        .replace(/\*/g, '') // Remove italics
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links but keep text
        .replace(/<[^>]+>/g, '') // Remove HTML tags
        .replace(/^[-*+]\s+/gm, '') // Remove list markers
        .trim();

      const audioBuffer = await generateAudioWithGemini(cleanContent, apiKey);

      fs.writeFileSync(audioFilePath, audioBuffer);
      console.log(`Audio content written to: ${audioFilePath}`);
      console.log(`Audio URL: /audio/blogs/${blog.slug}.wav`);
    } catch (error) {
      console.error(`Failed to process blog "${blog.title}":`, error);
    }
  }

  console.log('Blog audio overview generation finished.');
}

main()
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });
