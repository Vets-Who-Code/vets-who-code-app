import {
  truncate,
  capitalize,
  toTitleCase,
  getInitials,
  pluralize,
  stripHtml,
  escapeHtml,
  formatFileSize,
  randomString,
  cleanWhitespace,
  maskEmail,
  isValidJSON,
} from "../string";

describe("string utilities", () => {
  describe("truncate", () => {
    it("truncates long strings", () => {
      expect(truncate("Hello World", 5)).toBe("Hello...");
    });

    it("does not truncate short strings", () => {
      expect(truncate("Hi", 5)).toBe("Hi");
    });
  });

  describe("capitalize", () => {
    it("capitalizes each word", () => {
      expect(capitalize("hello world")).toBe("Hello World");
    });
  });

  describe("toTitleCase", () => {
    it("converts kebab case", () => {
      expect(toTitleCase("hello-world")).toBe("Hello World");
    });
  });

  describe("getInitials", () => {
    it("extracts initials", () => {
      expect(getInitials("John Doe")).toBe("JD");
    });
  });

  describe("pluralize", () => {
    it("returns singular for 1", () => {
      expect(pluralize(1, "item")).toBe("item");
    });

    it("returns plural for multiple", () => {
      expect(pluralize(2, "item")).toBe("items");
    });
  });

  describe("stripHtml", () => {
    it("removes html tags", () => {
      expect(stripHtml("<p>Hello</p>")).toBe("Hello");
    });
  });

  describe("escapeHtml", () => {
    it("escapes html characters", () => {
      expect(escapeHtml("<script>")).toBe("&lt;script&gt;");
    });
  });

  describe("formatFileSize", () => {
    it("formats bytes", () => {
      expect(formatFileSize(1536)).toBe("1.5 KB");
    });
  });

  describe("randomString", () => {
    it("generates string of given length", () => {
      const str = randomString(10);
      expect(str.length).toBe(10);
    });
  });

  describe("cleanWhitespace", () => {
    it("cleans extra spaces", () => {
      expect(cleanWhitespace("  hello   world  ")).toBe("hello world");
    });
  });

  describe("maskEmail", () => {
    it("masks email", () => {
      expect(maskEmail("john@example.com")).toBe("jo***@example.com");
    });
  });

  describe("isValidJSON", () => {
    it("valid json", () => {
      expect(isValidJSON('{"a":1}')).toBe(true);
    });

    it("invalid json", () => {
      expect(isValidJSON("{a:1}")).toBe(false);
    });
  });
});
