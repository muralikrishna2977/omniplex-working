import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = "edge"; // Optional — remove if Edge env causes issues

export async function POST(req: Request) {
  try {
    const {
      messages,
      model,
      temperature,
      max_tokens,
      top_p,
      frequency_penalty,
      presence_penalty,
    } = await req.json();

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: "Missing OPENAI_API_KEY in environment variables.",
        }),
        { status: 500 }
      );
    }

    const openai = new OpenAI({ apiKey });

    const response = await openai.chat.completions.create({
      stream: true,
      model,
      messages,
      temperature,
      max_tokens,
      top_p,
      frequency_penalty,
      presence_penalty,
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error: any) {
    console.error("OpenAI Streaming Error:", error);

    return new Response(
      JSON.stringify({
        error: "An error occurred while processing the request.",
        details: error?.message || error,
      }),
      { status: 500 }
    );
  }
}
