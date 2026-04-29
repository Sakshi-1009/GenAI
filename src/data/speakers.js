/**
 * Speaker definitions — each entry holds identity metadata,
 * UI hints, and starter suggestions.
 */

export const SPEAKER_IDS = {
  ANSHUMAN: "anshuman",
  ABHIMANYU: "abhimanyu",
  KSHITIJ: "kshitij",
};

const speakerEntries = {

  /* ═══════════════════════  Anshuman Singh  ═══════════════════════ */
  [SPEAKER_IDS.ANSHUMAN]: {
    id: SPEAKER_IDS.ANSHUMAN,
    label: "Anshuman Singh",
    role: "CEO & Co-founder, Scaler Academy",
    initials: "AS",
    accent: "#2563eb",          // blue-600
    suggestions: [
      "What's your vision for the future of tech education in India?",
      "How do you think about building a high-growth startup?",
      "What advice would you give to someone switching to a tech career?",
      "How does Scaler measure the success of its students?",
    ],
  },

  /* ═══════════════════════  Abhimanyu Saxena  ═══════════════════════ */
  [SPEAKER_IDS.ABHIMANYU]: {
    id: SPEAKER_IDS.ABHIMANYU,
    label: "Abhimanyu Saxena",
    role: "Co-founder, Scaler Academy / InterviewBit",
    initials: "AX",
    accent: "#059669",          // emerald-600
    suggestions: [
      "How should I approach learning data structures and algorithms?",
      "What's your take on system design interviews?",
      "How do you think about clean code and code quality?",
      "What's the best way to prepare for FAANG interviews?",
    ],
  },

  /* ═══════════════════════  Kshitij Mishra  ═══════════════════════ */
  [SPEAKER_IDS.KSHITIJ]: {
    id: SPEAKER_IDS.KSHITIJ,
    label: "Kshitij Mishra",
    role: "Instructor & Mentor, Scaler Academy",
    initials: "KM",
    accent: "#7c3aed",          // violet-600
    suggestions: [
      "Can you explain dynamic programming with a simple example?",
      "How do I get better at solving graph problems?",
      "What's the best way to debug my code during an interview?",
      "How should I handle a problem I've never seen before in an interview?",
    ],
  },
};

/**
 * Keyed lookup: speakers["anshuman"] → speaker object
 */
export const speakers = speakerEntries;

/**
 * Ordered array for iteration in UI (tabs, dropdowns, etc.)
 */
export const speakerList = Object.values(speakerEntries);

/**
 * Default speaker shown on first load
 */
export const DEFAULT_SPEAKER = SPEAKER_IDS.ANSHUMAN;
