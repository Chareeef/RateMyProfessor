import cohere
from pinecone import Pinecone
from dotenv import load_dotenv
import shortuuid
import json
import os

# Load reviews
reviews = json.load(open("./python_rag/reviews.json"))

# Load environment variables
load_dotenv(".env.local")

# Create cohere client
co = cohere.Client(os.getenv("COHERE_API_KEY"))

# Access Pinecone index
pinecone_api_key = os.getenv("PINECONE_API_KEY")
pc = Pinecone(api_key=pinecone_api_key)
index = pc.Index("professors")

# Create embeddings from reviews
processed_data = []
for rev in reviews:
    response = co.embed(
        model="embed-multilingual-v3.0",
        texts=[rev["description"]],
        input_type="search_query",
        truncate="NONE"
    )

    # Use a unique identifier for each review (e.g., professor + review
    # index)
    review_id = f"{rev['professor']}_{shortuuid.uuid()}"

    processed_data.append(
        {
            "id": review_id,
            "values": response.embeddings[0],
            "metadata": {
                "professor": rev["professor"],
                "reviewer": rev["reviewer"],
                "subject": rev["subject"],
                "stars": rev["stars"],
                "description": rev["description"]
            }
        }
    )

# Store embeddings in Pinecone index
upsert_response = index.upsert(
    vectors=processed_data,
    namespace="ns1",
)
print(f"Upserted count: {upsert_response['upserted_count']}")

# Print index statistics
print("\nStatistics:\n")
print(index.describe_index_stats())
