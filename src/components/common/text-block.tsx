import React from "react";

interface TextBlockProps {
    content: string[];
    className?: string;
    heading?: string;
    headingLevel?: "h2" | "h3" | "h4";
    textSize?: "sm" | "md" | "lg";
    spacing?: "compact" | "normal" | "wide";
    highlight?: boolean;
}

const TextBlock: React.FC<TextBlockProps> = ({
    content,
    className = "",
    heading,
    headingLevel = "h2",
    textSize = "md",
    spacing = "normal",
    highlight = false,
}) => {
    // Dynamic class generation based on props with tw- prefix
    const textSizeClass = {
        sm: "tw-text-sm",
        md: "tw-text-base",
        lg: "tw-text-lg tw-leading-relaxed",
    }[textSize];

    const spacingClass = {
        compact: "tw-mb-2",
        normal: "tw-mb-4",
        wide: "tw-mb-6",
    }[spacing];

    // Determine which heading element to use
    const HeadingTag = headingLevel as keyof JSX.IntrinsicElements;

    return (
        <div
            className={`tw-text-block ${highlight ? "tw-border-l-4 tw-border-primary tw-pl-4" : ""} ${className}`}
        >
            {heading && (
                <HeadingTag className="tw-mb-4 tw-font-bold tw-text-heading">{heading}</HeadingTag>
            )}
            {content.map((paragraph, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <p key={`p-${index}`} className={`${textSizeClass} ${spacingClass}`}>
                    {paragraph}
                </p>
            ))}
        </div>
    );
};

export default TextBlock;
