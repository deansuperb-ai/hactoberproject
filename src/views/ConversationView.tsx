import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Mic,
  MicOff,
  Sparkles,
  MessageSquare,
  Plus,
  AlertCircle,
  Trash2,
} from "lucide-react";
import type {
  ConversationMessage,
  ConversationSession,
  Memory,
  ChatRequest,
} from "../types";
import { sendMessage } from "../services/stillHereApi";
import { MessageBubble } from "../components/conversation/MessageBubble";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";

interface ConversationViewProps {
  memories: Memory[];
  onSelectMemory: (memory: Memory) => void;
  // Audio playback controls
  currentAudioUrl: string | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playbackRate: number;
  volume: number;
  isMuted: boolean;
  onTogglePlay: (url: string, title: string, kind?: "original" | "generated_narration") => void;
  onSeek: (seconds: number) => void;
  onChangeSpeed: (rate: number) => void;
  onSetVolume: (vol: number) => void;
  onToggleMute: () => void;
}

const SUGGESTED_PROMPTS = [
  "What did Arthur say about our quiet mornings on the cabin porch?",
  "Tell me about Nora's recipe for apple pie and her advice on baking.",
  "Which pieces did Mom play on the upright piano in the autumn afternoon?",
  "What does my archive say about walking along the lake?",
];

