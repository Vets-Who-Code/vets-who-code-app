import { describe, it, expect } from "vitest";

import {
  cleanMarkdownToText,
  pcmToWav,
} from "../../scripts/generate-single-blog-audio";

describe("cleanMarkdownToText", () => {
  it("removes markdown headers", () => {
    const input = "# Header 1\n## Header 2\n### Header 3\nText";
    const result = cleanMarkdownToText(input);

    expect(result).not.toContain("#");
    expect(result).toContain("Header 1");
    expect(result).toContain("Header 2");
  });

  it("removes bold and italic formatting", () => {
    const input = "This is **bold** and *italic* text.";
    const result = cleanMarkdownToText(input);

    expect(result).toBe("This is bold and italic text.");
  });

  it("removes links but preserves link text", () => {
    const input = "Check out [this link](https://example.com) for more.";
    const result = cleanMarkdownToText(input);

    expect(result).toContain("this link");
    expect(result).not.toContain("https://");
    expect(result).not.toContain("[");
  });

  it("removes HTML tags", () => {
    const input = "Text with <strong>HTML</strong> and <em>tags</em>.";
    const result = cleanMarkdownToText(input);

    expect(result).toBe("Text with HTML and tags.");
  });

  it("removes list markers", () => {
    const input = "- Item 1\n* Item 2\n+ Item 3";
    const result = cleanMarkdownToText(input);

    expect(result).not.toContain("-");
    expect(result).not.toContain("*");
    expect(result).not.toContain("+");
    expect(result).toContain("Item 1");
  });
});

describe("pcmToWav", () => {
  it("creates valid WAV header structure", () => {
    const pcmData = Buffer.alloc(1000);
    const wav = pcmToWav(pcmData);

    // Check RIFF header
    expect(wav.toString("ascii", 0, 4)).toBe("RIFF");
    expect(wav.toString("ascii", 8, 12)).toBe("WAVE");

    // Check fmt chunk
    expect(wav.toString("ascii", 12, 16)).toBe("fmt ");

    // Check data chunk
    expect(wav.toString("ascii", 36, 40)).toBe("data");
  });

  it("has correct byte offsets for header fields", () => {
    const pcmData = Buffer.alloc(1000);
    const wav = pcmToWav(pcmData, 24000, 1);

    // File size at offset 4
    const fileSize = wav.readUInt32LE(4);
    expect(fileSize).toBe(36 + pcmData.length);

    // Subchunk1Size at offset 16 (should be 16 for PCM)
    expect(wav.readUInt32LE(16)).toBe(16);

    // AudioFormat at offset 20 (1 = PCM)
    expect(wav.readUInt16LE(20)).toBe(1);

    // Sample rate at offset 24
    expect(wav.readUInt32LE(24)).toBe(24000);

    // Data size at offset 40
    expect(wav.readUInt32LE(40)).toBe(pcmData.length);
  });

  it("handles mono audio correctly", () => {
    const pcmData = Buffer.alloc(1000);
    const wav = pcmToWav(pcmData, 24000, 1);

    // NumChannels at offset 22
    expect(wav.readUInt16LE(22)).toBe(1);

    // BlockAlign at offset 32 (channels * bitsPerSample / 8)
    expect(wav.readUInt16LE(32)).toBe(2); // 1 channel * 16 bits / 8 = 2

    // ByteRate at offset 28 (sampleRate * blockAlign)
    expect(wav.readUInt32LE(28)).toBe(24000 * 2); // 48000
  });

  it("handles stereo audio correctly", () => {
    const pcmData = Buffer.alloc(1000);
    const wav = pcmToWav(pcmData, 24000, 2);

    // NumChannels at offset 22
    expect(wav.readUInt16LE(22)).toBe(2);

    // BlockAlign at offset 32 (channels * bitsPerSample / 8)
    expect(wav.readUInt16LE(32)).toBe(4); // 2 channels * 16 bits / 8 = 4

    // ByteRate at offset 28 (sampleRate * blockAlign)
    expect(wav.readUInt32LE(28)).toBe(24000 * 4); // 96000
  });

  it("handles different sample rates", () => {
    const pcmData = Buffer.alloc(500);

    const wav44100 = pcmToWav(pcmData, 44100, 1);
    expect(wav44100.readUInt32LE(24)).toBe(44100);
    expect(wav44100.readUInt32LE(28)).toBe(44100 * 2); // ByteRate

    const wav48000 = pcmToWav(pcmData, 48000, 1);
    expect(wav48000.readUInt32LE(24)).toBe(48000);
    expect(wav48000.readUInt32LE(28)).toBe(48000 * 2);
  });

  it("sets bits per sample to 16", () => {
    const pcmData = Buffer.alloc(100);
    const wav = pcmToWav(pcmData);

    // BitsPerSample at offset 34
    expect(wav.readUInt16LE(34)).toBe(16);
  });

  it("concatenates header and PCM data correctly", () => {
    const pcmData = Buffer.from([1, 2, 3, 4, 5]);
    const wav = pcmToWav(pcmData);

    // Header is 44 bytes, then PCM data follows
    expect(wav.length).toBe(44 + pcmData.length);

    // Check PCM data starts at offset 44
    expect(wav[44]).toBe(1);
    expect(wav[45]).toBe(2);
    expect(wav[46]).toBe(3);
  });
});
