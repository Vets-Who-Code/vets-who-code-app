/**
 * Truncate string with ellipsis
 * @example truncate("Long text here", 10) // "Long text..."
 */
export function truncate(text: string, maxLength: number): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

/**
 * Capitalize first letter of each word
 * @example capitalize("hello world") // "Hello World"
 */
export function capitalize(text: string): string {
  if (!text) return "";
  return text
    .split(" ")
    .map(word =>
      word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : ""
    )
    .join(" ");
}

/**
 * Convert to title case
 * @example toTitleCase("hello-world") // "Hello World"
 */
export function toTitleCase(text: string): string {
  if (!text) return "";
  return text
    .replace(/[-_]/g, " ")
    .split(" ")
    .map(word =>
      word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : ""
    )
    .join(" ");
}

/**
 * Extract initials from name
 * @example getInitials("John Doe") // "JD"
 */
export function getInitials(name: string, limit = 2): string {
  if (!name) return "";
  return name
    .trim()
    .split(" ")
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, limit)
    .join("");
}

/**
 * Pluralize word based on count
 * @example pluralize(1, "item") // "item"
 * @example pluralize(2, "item") // "items"
 */
export function pluralize(
  count: number,
  singular: string,
  plural?: string
): string {
  if (count === 1) return singular;
  return plural || `${singular}s`;
}

/**
 * Remove HTML tags from string
 * @example stripHtml("<p>Hello</p>") // "Hello"
 */
export function stripHtml(html: string): string {
  if (!html) return "";

  if (typeof window !== "undefined" && typeof window.DOMParser !== "undefined") {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }

  // Fallback for non-DOM environments
  return html.replace(/<[^>]*>/g, "");
}


/**
 * Escape HTML special characters
 * @example escapeHtml("<script>") // "&lt;script&gt;"
 */
export function escapeHtml(text: string): string {
  if (!text) return "";
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };

  return text.replace(/[&<>"']/g, char => map[char]);
}

/**
 * Format file size in human readable format
 * @example formatFileSize(1536) // "1.5 KB"
 */
export function formatFileSize(bytes: number): string {
  if (!bytes) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${Math.round((bytes / (k ** i)) * 100) / 100} ${sizes[i]}`;
}

/**
 * Generate random string
 * ⚠️ Not cryptographically secure.
 * Use only for non-security purposes (e.g. UI keys, mock data).
 */
export function randomString(length: number): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}

/**
 * Remove extra whitespace
 * @example cleanWhitespace("  hello   world  ") // "hello world"
 */
export function cleanWhitespace(text: string): string {
  if (!text) return "";
  return text.trim().replace(/\s+/g, " ");
}

/**
 * Mask sensitive data (email)
 * @example maskEmail("john@example.com") // "jo***@example.com"
 */
export function maskEmail(email: string): string {
  if (!email || !email.includes("@")) return email;

  const [name, domain] = email.split("@");
  if (name.length <= 2) return email;

  return `${name.slice(0, 2)}***@${domain}`;
}

/**
 * Check if string is valid JSON
 */
export function isValidJSON(str: string): boolean {
  if (!str) return false;
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}
