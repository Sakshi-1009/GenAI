# GenAi — Persona-Based Chatbot

A conversational AI application that lets you chat with AI-powered personas of three Scaler Academy leaders. Each persona has a distinct personality, communication style, and area of expertise — powered by Google's Gemini API.

## Features

- **Three distinct AI personas** — switch between Anshuman Singh (CEO mindset), Abhimanyu Saxena (deep technical), and Kshitij Mishra (educator & mentor)
- **Conversation memory** — multi-turn chat with full context passed to the model
- **Suggestion chips** — quick-start questions tailored to each persona
- **Automatic reset** — switching speakers clears history to maintain persona consistency
- **Graceful error handling** — safety-blocked and empty responses are caught and handled with user-friendly messages
- **Responsive layout** — works on desktop and mobile

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite, Tailwind CSS v4 |
| Backend | Node.js, Express |
| AI | Google Gemini API (`gemini-2.5-flash`) |
| Language | JavaScript (ES Modules) |

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Google Gemini API key ([get one here](https://aistudio.google.com/app/apikey))

### 1. Clone and enter the project

```bash
git clone <your-repo-url>
cd GenAi
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure your API key

```bash
cp .env.example .env
```

Open `.env` and paste your Gemini API key:

```
GEMINI_API_KEY=your_actual_key_here
```

### 4. Run in development mode

```bash
npm run dev
```

This starts both the Express backend (port 3001) and the Vite dev server (port 3000) concurrently. Open [http://localhost:3000](http://localhost:3000).

### 5. Production build

```bash
npm start
```

Builds the frontend and serves everything from the Express server on port 3001.

## Project Structure

```
GenAi/
├── server.js                    # Express backend — Gemini chat endpoint
├── index.html                   # HTML entry point
├── vite.config.js               # Vite + React + Tailwind + proxy config
├── package.json
├── .env.example                 # API key template
├── src/
│   ├── main.jsx                 # React entry point
│   ├── App.jsx                  # Root component
│   ├── index.css                # Tailwind imports + custom styles
│   ├── data/
│   │   └── speakers.js          # Persona definitions & system prompts
│   └── components/
│       ├── ConversationPanel.jsx # Main chat interface (state + logic)
│       ├── SpeakerTabs.jsx      # Tab bar for switching personas
│       ├── ChatBubble.jsx       # Individual message display
│       └── LoadingDots.jsx      # Typing indicator animation
├── prompts.md                   # Annotated system prompt documentation
└── reflection.md                # Reflection on prompt engineering
```

## Personas

| Speaker | Role | Expertise |
|---------|------|-----------|
| Anshuman Singh | CEO & Co-founder | Startup strategy, education vision, data-driven decisions |
| Abhimanyu Saxena | Co-founder | DSA, system design, technical depth, interview prep |
| Kshitij Mishra | Instructor & Mentor | Teaching methodology, algorithms, student mentoring |

## How It Works

1. The frontend sends the full conversation history + selected speaker ID to `POST /api/chat`.
2. The Express backend loads the speaker's system prompt and initializes a Gemini chat session with it.
3. The conversation history is passed as chat context, and the latest message is sent to Gemini.
4. The response is returned — with special handling for safety-blocked, recitation, or empty responses.
5. The frontend appends the response to the chat log and re-renders.

## Documentation

- [prompts.md](./prompts.md) — Annotated system prompts with design rationale
- [reflection.md](./reflection.md) — Reflection on prompt engineering and GIGO principle

## Deployment

1. Push to GitHub
2. Deploy on any Node.js-compatible platform (Vercel, Railway, Render, etc.)
3. Set the `GEMINI_API_KEY` environment variable in your hosting dashboard
4. For Vercel: use the Express server as a serverless function or deploy as a standalone Node app
