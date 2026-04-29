import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { speakers } from "./speakers.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

/* ── Gemini client setup ── */

const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const contentFilters = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
];

/* ── Chat endpoint ── */

app.post("/api/chat", async (req, res) => {
  try {
    const { messages, speakerId } = req.body;

    // Validate speaker
    const speaker = speakers[speakerId];
    if (!speaker) {
      return res.status(400).json({ error: "Unknown speaker identifier." });
    }

    // Validate messages
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "At least one message is required." });
    }

    // Build generative model with the speaker's system instruction
    const model = gemini.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
      systemInstruction: speaker.systemPrompt,
      safetySettings: contentFilters,
    });

    // Separate history (all messages except the latest) and the current user query
    const conversationHistory = messages.slice(0, -1).map((entry) => ({
      role: entry.role === "assistant" ? "model" : "user",
      parts: [{ text: entry.content }],
    }));

    const chat = model.startChat({ history: conversationHistory });

    const latestMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(latestMessage.content);
    const geminiResponse = result.response;
    const topCandidate = geminiResponse.candidates?.[0];
    const stopReason = topCandidate?.finishReason;

    // Handle safety-blocked responses gracefully
    if (stopReason === "SAFETY") {
      return res.json({
        reply: "I'd prefer not to go there — let's talk about something else. What's on your mind?",
      });
    }

    // Handle recitation-blocked responses
    if (stopReason === "RECITATION") {
      return res.json({
        reply: "Let me rephrase that. Could you ask from a slightly different angle?",
      });
    }

    const replyText = geminiResponse.text();

    if (!replyText || !replyText.trim()) {
      return res.json({
        reply: "I couldn't form a clear response — could you rephrase the question?",
      });
    }

    return res.json({ reply: replyText });
  } catch (err) {
    console.error("[Chat API Error]", err);
    const detail = err instanceof Error ? err.message : "Unexpected failure";
    return res.status(500).json({ error: `Server error: ${detail}` });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running → http://localhost:${PORT}`);
});
