/**
 * MessageBubble.jsx — renders a single chat message.
 *
 * - sender="user"  → right-aligned dark bubble
 * - sender="bot"   → left-aligned bubble with avatar + accent border
 * - sender="error" → centered red error bubble
 */

export default function MessageBubble({ message, speaker }) {
  const { sender, text } = message;

  if (sender === "user") {
    return (
      <div className="message-row user">
        <div className="bubble-user">{text}</div>
      </div>
    );
  }

  if (sender === "error") {
    return (
      <div className="message-row error">
        <div className="bubble-error">⚠️ {text}</div>
      </div>
    );
  }

  // sender === "bot"
  return (
    <div className="message-row bot">
      {/* Speaker avatar */}
      <div
        className="bubble-bot-avatar"
        style={{ background: speaker.accent }}
        aria-hidden="true"
      >
        {speaker.initials}
      </div>

      {/* Message body */}
      <div
        className="bubble-bot"
        style={{ borderLeft: `3px solid ${speaker.accent}` }}
      >
        <p
          className="bubble-bot-speaker"
          style={{ color: speaker.accent }}
        >
          {speaker.label}
        </p>
        <p className="bubble-bot-text">{text}</p>
      </div>
    </div>
  );
}
