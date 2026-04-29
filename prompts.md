# System Prompts — Design Rationale

This document explains the thinking behind each speaker's system prompt and why specific techniques were used.

---

## Speaker 1: Anshuman Singh (CEO & Co-founder)

### Design Approach

Anshuman's prompt is built around three pillars: **data-driven conviction**, **first-principles reasoning**, and **outcome-focused education**. Rather than using a generic "business leader" description, the prompt anchors him in real biographical details — IIT Bombay, engineering background, the InterviewBit-to-Scaler journey — to prevent the model from defaulting to a cookie-cutter CEO voice.

### Few-Shot Examples (3 provided)

1. **"What makes Scaler different?"** — The response leads with specific metrics (placement rates, salary multipliers), modeling his habit of backing claims with data rather than vague promises.
2. **"Hiring leadership"** — Focuses on mission alignment and ownership culture, reflecting publicly known hiring philosophy.
3. **"Should engineers do an MBA?"** — Demonstrates his pragmatic, contrarian streak. He pushes back on credential-seeking with a reasoned argument.

### Chain-of-Thought Instruction

> *"Think through: What is the core concern? What data can I draw on? What would Anshuman actually say?"*

This forces the model to reason about persona authenticity before generating output, reducing generic responses.

### Constraints

Specific and testable: "no fabricated statistics," "no competitor bashing by name," "no hollow motivational phrases." Vague constraints like "be accurate" proved ineffective during testing.

---

## Speaker 2: Abhimanyu Saxena (Co-founder / Technical)

### Design Approach

Abhimanyu is positioned as the **technical counterweight** to Anshuman. His prompt emphasizes IIT Delhi, deep CS fundamentals expertise, and frustration with cargo-cult learning. This creates a voice that's clearly distinct from Speaker 1 — methodical, precise, and focused on conceptual depth.

### Few-Shot Examples (3 provided)

1. **"How to start DSA?"** — Prescribes a concrete progression (arrays → hashmaps → recursion → trees) instead of vague advice. Models his systematic approach.
2. **"System design mistakes"** — Technical answer with clear mental models and a focus on "why" over "what."
3. **"Is CP necessary?"** — Balanced take that acknowledges CP's value while noting its limits. Reflects someone who deeply understands both interview prep and real-world engineering.

### Chain-of-Thought Instruction

> *"What is the conceptual core? What misconceptions do people have? What does someone need to understand, not just know?"*

This pushes responses toward depth rather than surface-level answers.

### Output Specification

Structured format for multi-step answers. Time and space complexity always included for algorithmic questions. Code only when it genuinely clarifies.

---

## Speaker 3: Kshitij Mishra (Instructor & Mentor)

### Design Approach

Kshitij is the **educator archetype** — a competitive programmer who became a teacher and deeply remembers the confusion of learning. The prompt deliberately adds emotional grounding ("you remember what it felt like to be confused by recursion") to make this persona warm and relatable, separating it from the founder personas.

### Few-Shot Examples (3 provided)

1. **"DP from scratch"** — Uses the Fibonacci reframe to demystify DP. Warm, encouraging tone. Builds from what students already know.
2. **"BFS vs. DFS"** — Analogy-first explanation (ripples vs. maze), then practical heuristics for interview pattern-matching.
3. **"Freezing in interviews"** — Addresses the anxiety component directly with a phase-separation framework. Most technical resources ignore the emotional dimension.

### Chain-of-Thought Instruction

> *"Where is the student stuck? What's the minimal unlock? What analogy would make this click?"*

This steers toward pedagogically effective responses rather than information dumps.

---

## Cross-Cutting Design Principles

| Principle | Implementation |
|-----------|---------------|
| **GIGO awareness** | Each prompt uses specific behavioral directives, never vague instructions like "be helpful" |
| **Few-shot grounding** | 3 examples per persona establish tone and reasoning patterns before any user input |
| **Chain-of-thought** | Each prompt instructs internal reasoning before output generation |
| **Constraint specificity** | Constraints are testable ("do not fabricate statistics") rather than vague ("be accurate") |
| **Distinct voices** | Each persona has a different primary lens — CEO/data, Technical/depth, Educator/empathy |
