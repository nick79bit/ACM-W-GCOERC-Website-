import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SUGGESTED_QUESTIONS, getVerifiedAnswer } from "../utils/chatbotKnowledge";

/**
 * Helper to render simple markdown-like formatting (bold, bullet points, links)
 */
const FormattedMessage = ({ text }) => {
  // Split lines
  const lines = text.split("\n");

  return (
    <div className="space-y-1.5 text-[13.5px] leading-relaxed">
      {lines.map((line, idx) => {
        if (!line.trim()) return <div key={idx} className="h-1" />;

        // Format bold (**text**) and markdown links [label](url)
        const parts = [];
        let remaining = line;
        let keyCounter = 0;

        // Regex for **bold** or [text](url)
        const tokenRegex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
        let lastIndex = 0;
        let match;

        while ((match = tokenRegex.exec(remaining)) !== null) {
          // Push text before match
          if (match.index > lastIndex) {
            parts.push(remaining.substring(lastIndex, match.index));
          }

          const matchedStr = match[0];

          if (matchedStr.startsWith("**") && matchedStr.endsWith("**")) {
            const inner = matchedStr.slice(2, -2);
            parts.push(
              <strong key={keyCounter++} className="font-semibold text-[#1591DC] dark:text-[#C4E2F5]">
                {inner}
              </strong>
            );
          } else if (matchedStr.startsWith("[") && matchedStr.includes("](")) {
            const label = matchedStr.substring(1, matchedStr.indexOf("]("));
            const url = matchedStr.substring(matchedStr.indexOf("](") + 2, matchedStr.length - 1);
            parts.push(
              <a
                key={keyCounter++}
                href={url}
                target={url.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="underline underline-offset-2 font-medium text-[#1591DC] hover:text-[#2C5EAD] dark:text-[#C4E2F5] dark:hover:text-white transition-colors"
              >
                {label}
              </a>
            );
          }

          lastIndex = tokenRegex.lastIndex;
        }

        if (lastIndex < remaining.length) {
          parts.push(remaining.substring(lastIndex));
        }

        // Bullet point check
        if (line.trim().startsWith("•") || line.trim().startsWith("-")) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1">
              <span className="text-[#1591DC] text-xs mt-1">●</span>
              <div className="flex-1">{parts.length > 0 ? parts : line.replace(/^[•-]\s*/, "")}</div>
            </div>
          );
        }

        return <div key={idx}>{parts.length > 0 ? parts : line}</div>;
      })}
    </div>
  );
};

