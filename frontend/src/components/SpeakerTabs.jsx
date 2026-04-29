/**
 * SpeakerTabs — horizontal tab bar to switch between speakers.
 * Uses a simple underline indicator for the active tab.
 */
export default function SpeakerTabs({ speakers, activeId, onSelect }) {
  return (
    <div className="flex bg-slate-900">
      {speakers.map((speaker) => {
        const isActive = activeId === speaker.id;
        return (
          <button
            key={speaker.id}
            onClick={() => onSelect(speaker.id)}
            className="flex-1 flex items-center justify-center gap-3 py-4 text-sm font-semibold transition-all relative cursor-pointer group"
            style={{
              color: isActive ? speaker.accent : "#94a3b8",
            }}
          >
            {/* Avatar circle */}
            <span
              className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0 shadow-sm transition-transform group-hover:scale-110"
              style={{
                background: isActive ? speaker.accent : "#334155",
              }}
            >
              {speaker.initials}
            </span>

            {/* Name — full on desktop, first name on mobile */}
            <span className="hidden sm:inline tracking-tight">{speaker.label}</span>
            <span className="sm:hidden">{speaker.label.split(" ")[0]}</span>

            {/* Active underline */}
            {isActive ? (
              <span
                className="absolute bottom-0 left-0 right-0 h-0.75 rounded-t-full shadow-[0_-1px_4px_rgba(0,0,0,0.1)]"
                style={{ background: speaker.accent }}
              />
            ) : (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-transparent group-hover:bg-slate-800 transition-colors" />
            )}
          </button>
        );
      })}
    </div>
  );
}
