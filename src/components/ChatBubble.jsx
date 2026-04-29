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
        <div className="max-w-[80%] bg-slate-800 text-slate-100 rounded-2xl rounded-tr-sm px-5 py-3 shadow-lg">
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
        className="max-w-[80%] bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-sm px-5 py-3 shadow-lg"
        style={{ borderLeftColor: speaker.accent, borderLeftWidth: "3px" }}
      >
        <p className="text-[11px] font-bold mb-1.5 uppercase tracking-wider" style={{ color: speaker.accent }}>
          {speaker.label}
        </p>
        <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
          {entry.content}
        </p>
      </div>
    </div>
  );
}
