import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

interface Message {
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

interface LessonContext {
    lessonId: string;
    lessonTitle: string;
    moduleTitle: string;
    courseTitle: string;
    content?: string;
}

interface AITeachingAssistantProps {
    isOpen: boolean;
    onClose: () => void;
    lessonContext?: LessonContext;
}

export default function AITeachingAssistant({
    isOpen,
    onClose,
    lessonContext,
}: AITeachingAssistantProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);

    // Handle keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Close on Escape
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            role: "user",
            content: input.trim(),
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/ai/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messages: [...messages, userMessage].map(({ role, content }) => ({
                        role,
                        content,
                    })),
                    lessonContext,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to get response");
            }

            // Handle streaming response
            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let assistantMessage = "";

            if (!reader) {
                throw new Error("No response stream available");
            }

            // Create initial assistant message
            const assistantMessageObj: Message = {
                role: "assistant",
                content: "",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, assistantMessageObj]);

            while (true) {
                // biome-ignore lint/performance/noAwaitInLoops: Sequential stream reading requires await in loop
                const { done, value } = await reader.read();

                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split("\n");

                for (const line of lines) {
                    if (line.startsWith("data: ")) {
                        const data = line.slice(6);

                        if (data === "[DONE]") {
                            break;
                        }

                        try {
                            const parsed = JSON.parse(data);

                            if (parsed.error) {
                                setError(parsed.error);
                                break;
                            }

                            if (parsed.text) {
                                assistantMessage += parsed.text;
                                // Update the last message (assistant's message)
                                setMessages((prev) => {
                                    const updated = [...prev];
                                    updated[updated.length - 1] = {
                                        ...updated[updated.length - 1],
                                        content: assistantMessage,
                                    };
                                    return updated;
                                });
                            }
                        } catch (e) {
                            console.error("Failed to parse SSE data:", e);
                        }
                    }
                }
            }
        } catch (err) {
            console.error("Chat error:", err);
            setError(err instanceof Error ? err.message : "An error occurred");
            // Remove the last assistant message if there was an error
            setMessages((prev) => {
                if (prev.length > 0 && prev[prev.length - 1].role === "assistant") {
                    return prev.slice(0, -1);
                }
                return prev;
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage();
    };

    if (!isOpen) return null;

    return (
        <div className="tw-fixed tw-inset-0 tw-z-50 tw-flex tw-items-center tw-justify-center tw-bg-black tw-bg-opacity-50">
            <div className="tw-bg-white tw-rounded-lg tw-shadow-2xl tw-w-full tw-max-w-2xl tw-max-h-[80vh] tw-flex tw-flex-col">
                {/* Header */}
                <div className="tw-bg-primary tw-text-white tw-px-6 tw-py-4 tw-rounded-t-lg tw-flex tw-justify-between tw-items-center">
                    <div>
                        <h2 className="tw-text-xl tw-font-bold">J0d!e - AI Teaching Assistant</h2>
                        {lessonContext && (
                            <p className="tw-text-sm tw-opacity-90 tw-mt-1">
                                {lessonContext.courseTitle} / {lessonContext.moduleTitle} /{" "}
                                {lessonContext.lessonTitle}
                            </p>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="tw-text-white hover:tw-text-gray-200 tw-text-2xl tw-leading-none tw-transition-colors"
                        aria-label="Close"
                    >
                        &times;
                    </button>
                </div>

                {/* Messages */}
                <div className="tw-flex-1 tw-overflow-y-auto tw-p-6 tw-space-y-4">
                    {messages.length === 0 && (
                        <div className="tw-text-center tw-text-gray-500 tw-py-8">
                            <p className="tw-text-lg tw-font-medium tw-mb-2">
                                Hi! I&apos;m J0d!e, your AI teaching assistant.
                            </p>
                            <p className="tw-text-sm">
                                Ask me anything about {lessonContext ? "this lesson" : "coding"}!
                            </p>
                            <p className="tw-text-xs tw-mt-4 tw-text-gray-400">
                                Tip: Press &apos;A&apos; to open me quickly, ESC to close
                            </p>
                        </div>
                    )}

                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={clsx(
                                "tw-flex",
                                msg.role === "user" ? "tw-justify-end" : "tw-justify-start"
                            )}
                        >
                            <div
                                className={clsx(
                                    "tw-max-w-[80%] tw-rounded-lg tw-px-4 tw-py-3 tw-shadow-sm",
                                    msg.role === "user"
                                        ? "tw-bg-primary tw-text-white"
                                        : "tw-bg-gray-100 tw-text-gray-400"
                                )}
                            >
                                <div className="tw-text-sm tw-whitespace-pre-wrap">
                                    {msg.content}
                                </div>
                                <div
                                    className={clsx(
                                        "tw-text-xs tw-mt-1",
                                        msg.role === "user"
                                            ? "tw-text-white tw-opacity-70"
                                            : "tw-text-gray-500"
                                    )}
                                >
                                    {msg.timestamp.toLocaleTimeString()}
                                </div>
                            </div>
                        </div>
                    ))}

                    {error && (
                        <div className="tw-bg-red-50 tw-border tw-border-red-200 tw-text-red-700 tw-px-4 tw-py-3 tw-rounded">
                            <p className="tw-text-sm">
                                <strong>Error:</strong> {error}
                            </p>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="tw-border-t tw-border-gray-200 tw-p-4">
                    <form onSubmit={handleSubmit} className="tw-flex tw-gap-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask me anything..."
                            disabled={isLoading}
                            className="tw-flex-1 tw-border tw-border-gray-300 tw-rounded-lg tw-px-4 tw-py-2 focus:tw-outline-none focus:tw-border-primary disabled:tw-bg-gray-100 disabled:tw-cursor-not-allowed"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className={clsx(
                                "tw-px-6 tw-py-2 tw-rounded-lg tw-font-medium tw-transition-colors",
                                isLoading || !input.trim()
                                    ? "tw-bg-gray-300 tw-text-gray-500 tw-cursor-not-allowed"
                                    : "tw-bg-primary tw-text-white hover:tw-bg-primary-dark"
                            )}
                        >
                            {isLoading ? (
                                <span className="tw-flex tw-items-center tw-gap-2">
                                    <svg
                                        className="tw-animate-spin tw-h-4 tw-w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="tw-opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="tw-opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    Thinking...
                                </span>
                            ) : (
                                "Send"
                            )}
                        </button>
                    </form>
                    <p className="tw-text-xs tw-text-gray-500 tw-mt-2 tw-text-center">
                        J0d!e uses AI to help you learn. Responses may not always be accurate.
                    </p>
                </div>
            </div>
        </div>
    );
}
