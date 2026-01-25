/**
 * Upload blog audio files to Cloudinary
 *
 * This script uploads all WAV files from public/audio/blogs/ to Cloudinary
 * and outputs a mapping of blog slugs to Cloudinary URLs.
 */

const fs = require('fs');
const path = require('path');
const { v2: cloudinary } = require('cloudinary');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const AUDIO_DIR = path.join(process.cwd(), 'public/audio/blogs');
const CLOUDINARY_FOLDER = 'blog-audio';

/**
 * Upload a single audio file to Cloudinary
 */
async function uploadAudioFile(filePath, slug) {
  try {
    console.log(`Uploading ${slug}...`);

    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: 'video', // Cloudinary treats audio as video
      public_id: slug,
      folder: CLOUDINARY_FOLDER,
      overwrite: true,
      // Optimize for streaming
      flags: 'streaming_attachment',
    });

    console.log(`✓ Uploaded ${slug}`);
    return {
      slug,
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      duration: result.duration,
      bytes: result.bytes,
    };
  } catch (error) {
    console.error(`✗ Failed to upload ${slug}:`, error.message);
    return null;
  }
}

/**
 * Main function to upload all audio files
 */
async function uploadAllAudioFiles() {
  console.log('Starting Cloudinary audio upload...\n');

  // Check if audio directory exists
  if (!fs.existsSync(AUDIO_DIR)) {
    console.error(`Audio directory not found: ${AUDIO_DIR}`);
    process.exit(1);
  }

  // Get all WAV files
  const files = fs.readdirSync(AUDIO_DIR)
    .filter(file => file.endsWith('.wav'))
    .map(file => ({
      path: path.join(AUDIO_DIR, file),
      slug: file.replace('.wav', ''),
      name: file,
    }));

  console.log(`Found ${files.length} audio files to upload\n`);

  // Upload files sequentially to avoid rate limits
  const results = [];
  for (const file of files) {
    const result = await uploadAudioFile(file.path, file.slug);
    if (result) {
      results.push(result);
    }
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('Upload Summary');
  console.log('='.repeat(60));
  console.log(`Total files: ${files.length}`);
  console.log(`Successful: ${results.length}`);
  console.log(`Failed: ${files.length - results.length}`);

  // Save results to JSON file
  const outputPath = path.join(process.cwd(), 'audio-cloudinary-urls.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`\nResults saved to: ${outputPath}`);

  // Print URL mapping
  console.log('\n' + '='.repeat(60));
  console.log('Blog Slug → Cloudinary URL Mapping');
  console.log('='.repeat(60));
  results.forEach(({ slug, url }) => {
    console.log(`${slug}`);
    console.log(`  → ${url}\n`);
  });

  return results;
}

// Run the upload
uploadAllAudioFiles()
  .then(() => {
    console.log('\n✓ Upload complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n✗ Upload failed:', error);
    process.exit(1);
  });
