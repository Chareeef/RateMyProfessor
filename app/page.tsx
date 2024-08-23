"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { MdSend } from "react-icons/md";

interface Message {
  role: "assistant" | "user";
  content: string;
}

function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userMessage, setUserMessage] = useState<string>("");

  const initialMsgs = [
    {
      role: "user",
      content:
        "I am looking for a great professor with a passion for astrophysics.",
    },
    {
      role: "assistant",
      content: `# Best matches:
Based on your query, I highly recommend **Dr. Emily Bell** for her astrophysics course. According to John Turner's review, Dr. Bell's course is "out of this world" and her firsthand accounts of discoveries are inspiring. With a perfect 5-star rating, it's clear that Dr. Bell has made a significant impact on her students.

### Here's a snippet from the review that highlights Dr. Bell's strengths:

*"Her firsthand accounts of discoveries are inspiring."*

This suggests that Dr. Bell's passion for astrophysics is contagious and will likely inspire you to learn more about the subject. Additionally, her 5-star rating indicates that she is an exceptional professor who has earned the trust and admiration of her students.

If you're looking for a professor with a similar style, you may also consider Dr. Richard Gardner, who is also a 5-star rated professor in the physics department. While his review doesn't specifically mention astrophysics, his enthusiasm for physics is contagious, and his ability to explain complex concepts in a clear and understandable way is a valuable asset.

Lastly, Dr. Nicole Lee is another great option, with a 4-star rating and a focus on theoretical physics concepts. Her explanations are clear and engaging, and her enthusiasm is infectious.

All three professors seem to have a genuine passion for their subject matter, which is essential for a great learning experience. I recommend exploring their courses and reviews further to determine which one best fits your learning style and preferences.`,
    },
  ];

  return (
    <div className="w-[70%] h-[20em] flex flex-col bg-stone-300 border-2 border-black rounded-xl m-4 shadow-xl overflow-hidden">
      <div className="grow border-b-2 border-black p-2 overflow-y-auto">
        <div className="flex flex-col justify-end gap-y-2">
          {messages.map((msg) => (
            <div
              className={`max-w-[70%] p-2 ${msg.role === "user" ? "rounded-l-lg bg-white self-end" : "rounded-r-lg bg-black text-white"}`}
            >
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-5 gap-0">
        <input
          className="col-span-4 p-2"
          placeholder="Enter your query..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
        />

        <button
          className="bg-stone-500 p-2 flex items-center justify-center"
          onClick={() => setMessages(initialMsgs)}
        >
          <MdSend />
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="grow flex flex-col justify-center items-center">
      <Chat />
    </main>
  );
}
