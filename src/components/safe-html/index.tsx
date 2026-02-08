import React from "react";

// Function to sanitize HTML content for safe rendering
const sanitizeHTML = (dirty: string) => {
	// Only sanitize on client side, on server side return the content as-is
	// This prevents SSR issues with DOMPurify
	if (typeof window === "undefined") {
		// During SSR, we'll return a safer version by escaping the most dangerous characters
		// This is a temporary measure until the client takes over
		return dirty
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&#39;")
			.replace(/&(?!(lt|gt|quot|#39|amp);)/g, "&amp;");
	}

	// Dynamic import DOMPurify only on client side
	const DOMPurify = require("dompurify");

	// Recommended DOMPurify configuration for safe HTML rendering
	const SANITIZE_CONFIG = {
		ALLOWED_TAGS: [
			"a",
			"b",
			"i",
			"em",
			"strong",
			"p",
			"br",
			"ul",
			"ol",
			"li",
			"blockquote",
			"code",
			"pre",
			"h1",
			"h2",
			"h3",
			"h4",
			"h5",
			"h6",
			"span",
			"div",
			"img",
			"section",
			"article",
			"nav",
			"header",
			"footer",
			"aside",
			"table",
			"thead",
			"tbody",
			"tr",
			"td",
			"th",
			"caption",
			"sup",
			"sub",
			"small",
			"mark",
			"del",
			"ins",
			"abbr",
			"time",
			"figure",
			"figcaption",
			"video",
			"audio",
			"source",
			"iframe", // For embedded videos
			"hr",
		],
		ALLOWED_ATTR: [
			"href",
			"target",
			"rel",
			"class",
			"id",
			"src",
			"alt",
			"title",
			"width",
			"height",
			"loading",
			"style", // For inline styles
			"data-*", // For data attributes
			"aria-*", // For accessibility
			"role",
			"tabindex",
			"type",
			"controls",
			"autoplay",
			"muted",
			"loop",
			"poster",
			"preload",
			"frameborder",
			"allow",
			"allowfullscreen",
			"datetime",
			"colspan",
			"rowspan",
		],
		ALLOW_DATA_ATTR: true,
		KEEP_CONTENT: true,
		ADD_ATTR: ["target", "rel"], // Ensure external links open safely
	};

	// Sanitize the content
	const sanitized = DOMPurify.sanitize(dirty, SANITIZE_CONFIG);

	// Post-process to ensure external links are safe
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

/**
 * SafeHTML Component
 * Safely renders HTML content by sanitizing it with DOMPurify
 * Prevents XSS attacks while preserving legitimate formatting
 */
const SafeHTML: React.FC<SafeHTMLProps> = ({
	content,
	className,
	as: Component = "div",
}) => {
	// Use state to handle hydration mismatch between server and client
	const [safeContent, setSafeContent] = React.useState<string>("");
	const [isClient, setIsClient] = React.useState(false);

	React.useEffect(() => {
		// Mark that we're on the client
		setIsClient(true);
		// Sanitize content on client side
		if (content) {
			setSafeContent(sanitizeHTML(content));
		}
	}, [content]);

	// During SSR or before hydration, show nothing or a placeholder
	// This prevents hydration mismatch
	if (!isClient) {
		return <Component className={className} />;
	}

	// Render sanitized content
	return (
		<Component
			className={className}
			dangerouslySetInnerHTML={{ __html: safeContent }}
		/>
	);
};

export default SafeHTML;