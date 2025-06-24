"use client";

import { useChat } from "@ai-sdk/react";
import { NextPage } from "next";
import Layout from "@layout/layout-01";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

type PageWithLayoutType = NextPage & {
    Layout: typeof Layout;
};

const Chat: PageWithLayoutType = () => {
    const { messages, input, handleInputChange, handleSubmit } = useChat();
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [router, status]);

    return (
        <div className="tw-stretch tw-mx-auto tw-flex tw-w-full tw-flex-col tw-items-center tw-justify-center tw-py-24">
            {messages.map((message) => (
                <div key={message.id} className="tw-w-full tw-whitespace-pre-wrap tw-px-10">
                    {message.role === "user" ? "User: " : "AI: "}
                    {message.parts.map((part, i) => {
                        switch (part.type) {
                            case "text":
                                // eslint-disable-next-line react/no-array-index-key
                                return <div key={`${message.id}-${i}`}>{part.text}</div>;
                            default:
                                return null;
                        }
                    })}
                </div>
            ))}

            <form onSubmit={handleSubmit}>
                <input
                    className="tw-fixed tw-inset-x-0 tw-bottom-0 tw-z-50 tw-mx-auto tw-mb-8 tw-w-full tw-max-w-lg tw-rounded tw-border tw-border-zinc-300 tw-p-2 tw-shadow-xl dark:tw-border-zinc-800 dark:tw-bg-zinc-900"
                    value={input}
                    placeholder="Say something..."
                    onChange={handleInputChange}
                />
            </form>
        </div>
    );
};

Chat.Layout = Layout;
export default Chat;
