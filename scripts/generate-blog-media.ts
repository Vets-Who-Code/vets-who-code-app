import "dotenv/config";
import * as fs from "fs";
import * as path from "path";

const BLOG_DIR = path.resolve(process.cwd(), "src/data/blogs");

export function validateSlug(slug: string | undefined): string {
    if (!slug) {
        throw new Error("Usage: npm run generate:blog-media <slug>");
    }

    const blogPath = path.join(BLOG_DIR, `${slug}.md`);
    if (!fs.existsSync(blogPath)) {
        throw new Error(`Blog post not found: ${blogPath}`);
    }

    return slug;
}

export interface GenerateMediaResult {
    imageOk: boolean;
    audioOk: boolean;
}

export async function generateMedia(
    slug: string,
    generateImage: () => Promise<void>,
    generateAudio: () => Promise<void>
): Promise<GenerateMediaResult> {
    let imageOk = false;
    let audioOk = false;

    // Run image generation
    console.log("━".repeat(50));
    console.log("Step 1/2: Generating blog image...");
    console.log("━".repeat(50));
    try {
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

    return { imageOk, audioOk };
}

async function main() {
    const slug = validateSlug(process.argv[2]);

    console.log(`\n🚀 Generating media for "${slug}"...\n`);

    const { main: generateImage } = await import("./generate-blog-image");
    const { main: generateAudio } = await import("./generate-single-blog-audio");

    process.argv[2] = slug;
    const result = await generateMedia(slug, generateImage, generateAudio);

    if (!result.imageOk || !result.audioOk) {
        process.exit(1);
    }
}

if (require.main === module) {
    main().catch((err) => {
        console.error(err);
        process.exit(1);
    });
}
