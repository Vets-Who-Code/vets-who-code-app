import React from "react";

const SANITIZE_CONFIG = {
	ALLOWED_TAGS: [
		"a", "b", "i", "em", "strong", "p", "br", "ul", "ol", "li",
		"blockquote", "code", "pre", "h1", "h2", "h3", "h4", "h5", "h6",
		"span", "div", "img", "section", "article", "nav", "header",
		"footer", "aside", "table", "thead", "tbody", "tr", "td", "th",
		"caption", "sup", "sub", "small", "mark", "del", "ins", "abbr",
		"time", "figure", "figcaption", "video", "audio", "source",
		"iframe", "hr",
	],
	ALLOWED_ATTR: [
		"href", "target", "rel", "class", "id", "src", "alt", "title",
		"width", "height", "loading", "style", "role", "tabindex", "type",
		"controls", "autoplay", "muted", "loop", "poster", "preload",
		"frameborder", "allow", "allowfullscreen", "datetime", "colspan",
		"rowspan",
	],
	ALLOW_DATA_ATTR: true,
	ALLOW_ARIA_ATTR: true,
	KEEP_CONTENT: true,
	ADD_ATTR: ["target", "rel"],
};

const ALLOWED_ATTR_SET = new Set(SANITIZE_CONFIG.ALLOWED_ATTR);

// Lightweight SSR-safe sanitizer that preserves allowed tags and filters attributes
const sanitizeForSSR = (dirty: string): string => {
	const allowedTagSet = new Set(SANITIZE_CONFIG.ALLOWED_TAGS);
	return dirty.replace(/<(\/?[a-zA-Z][a-zA-Z0-9]*)((?:\s+[^>]*?)?)(\s*\/?)>/g, (_match, tag, attrs, selfClose) => {
		const tagName = tag.replace("/", "").toLowerCase();
		if (!allowedTagSet.has(tagName)) return "";
		// Closing tags have no attributes
		if (tag.startsWith("/")) return `<${tag}>`;
		// Filter attributes to only allowed ones
		const safeAttrs: string[] = [];
		const attrRegex = /([a-zA-Z][a-zA-Z0-9-]*)\s*(?:=\s*(?:"([^"]*)"|'([^']*)'|(\S+)))?/g;
		let attrMatch;
		while ((attrMatch = attrRegex.exec(attrs)) !== null) {
			const attrName = attrMatch[1].toLowerCase();
			if (ALLOWED_ATTR_SET.has(attrName) || attrName.startsWith("data-") || attrName.startsWith("aria-")) {
				safeAttrs.push(attrMatch[0]);
			}
		}
		const attrStr = safeAttrs.length > 0 ? ` ${safeAttrs.join(" ")}` : "";
		return `<${tag}${attrStr}${selfClose}>`;
	});
};

// Full client-side sanitization with DOMPurify
const sanitizeForClient = (dirty: string): string => {
	const DOMPurifyFactory = require("dompurify");
	// DOMPurify exports a factory function that needs window
	const DOMPurify = typeof DOMPurifyFactory === "function"
		? DOMPurifyFactory(window)
		: DOMPurifyFactory;
	const sanitized = DOMPurify.sanitize(dirty, SANITIZE_CONFIG);

	const tempDiv = document.createElement("div");
	tempDiv.innerHTML = sanitized;
	const links = tempDiv.querySelectorAll('a[target="_blank"]');
	links.forEach((link) => {
		if (!link.getAttribute("rel")) {
			link.setAttribute("rel", "noopener noreferrer");
		}
	});

	return tempDiv.innerHTML;
};

interface SafeHTMLProps {
	content: string;
	className?: string;
	as?: keyof JSX.IntrinsicElements;
}

const SafeHTML: React.FC<SafeHTMLProps> = ({
	content,
	className,
	as: Component = "div",
}) => {
	// Always initialize with SSR sanitizer so server and client initial render match
	const [safeContent, setSafeContent] = React.useState<string>(
		() => sanitizeForSSR(content || "")
	);

	// Upgrade to full DOMPurify sanitization on the client
	React.useEffect(() => {
		if (content) {
			setSafeContent(sanitizeForClient(content));
		}
	}, [content]);

	return (
		<Component
			className={className}
			dangerouslySetInnerHTML={{ __html: safeContent }}
		/>
	);
};

export default SafeHTML;