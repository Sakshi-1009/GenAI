/**
 * InputBox.jsx — sticky textarea + send button at the bottom.
 *
 * Features:
 * - Enter to send (Shift+Enter for newline)
 * - Send button disabled while loading or input is empty
 * - Auto-focus after each message
 */

import { useRef, useEffect } from "react";

export default function InputBox({ onSend, loading, speaker }) {
  const textareaRef = useRef(null);

  // Re-focus the input after loading completes
  useEffect(() => {
    if (!loading) {
      textareaRef.current?.focus();
    }
  }, [loading]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const submit = () => {
    const value = textareaRef.current?.value?.trim();
    if (!value || loading) return;
    onSend(value);
    textareaRef.current.value = ""; // reset without re-render cost
  };

  return (
    <footer className="input-footer">
      <div className="input-footer-inner">
        <div className="input-bar">
          <textarea
            ref={textareaRef}
            id="chat-input"
            className="input-textarea"
            placeholder={`Message ${speaker.label.split(" ")[0]}…`}
            rows={1}
            disabled={loading}
            onKeyDown={handleKeyDown}
            aria-label="Type your message"
          />
          <button
            id="send-btn"
            className="send-btn"
            onClick={submit}
            disabled={loading}
            style={{ background: speaker.accent }}
            aria-label="Send message"
          >
            {/* Paper-plane icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="20"
              height="20"
            >
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </div>

        <div className="input-hint">
          <span>Enter to send · Shift+Enter for newline</span>
          <span>AI can make mistakes</span>
        </div>
      </div>
    </footer>
  );
}
