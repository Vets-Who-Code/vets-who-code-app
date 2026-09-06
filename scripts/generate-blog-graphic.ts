import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
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

export function stripFences(raw: string): string {
    return raw
        .replace(/^\s*```(?:html)?\s*\n?/, "")
        .replace(/\n?```\s*$/, "")
        .trim();
}

// The model writes the artboard once; the file it produces is what gets edited
// and re-rendered from then on. Nothing here touches the render path.
async function draft(dir: string, name: string, brief: string): Promise<void> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error("Missing GEMINI_API_KEY.");
    }

    const out = path.join(dir, `${name}.html`);
    if (fs.existsSync(out)) {
        throw new Error(`${out} already exists. Edit it, or delete it to redraft.`);
    }

    const brand = fs.readFileSync(path.join(GRAPHICS_DIR, "_brand.css"), "utf-8");
    const sample = fs.readdirSync(dir).find((f) => f.endsWith(".html"));
    const example = sample ? fs.readFileSync(path.join(dir, sample), "utf-8") : "";

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: `Write one HTML artboard for a Vets Who Code blog graphic.

Brief: ${brief}

These brand tokens are already loaded for you from ../_brand.css:

${brand}

${example ? `An existing artboard in the same set, for house style:\n\n${example}` : ""}

Rules:
- Output only the HTML. No markdown fences, no commentary, no <html>/<head>/<body>.
- Start with <link rel="stylesheet" href="../_brand.css" />, then a <style> block, then the markup.
- The outermost element must be <div class="artboard">. It is 1400x760 and is what gets screenshotted.
- Colors come from the var(--*) tokens only. Never write a raw hex outside inline SVG strokes.
- Headings use GothamPro, body copy uses Gilroy. Both are already declared.
- No images, fonts, or scripts from anywhere else. Inline SVG is fine.
- Copy must fit at these sizes without clipping or scrolling. Fewer words beats smaller type.`,
    });

    fs.writeFileSync(out, `${stripFences(response.text ?? "")}\n`);
    console.log(`drafted ${out}`);
    console.log(`   review it, then: npm run generate:blog-graphic ${path.basename(dir)} -- --dry`);
}

async function main() {
    const slug = process.argv[2];
    const dry = process.argv.includes("--dry");
    const draftAt = process.argv.indexOf("--draft");

    if (!slug) {
        throw new Error(
            "Usage: npm run generate:blog-graphic <slug> [--dry | --draft <name> <brief>]"
        );
    }

    const dir = path.join(GRAPHICS_DIR, slug);
    if (!fs.existsSync(dir)) {
        throw new Error(`No graphics directory: ${dir}`);
    }

    if (draftAt !== -1) {
        const [name, brief] = process.argv.slice(draftAt + 1, draftAt + 3);
        if (!name || !brief) {
            throw new Error('Usage: --draft <name> "<what the graphic should say>"');
        }
        await draft(dir, name, brief);
        return;
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

if (require.main === module) {
    main().catch((err) => {
        console.error(err);
        process.exit(1);
    });
}
