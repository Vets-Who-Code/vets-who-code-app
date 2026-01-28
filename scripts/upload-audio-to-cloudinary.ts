import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

async function uploadAudioToCloudinary(audioPath: string, publicId: string): Promise<string> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      audioPath,
      {
        resource_type: 'video', // Audio files use 'video' resource type in Cloudinary
        public_id: publicId,
        folder: 'blog-audio',
        format: 'wav',
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result!.secure_url);
        }
      }
    );
  });
}

async function main() {
  const audioSlug = process.argv[2];

  if (!audioSlug) {
    console.error('Please provide an audio slug as an argument.');
    console.error('Usage: npm run upload-audio <blog-slug>');
    process.exit(1);
  }

  const audioPath = path.join(process.cwd(), 'public/audio/blogs', `${audioSlug}.wav`);

  if (!fs.existsSync(audioPath)) {
    console.error(`Audio file not found: ${audioPath}`);
    process.exit(1);
  }

  console.log(`Uploading audio file: ${audioPath}`);
  console.log(`Public ID: ${audioSlug}`);

  try {
    const cloudinaryUrl = await uploadAudioToCloudinary(audioPath, audioSlug);
    console.log('\n✅ Audio uploaded successfully to Cloudinary!');
    console.log(`\nCloudinary URL: ${cloudinaryUrl}`);
  } catch (error) {
    console.error('Upload failed:', error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Script failed:', error);
  process.exit(1);
});
