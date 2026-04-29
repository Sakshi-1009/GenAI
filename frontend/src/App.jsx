/**
 * App.jsx — Root component. Owns all shared state.
 *
 * State shape:
 *   messages  : { sender: "user"|"bot"|"error", text: string }[]
 *   persona   : "anshuman" | "abhimanyu" | "kshitij"
 *   loading   : boolean
 *   error     : string | null  (unused currently — errors appear as bubbles)
 *
 * Message flow:
 *   1. User submits → add user bubble immediately
 *   2. loading = true → TypingIndicator appears
 *   3. API call resolves → add bot bubble
 *   4. API call rejects → add error bubble
 *   5. loading = false
 */

import { useState, useCallback } from "react";
import "./styles/main.css";

import PersonaSwitcher, { PERSONAS } from "./components/PersonaSwitcher";
import ChatWindow from "./components/ChatWindow";
import InputBox from "./components/InputBox";
import { sendMessage } from "./services/api";

// Build a quick lookup map: { anshuman: {...}, abhimanyu: {...}, kshitij: {...} }
// using the persona data already defined in PersonaSwitcher
const PERSONA_MAP = Object.fromEntries(PERSONAS.map((p) => [p.id, p]));

// Persona-specific suggestion questions (kept here so App stays the single source of truth)
const SUGGESTIONS = {
  anshuman: [
    "What's your vision for the future of tech education in India?",
    "How do you think about building a high-growth startup?",
    "What advice would you give to someone switching to a tech career?",
    "How does Scaler measure the success of its students?",
  ],
  abhimanyu: [
    "How should I approach learning data structures and algorithms?",
    "What's your take on system design interviews?",
    "How do you think about clean code and code quality?",
    "What's the best way to prepare for FAANG interviews?",
  ],
  kshitij: [
    "Can you explain dynamic programming with a simple example?",
    "How do I get better at solving graph problems?",
    "What's the best way to debug my code during an interview?",
    "How should I handle a problem I've never seen before in an interview?",
  ],
};

// Role descriptions per persona
const ROLES = {
  anshuman:  "CEO & Co-founder, Scaler Academy",
  abhimanyu: "Co-founder, Scaler Academy / InterviewBit",
  kshitij:   "Instructor & Mentor, Scaler Academy",
};

export default function App() {
  const [persona, setPersona]   = useState("anshuman");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null); // reserved for top-level errors

  // Build a richer speaker object by merging map + extra fields
  const speaker = {
    ...PERSONA_MAP[persona],
    role:        ROLES[persona],
    suggestions: SUGGESTIONS[persona],
  };

  /** Switch persona — resets conversation completely */
  const handlePersonaSwitch = useCallback((newPersona) => {
    if (newPersona === persona) return;
    setPersona(newPersona);
    setMessages([]);
    setError(null);
    setLoading(false);
  }, [persona]);

  /** Send a message — full message flow */
  const handleSend = useCallback(async (text) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    // 1. Optimistically add the user bubble
    const userMsg = { sender: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);

    // Prepare history payload for backend
    const apiMessages = [...messages, userMsg]
      .filter((m) => m.sender !== "error")
      .map((m) => ({
        role: m.sender === "bot" ? "assistant" : "user",
        content: m.text,
      }));

    // 2. Show typing indicator
    setLoading(true);

    try {
      // 3. Call backend API
      const reply = await sendMessage(persona, apiMessages);

      // 4. Add bot reply
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    } catch (err) {
      // 5. Add error bubble (never crash the app)
      const errText = err?.message || "Something went wrong. Please try again.";
      setMessages((prev) => [...prev, { sender: "error", text: errText }]);
    } finally {
      // 6. Always clear loading
      setLoading(false);
    }
  }, [loading, persona, messages]);

  return (
    <div className="app-shell">
      {/* ── Header ── */}
      <header className="app-header">
        <div>
          <h1 className="app-logo">
            Scaler<span>AI</span>
          </h1>
        </div>
        <div className="header-status">
          <div className="header-status-label">
            <span>Talking to</span>
            <span>{speaker.label}</span>
          </div>
          <span
            className="status-dot"
            style={{ background: speaker.accent }}
          />
        </div>
      </header>

      {/* ── Persona Switcher ── */}
      <PersonaSwitcher
        activePersona={persona}
        onSwitch={handlePersonaSwitch}
      />

      {/* ── Chat Window ── */}
      <ChatWindow
        messages={messages}
        loading={loading}
        speaker={speaker}
        onSend={handleSend}
      />

      {/* ── Input Box ── */}
      <InputBox
        onSend={handleSend}
        loading={loading}
        speaker={speaker}
      />
    </div>
  );
}
