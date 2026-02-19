import "dotenv/config";
import * as fs from "fs";
import * as path from "path";

const BLOG_DIR = path.resolve(process.cwd(), "src/data/blogs");

async function main() {
  const slug = process.argv[2];
  if (!slug) {
    console.error("Usage: npm run generate:blog-media <slug>");
    process.exit(1);
  }

  const blogPath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(blogPath)) {
    console.error(`Blog post not found: ${blogPath}`);
    process.exit(1);
  }

  console.log(`\n🚀 Generating media for "${slug}"...\n`);

  let imageOk = false;
  let audioOk = false;

  // Run image generation
  console.log("━".repeat(50));
  console.log("Step 1/2: Generating blog image...");
  console.log("━".repeat(50));
  try {
    const { main: generateImage } = await import("./generate-blog-image");
    process.argv[2] = slug;
    await generateImage();
    imageOk = true;
  } catch (err) {
    console.error(`\n❌ Image generation failed for "${slug}":`, err);
    console.error("You can retry with: npm run generate:blog-image", slug);
  }

  // Run audio generation
  console.log("\n" + "━".repeat(50));
  console.log("Step 2/2: Generating blog audio...");
  console.log("━".repeat(50));
  try {
    const { main: generateAudio } = await import("./generate-single-blog-audio");
    process.argv[2] = slug;
    await generateAudio();
    audioOk = true;
  } catch (err) {
    console.error(`\n❌ Audio generation failed for "${slug}":`, err);
    console.error("You can retry with: npx tsx scripts/generate-single-blog-audio.ts", slug);
  }

  // Summary
  console.log("\n" + "━".repeat(50));
  console.log("Summary:");
  console.log("━".repeat(50));
  console.log(`  Image: ${imageOk ? "✅ Success" : "❌ Failed"}`);
  console.log(`  Audio: ${audioOk ? "✅ Success" : "❌ Failed"}`);

  if (!imageOk || !audioOk) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
