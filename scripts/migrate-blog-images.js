/**
 * Script to migrate blog post images from full Cloudinary URLs to public IDs
 *
 * This script will:
 * 1. Read all blog markdown files
 * 2. Extract the Cloudinary public ID from the full URL
 * 3. Show you the changes before applying them
 * 4. Optionally update the files with the new format
 *
 * Usage:
 *   node scripts/migrate-blog-images.js --dry-run    # Preview changes
 *   node scripts/migrate-blog-images.js --apply      # Apply changes
 */

const fs = require("fs");
const path = require("path");

const BLOGS_DIR = path.join(process.cwd(), "src/data/blogs");

/**
 * Extract public ID from a Cloudinary URL
 */
function extractPublicId(url) {
    if (!url || !url.includes("cloudinary.com")) {
        return null;
    }

    try {
        // Match pattern: /upload/[transformations]/[version]/[public_id].[extension]
        // Keep the extension!
        const match = url.match(/\/upload\/(?:.*?\/)?(v\d+\/)?(.+)$/);

        if (match) {
            const version = match[1] || "";
            const publicId = match[2];
            return version + publicId;
        }

        return null;
    } catch (error) {
        console.error("Error extracting public ID from URL:", error);
        return null;
    }
}

/**
 * Process a single blog file
 */
function processBlogFile(filePath, applyChanges = false) {
    const content = fs.readFileSync(filePath, "utf8");

    // Match the image field in frontmatter
    const imageRegex = /image:\s*\n?\s*src:\s*"([^"]+)"/;
    const match = content.match(imageRegex);

    if (!match) {
        return { changed: false, file: filePath };
    }

    const currentUrl = match[1];

    // Skip if it's already a public ID (not a full URL)
    if (!currentUrl.startsWith("http")) {
        return { changed: false, file: filePath, reason: "Already using public ID" };
    }

    // Skip if it's not a Cloudinary URL
    if (!currentUrl.includes("cloudinary.com")) {
        return { changed: false, file: filePath, reason: "Not a Cloudinary URL" };
    }

    const publicId = extractPublicId(currentUrl);

    if (!publicId) {
        return {
            changed: false,
            file: filePath,
            reason: "Could not extract public ID",
            currentUrl,
        };
    }

    // Create new content with public ID
    const newContent = content.replace(imageRegex, `image:\n    src: "${publicId}"`);

    if (applyChanges) {
        fs.writeFileSync(filePath, newContent, "utf8");
    }

    return {
        changed: true,
        file: path.basename(filePath),
        currentUrl,
        publicId,
        preview: newContent.match(/image:\s*\n?\s*src:\s*"[^"]+"/)[0],
    };
}

/**
 * Main migration function
 */
function migrateBlogImages(applyChanges = false) {
    const files = fs.readdirSync(BLOGS_DIR).filter((f) => f.endsWith(".md"));
    const results = {
        total: files.length,
        changed: [],
        unchanged: [],
        errors: [],
    };

    files.forEach((file) => {
        const filePath = path.join(BLOGS_DIR, file);
        const result = processBlogFile(filePath, applyChanges);

        if (result.changed) {
            results.changed.push(result);
        } else {
            results.unchanged.push(result);
        }
    });

    console.log("Migration Summary:\n");
    console.log(`   Total files scanned: ${results.total}`);
    console.log(`   Files to migrate:    ${results.changed.length}`);
    console.log(`   Already migrated:    ${results.unchanged.length}`);
    console.log("");

    if (results.changed.length > 0) {
        console.log("Files that will be migrated:\n");
        results.changed.forEach((item, index) => {
            console.log(`${index + 1}. ${item.file}`);
            console.log(`   Old: ${item.currentUrl.substring(0, 80)}...`);
            console.log(`   New: ${item.publicId}`);
            console.log("");
        });

        if (applyChanges) {
            console.log("Changes have been applied!\n");
        } else {
            console.log("This is a DRY RUN. No files were modified.");
            console.log(
                "   To apply these changes, run: node scripts/migrate-blog-images.js --apply\n"
            );
        }
    } else {
        console.log(
            "All blog posts are already using public IDs or don't have Cloudinary images.\n"
        );
    }

    // Show unchanged files with reasons
    const skipped = results.unchanged.filter((r) => r.reason);
    if (skipped.length > 0) {
        console.log("Skipped files:\n");
        skipped.forEach((item) => {
            console.log(`   - ${item.file}: ${item.reason}`);
        });
        console.log("");
    }
}

// Parse command line arguments
const args = process.argv.slice(2);
const applyChanges = args.includes("--apply");

if (args.length === 0 || args.includes("--dry-run")) {
    console.log("Running in DRY RUN mode...");
    migrateBlogImages(false);
} else if (applyChanges) {
    console.log("Applying migrations...");
    migrateBlogImages(true);
} else {
    console.log("Usage:");
    console.log("  node scripts/migrate-blog-images.js --dry-run    # Preview changes");
    console.log("  node scripts/migrate-blog-images.js --apply      # Apply changes");
}
