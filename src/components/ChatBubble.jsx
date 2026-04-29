/**
 * ChatBubble — renders a single message.
 * User messages appear on the right; assistant messages on the left
 * with the speaker's avatar and a colored left-border accent.
 */
export default function ChatBubble({ entry, speaker }) {
  const isUser = entry.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end mb-3">
        <div className="max-w-[75%] bg-gray-800 text-white rounded-2xl rounded-tr-sm px-4 py-2.5">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{entry.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2.5 mb-3">
      {/* Speaker avatar */}
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-0.5"
        style={{ background: speaker.accent }}
      >
        {speaker.initials}
      </div>

      {/* Message body */}
      <div
        className="max-w-[75%] bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-2.5"
        style={{ borderLeftColor: speaker.accent, borderLeftWidth: "2px" }}
      >
        <p className="text-[11px] font-semibold mb-1" style={{ color: speaker.accent }}>
          {speaker.label}
        </p>
        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
          {entry.content}
        </p>
      </div>
    </div>
  );
}
