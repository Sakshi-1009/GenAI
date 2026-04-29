/**
 * TypingIndicator.jsx — three animated dots shown while
 * waiting for the bot to respond.
 */

export default function TypingIndicator({ speaker }) {
  return (
    <div className="typing-row" aria-label={`${speaker.label} is typing`}>
      {/* Speaker avatar */}
      <div
        className="bubble-bot-avatar"
        style={{ background: speaker.accent }}
        aria-hidden="true"
      >
        {speaker.initials}
      </div>

      {/* Animated dots bubble */}
      <div className="typing-bubble">
        <span className="typing-dot" style={{ background: speaker.accent }} />
        <span className="typing-dot" style={{ background: speaker.accent }} />
        <span className="typing-dot" style={{ background: speaker.accent }} />
      </div>
    </div>
  );
}
