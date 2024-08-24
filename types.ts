export interface Message {
  role: "assistant" | "user";
  content: string;
}

export interface CohereEmbeddingResponse {
  embeddings: number[][];
}