export const ConversationView: React.FC<ConversationViewProps> = ({
  memories,
  onSelectMemory,
  currentAudioUrl,
  isPlaying,
  currentTime,
  duration,
  playbackRate,
  volume,
  isMuted,
  onTogglePlay,
  onSeek,
  onChangeSpeed,
  onSetVolume,
  onToggleMute,
}) => {
  const [sessions, setSessions] = useState<ConversationSession[]>(() => {
    try {
      const saved = localStorage.getItem("still_here_conversations_v1");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Could not load conversations:", e);
    }
    return [
      {
        id: "convo-initial",
        title: "Mornings at the Cabin",
        updatedAt: new Date().toISOString(),
        messages: [
          {
            id: "msg-user-sample",
            role: "user",
            text: "What did Arthur say about our mornings together on the porch?",
            createdAt: new Date(Date.now() - 3600000).toISOString(),
          },
          {
            id: "msg-asst-sample",
            role: "assistant",
            text: "In your archive from June 14, 1988, Arthur's original voice recording speaks of that exact silence:\n\n\"Listen to those thrushes out there. You won't hear that kind of quiet in the city. Two mugs, cold morning air, warm hands—let's remember this morning.\"\n\nHe noticed how the mist lingered in the Douglas firs before anyone else woke up, holding onto the simple warmth of the ceramic mug in his hands.",
            createdAt: new Date(Date.now() - 3590000).toISOString(),
            responseType: "exact_quote",
            sources: [
              {
                memoryId: "mem-cabin-porch-1988",
                memoryTitle: "Sunrise on the Cedar Porch",
                excerpt: "Two mugs, cold morning air, warm hands—let's remember this morning.",
                sourceType: "recording",
              },
            ],
            audioUrl: "/audio/cabin_porch_morning.wav",
            audioKind: "original",
          },
        ],
      },
    ];
  });

  const [activeSessionId, setActiveSessionId] = useState<string>(
    sessions[0]?.id || "convo-initial"
  );
  const [inputText, setInputText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Honest Speech Recognition Hook
  const { isSupported: isSpeechSupported, isListening, toggleListening } =
    useSpeechRecognition((transcriptText: string) => {
      setInputText((prev) => (prev ? `${prev} ${transcriptText}` : transcriptText));
    });

  // Save sessions to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("still_here_conversations_v1", JSON.stringify(sessions));
    } catch (e) {
      console.warn("Could not save conversations:", e);
    }
  }, [sessions]);

  const activeSession =
    sessions.find((s) => s.id === activeSessionId) || sessions[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeSession?.messages, isSubmitting]);

  const handleStartNewConversation = () => {
    const newSession: ConversationSession = {
      id: `convo-${Date.now()}`,
      title: "New Reflection",
      updatedAt: new Date().toISOString(),
      messages: [],
    };
    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
    setInputText("");
    setApiError(null);
  };

  const handleDeleteSession = (idToDelete: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (sessions.length <= 1) {
      // Just clear messages
      setSessions([
        {
          id: `convo-${Date.now()}`,
          title: "New Reflection",
          updatedAt: new Date().toISOString(),
          messages: [],
        },
      ]);
      return;
    }

    const remaining = sessions.filter((s) => s.id !== idToDelete);
    setSessions(remaining);
    if (activeSessionId === idToDelete) {
      setActiveSessionId(remaining[0].id);
    }
  };

  const handleSendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isSubmitting) return;

    setApiError(null);
    const userMsgId = `msg-user-${Date.now()}`;
    const userMessage: ConversationMessage = {
      id: userMsgId,
      role: "user",
      text: trimmed,
      createdAt: new Date().toISOString(),
    };

    // Append user message immediately
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === activeSessionId) {
          const isFirstMessage = s.messages.length === 0;
          return {
            ...s,
            title: isFirstMessage
              ? trimmed.slice(0, 36) + (trimmed.length > 36 ? "..." : "")
              : s.title,
            updatedAt: new Date().toISOString(),
            messages: [...s.messages, userMessage],
          };
        }
        return s;
      })
    );

    setInputText("");
    setIsSubmitting(true);

    try {
      const request: ChatRequest = {
        conversationId: activeSessionId,
        message: trimmed,
      };

      const response = await sendMessage(request);

      const assistantMessage: ConversationMessage = {
        id: `msg-asst-${Date.now()}`,
        role: "assistant",
        text: response.reflection,
        createdAt: new Date().toISOString(),
        responseType: response.exactQuote ? "exact_quote" : "reflection",
        sources: response.sources,
        audioUrl: response.audioUrl,
        audioKind: response.audioUrl?.includes("narration") ? "generated_narration" : "original",
      };

      setSessions((prev) =>
        prev.map((s) => {
          if (s.id === activeSessionId) {
            return {
              ...s,
              updatedAt: new Date().toISOString(),
              messages: [...s.messages, assistantMessage],
            };
          }
          return s;
        })
      );
    } catch (err: unknown) {
      console.error("Conversation service error:", err);
      // Strictly honest: Do not create fake AI responses when the API fails
      setApiError(
        "The reflection service is currently unable to answer. Please check your network connection or backend configuration."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-4 sm:py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* View Header */}
      <div className="pb-6 border-b border-parchment-300 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-espresso-500 mb-1.5 block">
            Memory Space Reflection
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-espresso-950 tracking-tight">
            Conversations with Your Archive
          </h1>
          <p className="text-sm text-espresso-600 mt-1 max-w-2xl font-sans">
            Ask questions about your preserved memories. Responses are strictly grounded in your authentic audio notes, letters, and photo stories.
          </p>
        </div>

        <button
          type="button"
          onClick={handleStartNewConversation}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white hover:bg-parchment-100 text-espresso-800 border border-parchment-300 text-sm font-medium shadow-warm-xs transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4 text-terracotta" />
          <span>New Conversation</span>
        </button>
      </div>

      {/* Main Grid: Sidebar History & Active Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar: Saved Conversations */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-3xl bg-[#FAF7F2] border border-[#E6DDD2] shadow-warm-xs">
            <h2 className="font-serif text-lg font-medium text-espresso-900 mb-3 px-1">
              Revisit Saved Reflections
            </h2>

            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
              {sessions.map((session) => {
                const isActive = session.id === activeSessionId;
                const messageCount = session.messages.length;

                return (
                  <div
                    key={session.id}
                    onClick={() => {
                      setActiveSessionId(session.id);
                      setApiError(null);
                    }}
                    className={`w-full p-3.5 rounded-2xl text-left transition-all flex items-center justify-between gap-3 group cursor-pointer ${
                      isActive
                        ? "bg-espresso-900 text-parchment-50 shadow-warm-xs"
                        : "bg-white text-espresso-800 hover:bg-parchment-100 border border-parchment-200"
                    }`}
                  >
                    <div className="truncate flex-1">
                      <span className="font-serif text-sm font-medium block truncate">
                        {session.title}
                      </span>
                      <span
                        className={`text-[11px] font-mono block mt-0.5 ${
                          isActive ? "text-parchment-300" : "text-espresso-400"
                        }`}
                      >
                        {messageCount} moment{messageCount === 1 ? "" : "s"}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleDeleteSession(session.id, e)}
                      aria-label="Delete conversation"
                      className={`p-1.5 rounded-lg opacity-60 hover:opacity-100 transition-opacity ${
                        isActive
                          ? "hover:bg-espresso-800 text-parchment-200"
                          : "hover:bg-parchment-200 text-espresso-400 hover:text-terracotta"
                      }`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Disclosure Card */}
          <div className="p-5 rounded-3xl bg-brass/10 border border-brass/25 text-xs text-espresso-700 space-y-2">
            <div className="flex items-center gap-2 font-mono font-bold uppercase tracking-wider text-brass-dark">
              <Sparkles className="w-4 h-4" />
              <span>Ethical AI Disclosure</span>
            </div>
            <p className="leading-relaxed">
              Reflections are generated to help you revisit preserved memories. They do not invent facts outside your archive and clearly label authentic recordings.
            </p>
          </div>
        </div>

        {/* Right Area: Conversation Stream & Input */}
        <div className="lg:col-span-8 flex flex-col h-[700px] rounded-3xl bg-white border border-[#E6DDD2] shadow-warm-sm overflow-hidden">
          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-gradient-to-b from-[#FAF8F4]/50 to-white">
            {activeSession?.messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-6 max-w-lg mx-auto">
                <div className="w-14 h-14 rounded-2xl bg-terracotta-light text-terracotta flex items-center justify-center shadow-warm-xs">
                  <MessageSquare className="w-7 h-7" />
                </div>

                <div>
                  <h3 className="font-serif text-2xl font-medium text-espresso-900 mb-2">
                    Start a gentle reflection
                  </h3>
                  <p className="text-sm text-espresso-600 leading-relaxed font-sans">
                    Ask a question about your loved ones, specific years, recipes, or audio notes. Here are thoughtful ideas to explore:
                  </p>
                </div>

                <div className="w-full space-y-2">
                  {SUGGESTED_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSendMessage(prompt)}
                      className="w-full text-left p-3 rounded-2xl bg-[#FAF7F2] hover:bg-parchment-200 border border-parchment-300 text-xs sm:text-sm text-espresso-800 transition-colors cursor-pointer"
                    >
                      "{prompt}"
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {activeSession.messages.map((message: ConversationMessage) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    onSelectMemory={(id: string) => {
                      const matched = memories.find((m) => m.id === id);
                      if (matched) onSelectMemory(matched);
                    }}
                    currentAudioUrl={currentAudioUrl}
                    isPlaying={isPlaying}
                    currentTime={currentTime}
                    duration={duration}
                    playbackRate={playbackRate}
                    volume={volume}
                    isMuted={isMuted}
                    onTogglePlay={onTogglePlay}
                    onSeek={onSeek}
                    onChangeSpeed={onChangeSpeed}
                    onSetVolume={onSetVolume}
                    onToggleMute={onToggleMute}
                  />
                ))}

                {/* Submitting / Reflection Loading State */}
                {isSubmitting && (
                  <div className="flex justify-start mb-6">
                    <div className="p-5 rounded-3xl bg-[#FAF7F2] border border-[#E6DDD2] shadow-warm-xs flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-terracotta/40 border-t-terracotta rounded-full animate-spin" />
                      <span className="font-serif italic text-sm text-espresso-700">
                        Reflecting on your saved memories and recordings...
                      </span>
                    </div>
                  </div>
                )}

                {/* Error Banner */}
                {apiError && (
                  <div
                    role="alert"
                    className="p-4 rounded-2xl bg-terracotta-light text-terracotta-dark border border-terracotta-border text-sm flex items-center gap-2.5"
                  >
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{apiError}</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input Box Footer */}
          <div className="p-4 sm:p-5 border-t border-parchment-300 bg-[#FAF7F2]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="flex items-center gap-2"
            >
              {/* Honest Microphone Speech Button (Only visible if supported!) */}
              {isSpeechSupported && (
                <button
                  type="button"
                  onClick={toggleListening}
                  aria-label={isListening ? "Stop listening" : "Speak your message"}
                  className={`p-3 rounded-2xl transition-all cursor-pointer ${
                    isListening
                      ? "bg-terracotta text-white animate-pulse"
                      : "bg-white text-espresso-600 hover:text-espresso-950 border border-parchment-300 hover:bg-parchment-100"
                  }`}
                  title={isListening ? "Listening... click to stop" : "Speak question"}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
              )}

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  isListening
                    ? "Listening to your voice..."
                    : "Ask about a memory, quotation, or recording..."
                }
                disabled={isSubmitting}
                aria-label="Ask a question about your archive"
                className="flex-1 px-4 py-3 rounded-2xl border border-parchment-300 bg-white text-espresso-900 placeholder:text-espresso-400 focus:bg-white text-sm transition-colors shadow-warm-xs"
              />

              <button
                type="submit"
                disabled={!inputText.trim() || isSubmitting}
                aria-label="Send reflection prompt"
                className="p-3 rounded-2xl bg-espresso-900 hover:bg-espresso-950 text-parchment-50 disabled:opacity-40 transition-all transform active:scale-95 shadow-warm-xs cursor-pointer"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>

            <div className="flex items-center justify-between text-[11px] font-mono text-espresso-500 mt-2 px-1">
              <span>Grounding mode: Authentic Archive References</span>
              <span>Press Enter to send</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
