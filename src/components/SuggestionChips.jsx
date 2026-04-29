/**
 * SuggestionChips.jsx — quick-start question cards shown on
 * the empty/welcome screen for each persona.
 *
 * Clicking a chip immediately dispatches that message.
 */

export default function SuggestionChips({ suggestions, speaker, onSend }) {
  return (
    <div className="suggestions-section">
      {/* Section divider */}
      <div className="suggestions-divider">
        <div className="suggestions-divider-line" />
        <span className="suggestions-divider-label">Quick Starts</span>
        <div className="suggestions-divider-line" />
      </div>

      {/* 2-column grid of chips */}
      <div className="suggestions-grid">
        {suggestions.map((text, idx) => (
          <button
            key={idx}
            className="suggestion-chip"
            onClick={() => onSend(text)}
            id={`suggestion-${speaker.id}-${idx}`}
          >
            {/* Accent left bar on hover */}
            <span
              className="suggestion-chip-accent"
              style={{ background: speaker.accent }}
            />
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}
