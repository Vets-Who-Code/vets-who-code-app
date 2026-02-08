/**
 * Script to migrate Cloudinary URLs in blog post content (not frontmatter)
 *
 * This script will:
 * 1. Read all blog markdown files
 * 2. Find Cloudinary image URLs in the content body
 * 3. Extract the public ID from each URL
 * 4. Replace the full URL with the public ID
 * 5. Show preview or apply changes
 *
 * Usage:
 *   node scripts/migrate-blog-content-images.js --dry-run    # Preview changes
 *   node scripts/migrate-blog-content-images.js --apply      # Apply changes
 */

const fs = require("fs");
const path = require("path");

const BLOGS_DIR = path.join(process.cwd(), "src/data/blogs");
const CLOUDINARY_URL_PATTERN =
    /https:\/\/res\.cloudinary\.com\/vetswhocode\/image\/upload\/[^"')>\s]+/g;

/**
 * Extract public ID from a Cloudinary URL
 */
function extractPublicId(url) {
    if (!url || !url.includes("cloudinary.com")) {
        return null;
    }

    try {
        // Match pattern: /upload/[transformations]/[version]/[public_id].[extension]
        // Keep the extension and version!
        const match = url.match(/\/upload\/(?:.*?\/)?(v\d+\/.+)$/);

        if (match) {
            return match[1];
        }

        // Fallback: try without version
        const fallbackMatch = url.match(/\/upload\/(?:.*?\/)?(.+)$/);
        if (fallbackMatch) {
            return fallbackMatch[1];
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
    const matches = content.match(CLOUDINARY_URL_PATTERN);

    if (!matches || matches.length === 0) {
        return { changed: false, file: filePath, reason: "No Cloudinary URLs in content" };
    }

    let newContent = content;
    const replacements = [];

    matches.forEach((url) => {
        const publicId = extractPublicId(url);

        if (publicId) {
            // Replace the full URL with just the public ID
            newContent = newContent.replace(url, publicId);
            replacements.push({ url, publicId });
        }
    });

    if (replacements.length === 0) {
        return {
            changed: false,
            file: filePath,
            reason: "Could not extract public IDs",
        };
    }

    if (applyChanges) {
        fs.writeFileSync(filePath, newContent, "utf8");
    }

    return {
        changed: true,
        file: path.basename(filePath),
        replacements,
        count: replacements.length,
    };
}

/**
 * Main migration function
 */
function migrateBlogContentImages(applyChanges = false) {
    const files = fs.readdirSync(BLOGS_DIR).filter((f) => f.endsWith(".md"));
    const results = {
        total: files.length,
        changed: [],
        unchanged: [],
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
    console.log(`   Total files scanned:     ${results.total}`);
    console.log(`   Files with URLs:         ${results.changed.length}`);
    console.log(`   Files without URLs:      ${results.unchanged.length}`);
    console.log("");

    if (results.changed.length > 0) {
        console.log("Files to migrate:\n");
        results.changed.forEach((item, index) => {
            console.log(`${index + 1}. ${item.file} (${item.count} URLs)`);
            item.replacements.slice(0, 2).forEach((r) => {
                console.log(`   Old: ${r.url.substring(0, 80)}...`);
                console.log(`   New: ${r.publicId}`);
                console.log("");
            });
            if (item.replacements.length > 2) {
                console.log(`   ... and ${item.replacements.length - 2} more\n`);
            }
        });

        if (applyChanges) {
            console.log("Changes have been applied!\n");
        } else {
            console.log("This is a DRY RUN. No files were modified.");
            console.log(
                "   To apply these changes, run: node scripts/migrate-blog-content-images.js --apply\n"
            );
        }
    } else {
        console.log("No Cloudinary URLs found in blog content.\n");
    }

    // Summary of total replacements
    const totalReplacements = results.changed.reduce((sum, item) => sum + item.count, 0);
    if (totalReplacements > 0) {
        console.log(`Total URLs to replace: ${totalReplacements}\n`);
    }
}

// Parse command line arguments
const args = process.argv.slice(2);
const applyChanges = args.includes("--apply");

if (args.length === 0 || args.includes("--dry-run")) {
    console.log("Running in DRY RUN mode...");
    migrateBlogContentImages(false);
} else if (applyChanges) {
    console.log("Applying migrations...");
    migrateBlogContentImages(true);
} else {
    console.log("Usage:");
    console.log(
        "  node scripts/migrate-blog-content-images.js --dry-run    # Preview changes"
    );
    console.log(
        "  node scripts/migrate-blog-content-images.js --apply      # Apply changes"
    );
}
