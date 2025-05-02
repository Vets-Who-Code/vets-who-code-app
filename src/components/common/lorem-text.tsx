import React from "react";

interface LoremTextProps {
    paragraphs?: number;
}

const LoremText: React.FC<LoremTextProps> = ({ paragraphs = 1 }) => {
    const loremText =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

    return (
        <div className="lorem-text">
            {Array.from({ length: paragraphs }).map(() => (
                <p key={`lorem-${Math.random()}`} className="mb-4">
                    {loremText}
                </p>
            ))}
        </div>
    );
};

export default LoremText;
