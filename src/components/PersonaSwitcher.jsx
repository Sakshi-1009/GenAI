/**
 * PersonaSwitcher.jsx — horizontal tab bar for switching between 3 personas.
 * Highlights the active persona and shows an accent-colored underline indicator.
 */

const PERSONAS = [
  { id: "anshuman",  label: "Anshuman Singh",   initials: "AS", accent: "#2563eb" },
  { id: "abhimanyu", label: "Abhimanyu Saxena",  initials: "AX", accent: "#059669" },
  { id: "kshitij",   label: "Kshitij Mishra",   initials: "KM", accent: "#7c3aed" },
];

export { PERSONAS };

export default function PersonaSwitcher({ activePersona, onSwitch }) {
  return (
    <nav className="persona-nav" role="tablist" aria-label="Persona switcher">
      {PERSONAS.map((persona) => {
        const isActive = activePersona === persona.id;
        return (
          <button
            key={persona.id}
            role="tab"
            aria-selected={isActive}
            id={`tab-${persona.id}`}
            onClick={() => onSwitch(persona.id)}
            className={`persona-tab${isActive ? " active" : ""}`}
            style={{ color: isActive ? persona.accent : undefined }}
          >
            {/* Avatar circle */}
            <span
              className="persona-tab-avatar"
              style={{
                background: isActive ? persona.accent : "#334155",
              }}
            >
              {persona.initials}
            </span>

            {/* Name */}
            <span className="persona-tab-name">{persona.label}</span>

            {/* Active underline indicator */}
            {isActive && (
              <span
                className="persona-tab-underline"
                style={{ background: persona.accent }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
