import { describe, it, expect, afterEach } from "vitest";
import * as fs from "fs";
import * as path from "path";
import {
  readBlogPost,
  buildImagenPrompt,
} from "../../scripts/generate-blog-image";

const TEST_BLOG_DIR = path.join(process.cwd(), "src/data/blogs");

describe("readBlogPost", () => {
  const testSlug = "test-post";
  const testFilePath = path.join(TEST_BLOG_DIR, `${testSlug}.md`);

  afterEach(() => {
    // Clean up test files
    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
    }
  });

  it("extracts title from quoted frontmatter", () => {
    const content = `---
title: "My Test Post"
date: 2025-01-01
---

This is the body content.`;

    fs.writeFileSync(testFilePath, content);

    const result = readBlogPost(testSlug);

    expect(result.title).toBe("My Test Post");
    expect(result.content).toBe("This is the body content.");
  });

  it("extracts title from unquoted frontmatter", () => {
    const content = `---
title: Unquoted Title
date: 2025-01-01
---

Body text here.`;

    fs.writeFileSync(testFilePath, content);

    const result = readBlogPost(testSlug);

    expect(result.title).toBe("Unquoted Title");
    expect(result.content).toBe("Body text here.");
  });

  it("extracts title from single-quoted frontmatter", () => {
    const content = `---
title: 'Single Quoted'
date: 2025-01-01
---

Content.`;

    fs.writeFileSync(testFilePath, content);

    const result = readBlogPost(testSlug);

    expect(result.title).toBe("Single Quoted");
    expect(result.content).toBe("Content.");
  });

  it("falls back to slug when title is missing", () => {
    const content = `---
date: 2025-01-01
---

No title in frontmatter.`;

    fs.writeFileSync(testFilePath, content);

    const result = readBlogPost(testSlug);

    expect(result.title).toBe(testSlug);
    expect(result.content).toBe("No title in frontmatter.");
  });

  it("strips frontmatter block from content", () => {
    const content = `---
title: "Test"
author: "John Doe"
tags: ["test", "example"]
---

First paragraph.

Second paragraph.`;

    fs.writeFileSync(testFilePath, content);

    const result = readBlogPost(testSlug);

    expect(result.content).not.toContain("---");
    expect(result.content).not.toContain("author:");
    expect(result.content).toContain("First paragraph.");
  });

  it("throws error when file is not found", () => {
    expect(() => readBlogPost("nonexistent-slug")).toThrowError(
      /Blog post not found for slug "nonexistent-slug"/,
    );
  });
});

describe("buildImagenPrompt", () => {
  it("interpolates all theme fields into the prompt", () => {
    const theme = {
      mainSubject: "Veterans transitioning to tech careers",
      keyMessage: "Empowerment through coding education",
      visualMetaphor: "Bridge between military and technology",
      symbolicElements: "Dog tags transforming into circuit boards",
      fullThemeDescription:
        "A soldier crossing a bridge that transforms from military gear to technology symbols, representing the journey from service to software development.",
    };

    const prompt = buildImagenPrompt(theme);

    // Verify all fields are present in the output
    expect(prompt).toContain(theme.fullThemeDescription);
    expect(prompt).toContain(theme.mainSubject);
    expect(prompt).toContain(theme.visualMetaphor);
    expect(prompt).toContain(theme.symbolicElements);

    // Verify style constraints are present
    expect(prompt).toContain("1950s military propaganda");
    expect(prompt).toContain("navy blue");
  });

  it("includes required style constraints", () => {
    const theme = {
      mainSubject: "Test subject",
      keyMessage: "Test message",
      visualMetaphor: "Test metaphor",
      symbolicElements: "Test elements",
      fullThemeDescription: "Test description",
    };

    const prompt = buildImagenPrompt(theme);

    // Check for critical constraints (match actual prompt wording)
    expect(prompt).toContain("No text or hex codes");
    expect(prompt).toContain("deep navy blue");
    expect(prompt).toContain("red hex code");
    expect(prompt).toContain("white");
    expect(prompt).toContain("Bold, clean lines");
    expect(prompt).toContain("distressed paper");
  });
});