const INITIAL_MESSAGES = [
  {
    id: "welcome-1",
    sender: "bot",
    text: "Hello! 👋 Welcome to the **ACM-W Student Chapter** at GCOERC, Nashik.\n\nI am your interactive AI assistant. Ask me anything about our chapter, events, team, or how to join!",
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  },
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasUnread, setHasUnread] = useState(true);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
      // Focus input on open
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen, messages, isLoading]);

  // Send a message
  const handleSendMessage = async (textToSend) => {
    const text = (typeof textToSend === "string" ? textToSend : inputValue).trim();
    if (!text || isLoading) return;

    const userMessage = {
      id: "user-" + Date.now(),
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setError(null);
    setIsLoading(true);

    try {
      // Backend API Integration Check:
      // If a backend URL is configured via environment variables, call it.
      // (No API keys are hardcoded in the frontend)
      const backendUrl = import.meta.env.VITE_CHATBOT_API_URL;

      let replyText = "";

      if (backendUrl) {
        const response = await fetch(backendUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: text,
            history: messages.slice(-6).map((m) => ({
              role: m.sender === "user" ? "user" : "assistant",
              content: m.text,
            })),
          }),
        });

        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}`);
        }

        const data = await response.json();
        replyText = data.reply || data.response || data.message;
      } else {
        // Safe, verified local knowledge engine (instant & authentic ACM-W facts)
        await new Promise((resolve) => setTimeout(resolve, 450));
        replyText = getVerifiedAnswer(text);
      }

      const botMessage = {
        id: "bot-" + Date.now(),
        sender: "bot",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Chatbot processing error:", err);
      // Fallback seamlessly to verified local knowledge if remote endpoint failed
      const fallbackText = getVerifiedAnswer(text);
      setMessages((prev) => [
        ...prev,
        {
          id: "bot-" + Date.now(),
          sender: "bot",
          text: fallbackText,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      setError("Note: Operating in verified offline mode.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleReset = () => {
    setMessages(INITIAL_MESSAGES);
    setError(null);
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 select-none">
      {/* ── Chat Window Modal ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="absolute bottom-16 sm:bottom-20 right-0 w-[92vw] sm:w-[390px] md:w-[420px] max-w-[440px] h-[540px] max-h-[82vh] bg-white/95 dark:bg-[#071126]/95 backdrop-blur-xl border border-slate-200/90 dark:border-[#2C5EAD]/40 shadow-2xl rounded-2xl flex flex-col overflow-hidden text-slate-800 dark:text-white transition-colors duration-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#050b18] via-[#0f1f38] to-[#2C5EAD] p-4 text-white flex items-center justify-between border-b border-white/10 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#1591DC] to-[#2C5EAD] p-0.5 flex items-center justify-center shadow-md">
                    <span className="text-white font-black text-xs tracking-wider">ACM</span>
                  </div>
                  {/* Status dot */}
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#050b18] rounded-full animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-[15px] leading-tight flex items-center gap-1.5">
                    ACM-W AI Assistant
                    <span className="text-[10px] bg-[#1591DC]/30 text-[#C4E2F5] font-semibold px-1.5 py-0.5 rounded">
                      GCOERC
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-300 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Online • Verified chapter answers
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleReset}
                  title="Clear conversation"
                  className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scroll-smooth custom-scrollbar">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl shadow-sm ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-[#1591DC] to-[#2C5EAD] text-white rounded-tr-xs"
                        : "bg-slate-100 dark:bg-[#0f1f38] text-slate-800 dark:text-slate-100 border border-slate-200/60 dark:border-[#2C5EAD]/30 rounded-tl-xs"
                    }`}
                  >
                    <FormattedMessage text={msg.text} />
                  </div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {/* Typing / Loading Indicator */}
              {isLoading && (
                <div className="flex items-start gap-2">
                  <div className="bg-slate-100 dark:bg-[#0f1f38] border border-slate-200/60 dark:border-[#2C5EAD]/30 p-3 rounded-2xl rounded-tl-xs flex items-center gap-1.5 shadow-sm">
                    <span className="text-xs text-slate-500 dark:text-slate-400 mr-1">ACM-W AI is typing</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1591DC] animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1591DC] animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1591DC] animate-bounce" />
                  </div>
                </div>
              )}

              {/* Error Notice */}
              {error && (
                <div className="text-[11px] text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 p-2 rounded-lg text-center">
                  {error}
                </div>
              )}

              {/* Suggested Questions Section */}
              {messages.length <= 3 && (
                <div className="pt-2">
                  <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-2">
                    💡 Suggested Questions:
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {SUGGESTED_QUESTIONS.map((question) => (
                      <button
                        key={question}
                        type="button"
                        onClick={() => handleSendMessage(question)}
                        disabled={isLoading}
                        className="text-left text-xs bg-slate-100/80 hover:bg-[#1591DC]/10 dark:bg-[#0f1f38]/60 dark:hover:bg-[#1591DC]/20 border border-slate-200 dark:border-[#2C5EAD]/30 text-slate-700 dark:text-slate-300 hover:text-[#1591DC] dark:hover:text-[#C4E2F5] px-3 py-2 rounded-xl transition-all duration-200 flex items-center justify-between group cursor-pointer"
                      >
                        <span>{question}</span>
                        <svg
                          className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#1591DC] group-hover:translate-x-0.5 transition-all"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <div className="p-3 bg-slate-50/80 dark:bg-[#050b18]/80 border-t border-slate-200 dark:border-[#2C5EAD]/20">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask ACM-W AI a question..."
                  disabled={isLoading}
                  className="flex-1 bg-white dark:bg-[#0f1f38] text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-[#2C5EAD]/40 outline-none focus:ring-2 focus:ring-[#1591DC] transition-all disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  aria-label="Send Message"
                  className="bg-gradient-to-r from-[#1591DC] to-[#2C5EAD] hover:from-[#2C5EAD] hover:to-[#1591DC] disabled:opacity-40 text-white p-2.5 rounded-xl shadow-md transition-all duration-200 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center shrink-0"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    />
                  </svg>
                </button>
              </form>
              <div className="text-[10px] text-center text-slate-400 dark:text-slate-500 mt-2">
                ACM-W Student Chapter • GCOERC Nashik
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Launcher Button ── */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open ACM-W AI Chat"
        className="relative group bg-gradient-to-r from-[#1591DC] via-[#2C5EAD] to-[#1591DC] bg-[length:200%_auto] hover:bg-right text-white p-3.5 sm:p-4 rounded-full shadow-xl shadow-[#1591DC]/30 border border-white/20 transition-all duration-300 cursor-pointer flex items-center justify-center"
      >
        {/* Unread indicator badge */}
        {hasUnread && !isOpen && (
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white dark:border-[#050b18]" />
          </span>
        )}

        {isOpen ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
              />
            </svg>
            <span className="hidden sm:inline font-semibold text-xs tracking-wide pr-1">
              Chat with AI
            </span>
          </div>
        )}
      </motion.button>
    </div>
  );
};

export default Chatbot;
