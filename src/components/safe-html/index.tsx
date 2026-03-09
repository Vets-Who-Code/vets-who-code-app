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
	KEEP_CONTENT: true,
	ADD_ATTR: ["target", "rel"],
};

// Lightweight SSR-safe sanitizer that preserves allowed tags
const sanitizeForSSR = (dirty: string): string => {
	const allowedTagSet = new Set(SANITIZE_CONFIG.ALLOWED_TAGS);
	// Strip tags that aren't in our allowed list, keep allowed ones intact
	return dirty.replace(/<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*\/?>/g, (match, tagName) => {
		return allowedTagSet.has(tagName.toLowerCase()) ? match : "";
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
	const isServer = typeof window === "undefined";
	const initialHTML = isServer ? sanitizeForSSR(content || "") : sanitizeForClient(content || "");
	const [safeContent, setSafeContent] = React.useState<string>(initialHTML);

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