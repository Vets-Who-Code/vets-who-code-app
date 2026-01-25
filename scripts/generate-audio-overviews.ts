
import { PrismaClient } from '@prisma/client';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';

const prisma = new PrismaClient();
const ttsClient = new TextToSpeechClient();
const writeFileAsync = promisify(fs.writeFile);

const audioDir = path.join(process.cwd(), 'public/audio/lessons');

async function main() {
  console.log('Starting audio overview generation...');

  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.error('GOOGLE_APPLICATION_CREDENTIALS environment variable not set.');
    console.error('Please set it to the path of your Google Cloud service account key file.');
    process.exit(1);
  }

  if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
  }

  const lessons = await prisma.lesson.findMany({
    where: {
      audioUrl: null,
    },
  });

  if (lessons.length === 0) {
    console.log('No lessons found without an audio overview.');
    return;
  }

  console.log(`Found ${lessons.length} lessons to process.`);

  for (const lesson of lessons) {
    try {
      console.log(`Processing lesson: ${lesson.title}`);

      const firstParagraph = lesson.content.split('\n\n')[0];

      const request = {
        input: { text: firstParagraph },
        voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' as const },
        audioConfig: { audioEncoding: 'MP3' as const },
      };

      const [response] = await ttsClient.synthesizeSpeech(request);
      const audioContent = response.audioContent;

      if (audioContent) {
        const audioFilePath = path.join(audioDir, `${lesson.id}.mp3`);
        await writeFileAsync(audioFilePath, audioContent, 'binary');
        console.log(`Audio content written to file: ${audioFilePath}`);

        const audioUrl = `/audio/lessons/${lesson.id}.mp3`;

        await prisma.lesson.update({
          where: { id: lesson.id },
          data: { audioUrl },
        });

        console.log(`Updated lesson ${lesson.id} with audioUrl: ${audioUrl}`);
      }
    } catch (error) {
      console.error(`Failed to process lesson ${lesson.id}:`, error);
    }
  }

  console.log('Audio overview generation finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
