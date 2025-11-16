import { NextApiResponse } from 'next';
import { requireAuth, AuthenticatedRequest } from '@/lib/rbac';
import { streamText } from 'ai';
import { getAIModelWithFallback, JODIE_SYSTEM_PROMPT } from '@/lib/ai-provider';

export const runtime = 'nodejs';
export const maxDuration = 30; // 30 seconds max for streaming responses

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatRequestBody {
  messages: ChatMessage[];
  lessonContext?: {
    lessonId: string;
    lessonTitle: string;
    moduleTitle: string;
    courseTitle: string;
    content?: string;
  };
}

/**
 * POST /api/ai/chat
 *
 * Streaming chat endpoint for J0d!e AI Teaching Assistant
 * Supports lesson context for contextual responses
 *
 * Request body:
 * {
 *   messages: [{ role: 'user' | 'assistant', content: string }],
 *   lessonContext?: {
 *     lessonId: string,
 *     lessonTitle: string,
 *     moduleTitle: string,
 *     courseTitle: string,
 *     content?: string
 *   }
 * }
 *
 * Response: Server-Sent Events (SSE) stream
 */
export default requireAuth(async (req: AuthenticatedRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages, lessonContext } = req.body as ChatRequestBody;

    // Validate messages
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    // Get AI model with fallback
    const aiConfig = await getAIModelWithFallback();
    if (!aiConfig) {
      return res.status(503).json({
        error: 'AI service unavailable',
        message: 'No AI providers are configured. Please contact support.',
      });
    }

    const { model, provider, modelName } = aiConfig;

    // Build system prompt with lesson context if provided
    let systemPrompt = JODIE_SYSTEM_PROMPT;

    if (lessonContext) {
      systemPrompt += `\n\nCurrent Lesson Context:
- Course: ${lessonContext.courseTitle}
- Module: ${lessonContext.moduleTitle}
- Lesson: ${lessonContext.lessonTitle}
${lessonContext.content ? `\nLesson Content Summary:\n${lessonContext.content.slice(0, 1000)}...` : ''}

Use this context to provide relevant, specific help to the student.`;
    }

    // Prepare messages with system prompt
    const fullMessages = [
      { role: 'system' as const, content: systemPrompt },
      ...messages,
    ];

    // Stream the response
    const result = await streamText({
      model,
      messages: fullMessages,
      temperature: 0.7,
    });

    // Set headers for Server-Sent Events
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-AI-Provider', provider);
    res.setHeader('X-AI-Model', modelName);

    // Stream the text chunks
    try {
      for await (const chunk of result.textStream) {
        res.write(`data: ${JSON.stringify({ text: chunk })}\n\n`);
      }
      res.write('data: [DONE]\n\n');
      res.end();
    } catch (streamError) {
      console.error('Streaming error:', streamError);
      res.write(
        `data: ${JSON.stringify({ error: 'Stream interrupted' })}\n\n`
      );
      res.end();
    }
  } catch (error) {
    console.error('AI chat error:', error);

    // If response hasn't started, send JSON error
    if (!res.headersSent) {
      res.status(500).json({
        error: 'Failed to process chat request',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    } else {
      // If streaming already started, send error as SSE
      res.write(
        `data: ${JSON.stringify({ error: 'Processing failed' })}\n\n`
      );
      res.end();
    }
  }
});
