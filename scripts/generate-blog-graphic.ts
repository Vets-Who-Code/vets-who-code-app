import "dotenv/config";
import * as fs from "fs";
import * as path from "path";
import { chromium } from "playwright";
import cloudinary from "@/lib/cloudinary";

const GRAPHICS_DIR = path.resolve(process.cwd(), "src/data/blog-graphics");

async function uploadToCloudinary(file: string, publicId: string): Promise<string> {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: "image",
        public_id: publicId,
        folder: "blog-graphics",
        overwrite: true,
        // Versionless URLs are built from the public id, so a re-render has to
        // purge the cached copy or the post keeps showing the old graphic.
        invalidate: true,
    });
    return result.secure_url;
}

async function main() {
    const slug = process.argv[2];
    const dry = process.argv.includes("--dry");

    if (!slug) {
        throw new Error("Usage: npm run generate:blog-graphic <slug> [--dry]");
    }

    const dir = path.join(GRAPHICS_DIR, slug);
    if (!fs.existsSync(dir)) {
        throw new Error(`No graphics directory: ${dir}`);
    }

    const pages = fs.readdirSync(dir).filter((f) => f.endsWith(".html"));
    if (pages.length === 0) {
        throw new Error(`No .html graphics in ${dir}`);
    }

    const outDir = path.join(dir, "out");
    fs.mkdirSync(outDir, { recursive: true });

    const browser = await chromium.launch();
    const context = await browser.newContext({ deviceScaleFactor: 2 });
    const page = await context.newPage();

    for (const file of pages) {
        const name = file.replace(/\.html$/, "");
        const png = path.join(outDir, `${name}.png`);

        // biome-ignore lint/performance/noAwaitInLoops: one browser, rendered in order
        await page.goto(`file://${path.join(dir, file)}`);
        // biome-ignore lint/performance/noAwaitInLoops: fonts must load before capture
        await page.evaluate(() => document.fonts.ready);
        // biome-ignore lint/performance/noAwaitInLoops: screenshot is the point
        await page.locator(".artboard").screenshot({ path: png });

        if (dry) {
            console.log(`${name} -> ${png}`);
            continue;
        }

        // biome-ignore lint/performance/noAwaitInLoops: sequential uploads
        const url = await uploadToCloudinary(png, `${slug}-${name}`);
        console.log(`${name} -> ${url}`);
        console.log(`   public id: blog-graphics/${slug}-${name}`);
    }

    await browser.close();
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
