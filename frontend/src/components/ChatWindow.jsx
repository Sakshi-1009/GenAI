/**
 * ChatWindow.jsx — scrollable message area.
 *
 * Renders:
 * - Welcome / empty state with persona intro + SuggestionChips
 * - MessageBubble list
 * - TypingIndicator while loading
 *
 * Auto-scrolls to the latest message on every update.
 */

import { useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import SuggestionChips from "./SuggestionChips";

export default function ChatWindow({ messages, loading, speaker, onSend }) {
  const bottomRef = useRef(null);

  // Scroll to bottom whenever messages or loading state changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const isEmpty = messages.length === 0;

  return (
    <main className="chat-canvas" role="log" aria-live="polite">
      <div className="chat-canvas-inner">

        {/* ── Empty / Welcome State ── */}
        {isEmpty && (
          <div className="welcome-state">
            <div
              className="welcome-avatar"
              style={{ background: speaker.accent }}
            >
              {speaker.initials}
            </div>
            <h2 className="welcome-name">{speaker.label}</h2>
            <p className="welcome-role">{speaker.role}</p>

            <SuggestionChips
              suggestions={speaker.suggestions}
              speaker={speaker}
              onSend={onSend}
            />
          </div>
        )}

        {/* ── Message List ── */}
        {!isEmpty && (
          <div className="message-list">
            {messages.map((msg, idx) => (
              <MessageBubble key={idx} message={msg} speaker={speaker} />
            ))}

            {/* Typing indicator */}
            {loading && <TypingIndicator speaker={speaker} />}

            {/* Invisible scroll anchor */}
            <div ref={bottomRef} />
          </div>
        )}

        {/* Show typing indicator even on first message */}
        {isEmpty && loading && (
          <div style={{ marginTop: "24px" }}>
            <TypingIndicator speaker={speaker} />
            <div ref={bottomRef} />
          </div>
        )}
      </div>
    </main>
  );
}
