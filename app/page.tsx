"use client";
import { Dispatch, SetStateAction, useState } from "react";
import ReactMarkdown from "react-markdown";
import { MdSend } from "react-icons/md";
import { Message } from "@/types";

function Chat({
  setErrorMessage,
}: {
  setErrorMessage: Dispatch<SetStateAction<string>>;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userMessage, setUserMessage] = useState<string>("");

  async function sendMessage() {
    if (!userMessage.trim()) return;

    setMessages((messages) => [
      ...messages,
      { role: "user", content: userMessage },
      { role: "assistant", content: "" },
    ]);

    setUserMessage("");

    try {
      const response = await fetch("/api/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([
          ...messages,
          { role: "user", content: userMessage },
        ]),
      });

      if (!response.body) {
        console.error("response.body is not found");
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value }: ReadableStreamReadResult<Uint8Array> =
          await reader.read();

        if (done) {
          break;
        } else if (value) {
          const chunk = decoder.decode(value, { stream: true });
          setMessages((messages) => [
            ...messages.slice(0, messages.length - 1),
            {
              role: "assistant",
              content: messages[messages.length - 1].content + chunk,
            },
          ]);
        }
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong our side. Try again later.");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  }

  return (
    <div className="grow w-[70%] flex flex-col bg-stone-300 border-2 border-black rounded-xl m-4 shadow-xl overflow-hidden text-sm">
      <div className="grow border-b-2 border-black overflow-y-auto">
        <div className="flex flex-col justify-end p-2 min-h-full space-y-2">
          {messages.length === 0 && (
            <p className="text-gray-700 self-center text-center">
              What kind of professor are you looking for ?
            </p>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[70%] p-2 ${msg.role === "user" ? "self-end rounded-l-lg bg-white" : "self-start rounded-r-lg bg-black text-white"}`}
            >
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-5 gap-0">
        <input
          className="col-span-4 p-2 focus:outline-none"
          placeholder="Enter your query..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
        />

        <button
          className="bg-stone-500 hover:bg-stone-600 border-l-2 border-black p-2 flex items-center justify-center"
          onClick={sendMessage}
        >
          <MdSend />
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const [errorMessage, setErrorMessage] = useState<string>("");

  return (
    <main className="grow flex flex-col justify-center items-center h-[80svh]">
      {errorMessage && (
        <div className="absolute bg-red-600 p-2 text-white rounded">
          {errorMessage}
        </div>
      )}

      <Chat setErrorMessage={setErrorMessage} />
    </main>
  );
}
