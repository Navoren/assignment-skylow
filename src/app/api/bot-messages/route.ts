import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30;

export const runtime = 'edge';

const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});

let messages: { prompt: string; response: string }[] = [];

export async function POST(req: Request) {
  const { prompt } = await req.json();

  if (!prompt || typeof prompt !== 'string') {
    return new Response("Invalid request: 'prompt' is required and should be a string.", { status: 400 });
  }

  try {
    const result = await streamText({
      model: groq('llama-3.1-70b-versatile'),
      prompt,
    });

    const responseText = await result.toTextStreamResponse().text();

    messages.push({ prompt, response: responseText });

    return new Response(responseText, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });
  } catch (error) {
    return new Response("Error processing request", { status: 500 });
  }
}

export async function GET() {
  return new Response(JSON.stringify(messages), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
