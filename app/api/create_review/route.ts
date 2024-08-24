import { NextRequest, NextResponse } from "next/server";
import { cohere, index } from "../sdks";
import { v4 as uuidv4 } from "uuid";
import { CohereEmbeddingResponse } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { professor, reviewer, subject, description, stars } = body;

    // Validate required fields
    if (!professor || !reviewer || !subject || !description || !stars) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // Create Cohere embeddings for the review description
    const cohereResponse = (await cohere.embed({
      model: "embed-multilingual-v3.0",
      texts: [description],
      inputType: "search_query",
      truncate: "NONE",
    })) as CohereEmbeddingResponse;

    const embedding = cohereResponse.embeddings[0];

    // Generate a unique ID for the review
    const reviewId = `${professor}_${uuidv4()}`;

    // Upsert the review into the Pinecone index
    const upsertResponse = await index.upsert([
      {
        id: reviewId,
        values: embedding,
        metadata: {
          professor,
          reviewer,
          subject,
          stars,
          description,
        },
      },
    ]);

    // Return success response
    return NextResponse.json(
      { success: true, upsertResponse },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error storing review in Pinecone:", error);
    return NextResponse.json(
      { error: "Failed to store review" },
      { status: 500 },
    );
  }
}
