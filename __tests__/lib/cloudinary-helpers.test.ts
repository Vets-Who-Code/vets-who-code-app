import {
    getCloudinaryUrl,
    getBlogHeaderUrl,
    getBlogOpenGraphUrl,
    getBlogThumbnailUrl,
    extractPublicIdFromUrl,
    isCloudinaryUrl,
    getImageUrl,
} from "@/lib/cloudinary-helpers";

describe("cloudinary-helpers", () => {
    describe("getCloudinaryUrl", () => {
        it("should return empty string for empty publicId", () => {
            expect(getCloudinaryUrl("")).toBe("");
        });

        it("should generate URL with default transformations", () => {
            const url = getCloudinaryUrl("my_image");
            expect(url).toContain("res.cloudinary.com");
            expect(url).toContain("q_auto");
            expect(url).toContain("f_auto");
            expect(url).toContain("g_auto");
            expect(url).toContain("my_image");
        });

        it("should include width and height when specified", () => {
            const url = getCloudinaryUrl("img", { width: 800, height: 600 });
            expect(url).toContain("w_800");
            expect(url).toContain("h_600");
        });

        it("should include crop mode", () => {
            const url = getCloudinaryUrl("img", { crop: "fill" });
            expect(url).toContain("c_fill");
        });

        it("should include DPR", () => {
            const url = getCloudinaryUrl("img", { dpr: 2 });
            expect(url).toContain("dpr_2");
        });

        it("should include flags", () => {
            const url = getCloudinaryUrl("img", { flags: ["progressive", "lossy"] });
            expect(url).toContain("fl_progressive");
            expect(url).toContain("fl_lossy");
        });
    });

    describe("getBlogHeaderUrl", () => {
        it("should return empty string for empty input", () => {
            expect(getBlogHeaderUrl("")).toBe("");
        });

        it("should return full URLs as-is", () => {
            expect(getBlogHeaderUrl("https://example.com/img.jpg")).toBe("https://example.com/img.jpg");
            expect(getBlogHeaderUrl("http://example.com/img.jpg")).toBe("http://example.com/img.jpg");
        });

        it("should generate Cloudinary URL for public IDs", () => {
            const url = getBlogHeaderUrl("blog_header");
            expect(url).toContain("w_1200");
            expect(url).toContain("c_limit");
        });
    });

    describe("getBlogOpenGraphUrl", () => {
        it("should return empty string for empty input", () => {
            expect(getBlogOpenGraphUrl("")).toBe("");
        });

        it("should return full URLs as-is", () => {
            expect(getBlogOpenGraphUrl("https://example.com/img.jpg")).toBe("https://example.com/img.jpg");
        });

        it("should generate 1200x630 OG image URL", () => {
            const url = getBlogOpenGraphUrl("og_image");
            expect(url).toContain("w_1200");
            expect(url).toContain("h_630");
            expect(url).toContain("c_fill");
        });
    });

    describe("getBlogThumbnailUrl", () => {
        it("should generate 400x300 thumbnail URL", () => {
            const url = getBlogThumbnailUrl("thumb");
            expect(url).toContain("w_400");
            expect(url).toContain("h_300");
            expect(url).toContain("c_fill");
        });
    });

    describe("extractPublicIdFromUrl", () => {
        it("should return null for non-Cloudinary URLs", () => {
            expect(extractPublicIdFromUrl("https://example.com/img.jpg")).toBeNull();
            expect(extractPublicIdFromUrl("")).toBeNull();
        });

        it("should extract public ID from Cloudinary URL", () => {
            const result = extractPublicIdFromUrl(
                "https://res.cloudinary.com/vetswhocode/image/upload/q_auto,f_auto/v1234/blog_header.jpg"
            );
            expect(result).toContain("blog_header");
        });
    });

    describe("isCloudinaryUrl", () => {
        it("should return true for Cloudinary URLs", () => {
            expect(isCloudinaryUrl("https://res.cloudinary.com/test/image/upload/img.jpg")).toBe(true);
        });

        it("should return false for non-Cloudinary URLs", () => {
            expect(isCloudinaryUrl("https://example.com/img.jpg")).toBe(false);
        });
    });

    describe("getImageUrl", () => {
        it("should return empty string for empty input", () => {
            expect(getImageUrl("")).toBe("");
        });

        it("should return full URLs as-is", () => {
            expect(getImageUrl("https://example.com/img.jpg")).toBe("https://example.com/img.jpg");
        });

        it("should generate Cloudinary URL for public IDs", () => {
            const url = getImageUrl("my_image", { width: 500 });
            expect(url).toContain("w_500");
            expect(url).toContain("my_image");
        });
    });
});
