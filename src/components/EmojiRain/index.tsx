import React from "react";

const EmojiRain = () => {
    // Generate unique IDs for each emoji
    const emojis = Array.from({ length: 100 }).map((_, index) => ({
        id: `emoji-${index}-${new Date().getTime()}-${Math.random()}`, // This generates a unique ID
        emoji: "🎖️",
    }));

    return (
        <div className="pointer-events-none fixed top-0 left-0 z-50 h-full w-full overflow-hidden">
            {emojis.map((emojiObj) => (
                <div
                    key={emojiObj.id} // Using the unique ID as key
                    style={{
                        position: "absolute",
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animation: "fall 5s linear forwards",
                    }}
                >
                    {emojiObj.emoji}
                </div>
            ))}
        </div>
    );
};

export default EmojiRain;
