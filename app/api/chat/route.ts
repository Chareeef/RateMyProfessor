import { NextRequest, NextResponse } from "next/server";
import { Message, CohereEmbeddingResponse } from "@/types";
import { cohere, index, groq } from "../sdks";

// Define system prompt
const systemPrompt = `You are an AI assistant specialized in recommending professors based on student reviews. You have access to detailed reviews of professors across various subjects. Your task is to provide personalized recommendations based on the specific preferences and requirements of users, such as teaching style, subject area, and star ratings.

When generating recommendations, consider the following:

- **Teaching Style:** Some users may prefer professors with engaging lectures, while others may prioritize clarity, depth, or the ability to explain complex concepts simply.
- **Subject Expertise:** Ensure that the recommended professors have expertise in the specific subject the user is interested in (e.g., mathematics, philosophy, physics).
- **Ratings:** Consider the professor's average star rating and highlight reviews that are relevant to the user's preferences (e.g., some users may prefer highly-rated professors, while others may tolerate lower ratings if the professor excels in a particular area).
- **Positive and Negative Aspects:** Mention both strengths and weaknesses in teaching based on the reviews, as some users may want a balanced perspective.
- **Review Highlights:** Include relevant snippets from the reviews to support your recommendation, especially focusing on aspects such as lecture organization, engagement, supportiveness, and clarity.

Your recommendations should be clear, concise, and tailored to help the user make an informed decision. If needed, you may ask follow-up questions to better understand their preferences before making a recommendation.`;

export async function POST(req: NextRequest) {
  try {
    // Get user message and previous messages
    const data: Message[] = await req.json();
    const userMessage = data[data.length - 1].content;

    // Get the text to embed
    const textsToEmbed = data.map((msg) => msg.content).join("\n");

    // Create Cohere embedding
    const cohereResponse = (await cohere.embed({
      texts: [textsToEmbed],
      model: "embed-multilingual-v3.0",
      inputType: "search_query",
    })) as CohereEmbeddingResponse;

    const embedding = cohereResponse.embeddings[0];

    // Get matches from Pinecone
    const results = await index.query({
      topK: 5,
      includeMetadata: true,
      vector: embedding,
    });

    // Build context string
    let contextString = "<MATCHES>\n";
    results.matches.forEach((match) => {
      contextString += `
      Professor: ${match.metadata?.professor}
      Reviewer: ${match.metadata?.reviewer}
      Review: ${match.metadata?.description}
      Subject: ${match.metadata?.subject}
      Stars: ${match.metadata?.stars}\n
      ---\n`;
    });
    contextString += "</MATCHES>";

    // Build complete user's prompt
    const userPrompt = `${contextString}\n\n<QUERY>${userMessage}</QUERY>`;
    console.log(userPrompt);

    // Get the chat completion stream from Groq
    const previousMessages = data.slice(0, data.length - 1);

    const stream = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        ...previousMessages,
        { role: "user", content: userPrompt },
      ],
      model: "llama3-8b-8192",
      temperature: 0.5,
      max_tokens: 1024,
      top_p: 1,
      stop: null,
      stream: true,
    });

    // Create a streaming response
    const readableStream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder(); // Create a TextEncoder to convert strings to Uint8Array
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || "";
            controller.enqueue(encoder.encode(content));
          }
        } catch (error) {
          controller.error(error); // Handle any errors that occur during streaming
        } finally {
          controller.close(); // Close the stream when done
        }
      },
    });

    return new NextResponse(readableStream);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
