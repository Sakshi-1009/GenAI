import { useState, useRef, useEffect, useCallback } from "react";
import { speakers, speakerList, DEFAULT_SPEAKER } from "../data/speakers";
import SpeakerTabs from "./SpeakerTabs";
import ChatBubble from "./ChatBubble";
import LoadingDots from "./LoadingDots";

/**
 * ConversationPanel — the main chat interface.
 * Manages speaker selection, message history, input, and API calls.
 */
export default function ConversationPanel() {
  const [activeSpeakerId, setActiveSpeakerId] = useState(DEFAULT_SPEAKER);
  const [chatLog, setChatLog] = useState([]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const scrollAnchor = useRef(null);
  const inputBox = useRef(null);

  const currentSpeaker = speakers[activeSpeakerId];

  // Auto-scroll to newest message
  useEffect(() => {
    scrollAnchor.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog, pending]);

  // Switch speaker → reset conversation
  const switchSpeaker = useCallback((id) => {
    if (id === activeSpeakerId) return;
    setActiveSpeakerId(id);
    setChatLog([]);
    setErrorMsg(null);
    setDraft("");
  }, [activeSpeakerId]);

  // Dispatch a message to the backend
  const dispatch = useCallback(async (text) => {
    const trimmed = text.trim();
    if (!trimmed || pending) return;

    setErrorMsg(null);

    const userEntry = { role: "user", content: trimmed };
    const updatedLog = [...chatLog, userEntry];

    setChatLog(updatedLog);
    setDraft("");
    setPending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedLog,
          speakerId: activeSpeakerId,
        }),
      });

      const body = await response.json();

      if (!response.ok) {
        throw new Error(body.error || "Request failed");
      }

      const assistantEntry = { role: "assistant", content: body.reply };
      setChatLog((prev) => [...prev, assistantEntry]);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please retry.");
      // Roll back optimistic update
      setChatLog(chatLog);
    } finally {
      setPending(false);
      inputBox.current?.focus();
    }
  }, [chatLog, pending, activeSpeakerId]);

  // Keyboard handler for the input
  const onKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      dispatch(draft);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center">
      <div className="w-full max-w-4xl bg-white flex flex-col shadow-2xl overflow-hidden">
        
        {/* ── Header ── */}
        <header className="bg-white border-b border-gray-200 px-8 py-6 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tighter uppercase italic">
                GenAI <span className="text-slate-400 font-normal not-italic tracking-normal normal-case ml-1">Persona</span>
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Talking to</span>
                <span className="text-sm font-bold text-slate-900">{currentSpeaker.label}</span>
              </div>
              <div 
                className="w-2 h-2 rounded-full animate-pulse" 
                style={{ background: currentSpeaker.accent }}
              />
            </div>
          </div>
        </header>

        {/* ── Speaker Tabs ── */}
        <nav className="bg-slate-50 border-b border-gray-200">
          <SpeakerTabs
            speakers={speakerList}
            activeId={activeSpeakerId}
            onSelect={switchSpeaker}
          />
        </nav>

        {/* ── Chat Canvas ── */}
        <main className="flex-1 overflow-y-auto bg-white relative">
          <div className="max-w-3xl mx-auto px-8 py-10">

            {/* Empty State: Intro & Suggestions */}
            {chatLog.length === 0 && (
              <div className="flex flex-col items-center py-16 text-center animate-in fade-in duration-700">
                <div
                  className="w-24 h-24 rounded-3xl flex items-center justify-center text-3xl font-black text-white mb-8 shadow-xl rotate-3"
                  style={{ background: currentSpeaker.accent }}
                >
                  {currentSpeaker.initials}
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">
                  {currentSpeaker.label}
                </h2>
                <p className="text-lg text-slate-500 mb-12 max-w-lg leading-relaxed">
                  {currentSpeaker.role}
                </p>

                <div className="w-full max-w-2xl">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-px flex-1 bg-slate-200"></div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Quick Starts</span>
                    <div className="h-px flex-1 bg-slate-200"></div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentSpeaker.suggestions.map((text, idx) => (
                      <button
                        key={idx}
                        onClick={() => dispatch(text)}
                        className="group text-left text-sm bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 hover:bg-white hover:border-slate-400 hover:shadow-xl hover:-translate-y-1 transition-all text-slate-700 cursor-pointer relative overflow-hidden"
                      >
                        <div 
                          className="absolute left-0 top-0 bottom-0 w-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ background: currentSpeaker.accent }}
                        />
                        <span className="relative z-10 leading-snug font-medium">{text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Message List */}
            <div className="space-y-6">
              {chatLog.map((entry, idx) => (
                <ChatBubble key={idx} entry={entry} speaker={currentSpeaker} />
              ))}
              {pending && <LoadingDots accent={currentSpeaker.accent} />}
              <div ref={scrollAnchor} />
            </div>
          </div>
        </main>

        {/* ── Input Zone ── */}
        <footer className="bg-slate-50 border-t border-gray-200 px-8 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-4 items-end bg-white border border-slate-200 rounded-2xl p-2 shadow-sm focus-within:shadow-md focus-within:border-slate-400 transition-all">
              <textarea
                ref={inputBox}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={onKeyPress}
                placeholder={`Type a message for ${currentSpeaker.label.split(" ")[0]}...`}
                rows={1}
                disabled={pending}
                className="flex-1 resize-none bg-transparent px-4 py-3 text-base focus:outline-none max-h-40 overflow-y-auto"
                style={{ minHeight: "48px" }}
              />
              <button
                onClick={() => dispatch(draft)}
                disabled={!draft.trim() || pending}
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all shrink-0 cursor-pointer shadow-lg active:scale-90"
                style={{ background: currentSpeaker.accent }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
              </button>
            </div>
            <div className="flex justify-between items-center mt-4 px-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Press Enter to send
              </p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                AI can make mistakes
              </p>
            </div>
          </div>
        </footer>

        {/* ── Error Notification ── */}
        {errorMsg && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-4 duration-300">
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-500">
                <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.401 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
              </svg>
              <p className="text-sm font-bold">{errorMsg}</p>
              <button onClick={() => setErrorMsg(null)} className="text-red-400 hover:text-red-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
