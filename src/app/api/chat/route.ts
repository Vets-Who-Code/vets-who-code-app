import { CoreMessage } from "ai";
import { gemini } from "@/lib/ai/gemini";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { options } from "@/pages/api/auth/options";

export const maxDuration = 45; // Extend max duration for route on vercel to 45 seconds

export async function POST(req: NextRequest) {
    const session = await getServerSession(options);
    if (!session) {
        return NextResponse.json({ error: "You must be logged in to access this API route." });
    }
    const { messages }: { messages: CoreMessage[] } = await req.json();

    messages.forEach((msg) => {
        console.log(msg.content);
    });

    const response = gemini.chat(messages);
    return response.toDataStreamResponse();
}
