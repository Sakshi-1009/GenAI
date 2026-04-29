/**
 * api.js — Centralized API service for the ScalerAI chatbot.
 *
 * Matches the ACTUAL backend contract in server.js:
 *   POST /api/chat
 *   Body: { messages: [{role, content}][], speakerId: string }
 *   Response: { reply: string }
 */

const ENDPOINT = "/api/chat";

/**
 * sendMessage — sends the full conversation history + speakerId to the backend.
 *
 * @param {string} speakerId   - "anshuman" | "abhimanyu" | "kshitij"
 * @param {Array}  messages    - full history: [{ role: "user"|"assistant", content: string }]
 * @returns {Promise<string>}  - resolves with the bot's reply text
 * @throws {Error}             - throws on network or server error
 */
export async function sendMessage(speakerId, messages) {
  let response;

  try {
    response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages, speakerId }),
    });
  } catch {
    // Network-level failure (server down, CORS, no connection)
    throw new Error("Unable to reach the server. Is the backend running on port 3001?");
  }

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error("Server returned an unexpected response format.");
  }

  if (!response.ok) {
    throw new Error(data?.error || "Something went wrong. Please try again.");
  }

  if (typeof data?.reply !== "string") {
    throw new Error("Invalid response from server.");
  }

  return data.reply;
}
