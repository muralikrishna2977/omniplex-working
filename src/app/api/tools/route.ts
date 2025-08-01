import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "dummy",
});

export async function POST(req: Request) {
  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({
          error: "Method not allowed. Only POST requests are accepted.",
        }),
        { status: 405 }
      );
    }

    const messages = await req.json();

    const tools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
      {
        type: "function",
        function: {
          name: "search",
          description: "Search for information based on a query",
          parameters: {
            type: "object",
            properties: {},
          },
        },
      },
      {
        type: "function",
        function: {
          name: "stock",
          description: "Get the latest stock information for a given symbol",
          parameters: {
            type: "object",
            properties: {
              symbol: {
                type: "string",
                description: "Stock symbol to fetch data for.",
              },
            },
            required: ["symbol"],
          },
        },
      },
      {
        type: "function",
        function: {
          name: "dictionary",
          description: "Get dictionary information for a given word",
          parameters: {
            type: "object",
            properties: {
              word: {
                type: "string",
                description: "Word to look up in the dictionary.",
              },
            },
            required: ["word"],
          },
        },
      },
      {
        type: "function",
        function: {
          name: "weather",
          description: "Get the current weather in a given location",
          parameters: {
            type: "object",
            properties: {
              location: {
                type: "string",
                description: "City name to fetch the weather for.",
              },
              unit: {
                type: "string",
                enum: ["celsius", "fahrenheit"],
                description: "Temperature unit.",
              },
            },
            required: ["location"],
          },
        },
      },
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages,
      tools,
      tool_choice: "auto",
    });

    const toolCalls = response.choices[0].message?.tool_calls;

    if (!toolCalls) {
      return new Response(JSON.stringify({ mode: "chat", arg: "" }), {
        status: 200,
      });
    }

    const firstToolCall = toolCalls[0];
    const args = firstToolCall.function.arguments;

    return new Response(
      JSON.stringify({
        mode: firstToolCall.function.name,
        arg: Object.keys(args).length === 2 ? "" : args,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error calling OpenAI:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to process the input.",
        details: error?.message || error,
      }),
      { status: 500 }
    );
  }
}
