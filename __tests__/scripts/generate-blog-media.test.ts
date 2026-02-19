import { describe, it, expect, vi, afterEach } from "vitest";
import * as fs from "fs";
import * as path from "path";
import {
  validateSlug,
  generateMedia,
} from "../../scripts/generate-blog-media";

const TEST_BLOG_DIR = path.join(process.cwd(), "src/data/blogs");

describe("validateSlug", () => {
  const testSlug = "test-media-post";
  const testFilePath = path.join(TEST_BLOG_DIR, `${testSlug}.md`);

  afterEach(() => {
    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
    }
  });

  it("throws when no slug is provided", () => {
    expect(() => validateSlug(undefined)).toThrowError(/Usage:/);
  });

  it("throws when slug is an empty string", () => {
    expect(() => validateSlug("")).toThrowError(/Usage:/);
  });

  it("throws when blog post file does not exist", () => {
    expect(() => validateSlug("nonexistent-slug")).toThrowError(
      /Blog post not found/,
    );
  });

  it("returns the slug when the blog post exists", () => {
    fs.writeFileSync(testFilePath, "---\ntitle: Test\n---\nContent.");
    expect(validateSlug(testSlug)).toBe(testSlug);
  });
});

describe("generateMedia", () => {
  it("runs image generation before audio generation", async () => {
    const order: string[] = [];
    const generateImage = vi.fn(async () => {
      order.push("image");
    });
    const generateAudio = vi.fn(async () => {
      order.push("audio");
    });

    await generateMedia("test-slug", generateImage, generateAudio);

    expect(order).toEqual(["image", "audio"]);
  });

  it("returns both ok when both succeed", async () => {
    const generateImage = vi.fn(async () => {});
    const generateAudio = vi.fn(async () => {});

    const result = await generateMedia("test-slug", generateImage, generateAudio);

    expect(result).toEqual({ imageOk: true, audioOk: true });
  });

  it("still runs audio when image generation fails", async () => {
    const generateImage = vi.fn(async () => {
      throw new Error("Image API down");
    });
    const generateAudio = vi.fn(async () => {});

    const result = await generateMedia("test-slug", generateImage, generateAudio);

    expect(result.imageOk).toBe(false);
    expect(result.audioOk).toBe(true);
    expect(generateAudio).toHaveBeenCalled();
  });

  it("reports image success when only audio fails", async () => {
    const generateImage = vi.fn(async () => {});
    const generateAudio = vi.fn(async () => {
      throw new Error("Audio API down");
    });

    const result = await generateMedia("test-slug", generateImage, generateAudio);

    expect(result.imageOk).toBe(true);
    expect(result.audioOk).toBe(false);
  });

  it("reports both failed when both fail", async () => {
    const generateImage = vi.fn(async () => {
      throw new Error("Image fail");
    });
    const generateAudio = vi.fn(async () => {
      throw new Error("Audio fail");
    });

    const result = await generateMedia("test-slug", generateImage, generateAudio);

    expect(result).toEqual({ imageOk: false, audioOk: false });
  });

  it("calls each generator exactly once", async () => {
    const generateImage = vi.fn(async () => {});
    const generateAudio = vi.fn(async () => {});

    await generateMedia("test-slug", generateImage, generateAudio);

    expect(generateImage).toHaveBeenCalledTimes(1);
    expect(generateAudio).toHaveBeenCalledTimes(1);
  });
});
