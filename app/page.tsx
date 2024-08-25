"use client";
import { useEffect } from "react";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

export default function LandingPage() {
  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 600 });
  }, []);

  return (
    <main className="grow flex flex-col justify-center items-center p-8 text-lg overflow-hidden">
      <div className="w-full p-10 bg-white rounded-lg shadow-lg space-y-16">
        {/* Header Section */}
        <section className="text-center space-y-4">
          <h2 className="text-4xl">Welcome to :</h2>
          <h1 className="text-5xl">Rate My Professor</h1>
          <p className="text-xl text-gray-800">
            Find the best professor for your needs, powered by AI.
          </p>
        </section>

        {/* Features Section */}
        <section className="flex flex-col md:flex-row justify-around items-center gap-4">
          {/* Feature 1 */}
          <div
            className="flex flex-col gap-y-4 bg-gradient-to-r from-purple-400 to-indigo-600 p-6 rounded-lg shadow-xl text-white w-full md:w-[45%] text-center"
            data-aos="flip-up"
          >
            <h3 className="m-0">AI Recommendations</h3>
            <p>
              Share what you are looking for with our AI agent and receive
              instant recommendations.
            </p>
            <Link href="/chat">
              <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-200">
                Chat Now
              </button>
            </Link>
          </div>

          {/* Feature 2 */}
          <div
            className="flex flex-col gap-y-4 bg-gradient-to-r from-green-400 to-teal-600 p-6 rounded-lg shadow-xl text-white w-full md:w-[45%] text-center"
            data-aos="flip-down"
          >
            <h3 className="m-0">Submit a Review</h3>
            <p>
              Submit a review about your professor and help others make informed
              decisions.
            </p>
            <Link href="/create_review">
              <button className="px-6 py-3 bg-white text-teal-600 font-semibold rounded-lg hover:bg-gray-200">
                Submit Review
              </button>
            </Link>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="flex flex-col items-center gap-y-8">
          <h2 className="text-3xl font-semibold text-gray-800">
            Behind The Scenes
          </h2>
          <div className="flex flex-col justify-around gap-y-12 w-full">
            <div
              className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-lg shadow-xl text-white w-full text-center"
              data-aos="fade-right"
            >
              <h4 className="text-xl font-semibold">
                Generate Vector Embeddings
              </h4>
              <p>Generate vector embeddings for reviews using Cohere.</p>
            </div>

            <div
              className="bg-gradient-to-r from-sky-700 to-indigo-700 p-6 rounded-lg shadow-xl text-white w-full text-center"
              data-aos="fade-left"
            >
              <h4 className="text-xl font-semibold">Store Embeddings</h4>
              <p>Save the vector embeddings in our Pinecone index.</p>
            </div>

            <div
              className="bg-gradient-to-r from-red-400 to-pink-500 p-6 rounded-lg shadow-xl text-white w-full text-center"
              data-aos="fade-right"
            >
              <h4 className="text-xl font-semibold">Retrieve Best Matches</h4>
              <p>
                Get the best matching results from Pinecone based on user
                queries.
              </p>
            </div>

            <div
              className="bg-gradient-to-r from-purple-800 to-blue-700 p-6 rounded-lg shadow-xl text-white w-full text-center"
              data-aos="fade-left"
            >
              <h4 className="text-xl font-semibold">Chat with LLM</h4>
              <p>
                Engage in meaningful conversations with the Groq API using
                contextual data.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center" data-aos="zoom-in">
          <Link href="/chat">
            <button className="px-8 py-4 bg-purple-600 text-white text-xl font-bold rounded-lg shadow-md hover:bg-purple-700">
              Get Started
            </button>
          </Link>
        </section>
      </div>
    </main>
  );
}
