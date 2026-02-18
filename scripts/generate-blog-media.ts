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

  // Run image generation
  console.log("━".repeat(50));
  console.log("Step 1/2: Generating blog image...");
  console.log("━".repeat(50));
  const { main: generateImage } = await import("./generate-blog-image");
  process.argv[2] = slug;
  await generateImage();

  // Run audio generation
  console.log("\n" + "━".repeat(50));
  console.log("Step 2/2: Generating blog audio...");
  console.log("━".repeat(50));
  const { main: generateAudio } = await import("./generate-single-blog-audio");
  process.argv[2] = slug;
  await generateAudio();

  console.log("\n✅ All media generated for \"" + slug + "\"!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
