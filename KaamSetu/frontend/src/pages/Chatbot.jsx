import { useState } from "react";
import API from "../services/api";

export default function Chatbot() {
  const [message, setMessage] =
    useState("");

  const [reply, setReply] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const sendMessage = async () => {
    if (!message) return;

    try {
      setLoading(true);

      const { data } = await API.post(
        "/ai/chat",
        {
          message,
        }
      );

      setReply(data.reply);

      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-2xl">
        <h1 className="text-4xl font-bold mb-6">
          AI Labour Assistant
        </h1>

        <textarea
          rows="4"
          placeholder="Ask anything..."
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          className="w-full border p-4 rounded-lg mb-4"
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          {loading
            ? "Thinking..."
            : "Ask AI"}
        </button>

        {reply && (
          <div className="mt-8 bg-gray-100 p-5 rounded-xl">
            <h2 className="text-2xl font-bold mb-3">
              AI Response
            </h2>

            <p className="whitespace-pre-wrap">
              {reply}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}