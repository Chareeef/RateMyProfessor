import { Pinecone } from "@pinecone-database/pinecone";
import { CohereClient } from "cohere-ai";
import Groq from "groq-sdk";

// Initialize Cohere
export const cohere = new CohereClient({ token: process.env.COHERE_API_KEY });

// Initialize Pinecone index
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY as string });
export const index = pc.index("professors").namespace("ns1");

// Initializing Groq
export const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
