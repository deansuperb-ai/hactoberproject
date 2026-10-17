import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Send,
  Mic,
  Play,
  Pause,
  HelpCircle,
  Flame,
  User,
  ChevronDown,
} from "lucide-react";
import type {
  PersonProfile,
  ConversationMessage,
  Memory,
} from "../types";
import {
  sendMessage,
  listMemories,
  listProfiles,
} from "../services/stillHereApi";
import {
  generateNarrationSpeech,
  getElevenLabsStatus,
  type ElevenLabsStatus,
} from "../services/elevenlabsApi";

interface FeelTheExistenceViewProps {
  activeProfile: PersonProfile;
  onSwitchProfile: (profile: PersonProfile) => void;
  onOpenMemoryDetail: (memory: Memory) => void;
}

const SUGGESTED_QUESTIONS = [
  "Show me a favorite memory.",
  "What do my saved stories say about this day?",
  "Find a recording from this memory.",
  "Help me revisit a moment I saved.",
];

export const FeelTheExistenceView: React.FC<FeelTheExistenceViewProps> = ({
  activeProfile,
  onSwitchProfile,
  onOpenMemoryDetail,
}) => {
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [availableMemories, setAvailableMemories] = useState<Memory[]>([]);
  const [allProfiles, setAllProfiles] = useState<PersonProfile[]>([]);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [elevenLabsReady, setElevenLabsReady] = useState(false);

  // Audio player state
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Load memories and profiles
  useEffect(() => {
    listMemories(activeProfile.id).then(setAvailableMemories);
    listProfiles().then(setAllProfiles);
    getElevenLabsStatus().then((status: ElevenLabsStatus) => setElevenLabsReady(status.configured));

    // Reset conversation for new profile
    setMessages([
      {
        id: `welcome-${activeProfile.id}`,
        role: "assistant",
        text: `Welcome to Feel the Existence for ${activeProfile.name}. I am here to help you gently revisit the memories, letters, and voice recordings you have preserved. Ask me about a favorite day, a saved story, or a cherished moment.`,
        createdAt: new Date().toISOString(),
        responseType: "reflection",
      },
    ]);
  }, [activeProfile.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    setInputText("");
    const userMsg: ConversationMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await sendMessage({
        message: text,
        profileId: activeProfile.id,
      });

      let narrationUrl: string | undefined = undefined;
      // Synthesize audio narration if ElevenLabs is ready
      if (elevenLabsReady && response.reflection) {
        try {
          const res = await generateNarrationSpeech(
            response.reflection.slice(0, 300),
            activeProfile.voiceId
          );
          narrationUrl = res.audioUrl;
        } catch (narrateErr) {
          console.warn("Could not generate live narration speech:", narrateErr);
        }
      }

      const assistantMsg: ConversationMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        text: response.reflection,
        createdAt: new Date().toISOString(),
        responseType: "reflection",
        sources: response.sources,
        audioUrl: narrationUrl || response.audioUrl,
        audioKind: narrationUrl ? "generated_narration" : response.audioUrl ? "original" : undefined,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error("Conversation error:", err);
      const errorMsg: ConversationMessage = {
        id: `error-${Date.now()}`,
        role: "assistant",
        text: "I was unable to search your saved archive at this moment. Your original memories remain safe.",
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayAudio = (id: string, url: string) => {
    if (playingAudioId === id) {
      audioRef.current?.pause();
      setPlayingAudioId(null);
      return;
    }

    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.play().then(() => {
        setPlayingAudioId(id);
      }).catch((err) => {
        console.warn("Audio play failed:", err);
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        onEnded={() => setPlayingAudioId(null)}
      />

      {/* Header with Active Profile & Switcher */}
      <header className="p-5 rounded-3xl bg-white border border-parchment-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 rounded-full overflow-hidden shadow-xs ring-2 ring-terracotta/30 bg-parchment-200 shrink-0">
            {activeProfile.portraitUrl ? (
              <img
                src={activeProfile.portraitUrl}
                alt={activeProfile.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-espresso-400">
                <User className="w-6 h-6" />
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-terracotta font-medium flex items-center gap-1">
                <Flame className="w-3.5 h-3.5" /> Feel the Existence
              </span>
              {activeProfile.isDemo && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-parchment-200 text-espresso-700">
                  Demo Experience
                </span>
              )}
            </div>
            <h1 className="font-serif text-2xl text-espresso-900 font-medium">
              {activeProfile.name}
            </h1>
            <p className="text-xs text-espresso-600 line-clamp-1">
              {activeProfile.caption || activeProfile.description || "Reflections grounded in your preserved moments"}
            </p>
          </div>
        </div>

        {/* Profile Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            className="w-full sm:w-auto inline-flex items-center justify-between gap-2 px-3.5 py-2 rounded-xl bg-parchment-100 hover:bg-parchment-200 text-xs font-medium text-espresso-800 transition-all border border-parchment-300"
          >
            <span>Switch Profile</span>
            <ChevronDown className="w-3.5 h-3.5 text-espresso-500" />
          </button>

          {isProfileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-parchment-200 shadow-xl py-2 z-20 animate-fade-in">
              <span className="px-3 py-1 text-[10px] uppercase font-mono tracking-wider text-espresso-400 block">
                Saved Memory Profiles
              </span>
              {allProfiles.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    onSwitchProfile(p);
                    setIsProfileDropdownOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-left text-xs flex items-center gap-2 hover:bg-parchment-100 transition-all ${
                    p.id === activeProfile.id ? "font-semibold text-terracotta bg-parchment-50" : "text-espresso-800"
                  }`}
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-parchment-200 shrink-0">
                    {p.portraitUrl ? (
                      <img src={p.portraitUrl} alt={p.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-3.5 h-3.5 text-espresso-400 m-auto mt-1" />
                    )}
                  </div>
                  <span className="truncate">{p.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Main Conversation Container */}
      <div className="rounded-3xl bg-parchment-50 border border-parchment-200 overflow-hidden shadow-xs flex flex-col h-[560px]">
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar">
          {messages.map((msg) => {
            const isUser = msg.role === "user";
            const isAudioPlaying = playingAudioId === msg.id;

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? "items-end" : "items-start"} space-y-2 max-w-2xl ${
                  isUser ? "ml-auto" : "mr-auto"
                }`}
              >
                {/* Message Header Label */}
                <div className="flex items-center gap-2 px-1 text-[11px] text-espresso-500">
                  <span>{isUser ? "You" : activeProfile.name}</span>
                  <span>•</span>
                  <span>{new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                  {!isUser && msg.responseType === "reflection" && (
                    <span className="px-2 py-0.2 rounded-full text-[10px] font-mono bg-terracotta-light/30 text-terracotta-dark">
                      AI Reflection
                    </span>
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`p-4 sm:p-5 rounded-2xl text-sm leading-relaxed ${
                    isUser
                      ? "bg-terracotta text-white rounded-tr-xs shadow-xs"
                      : "bg-white text-espresso-900 border border-parchment-200 rounded-tl-xs shadow-xs font-serif"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>

                {/* Audio Narration / Authentic Audio Player */}
                {!isUser && msg.audioUrl && (
                  <div className="p-3 rounded-2xl bg-white border border-parchment-200 shadow-xs flex items-center justify-between gap-3 w-full max-w-md">
                    <div className="flex items-center gap-2">
                      <Mic className="w-4 h-4 text-terracotta" />
                      <div>
                        <p className="text-xs font-medium text-espresso-900">
                          {msg.audioKind === "original" ? "Play original recording" : "Listen to AI narration"}
                        </p>
                        <p className="text-[10px] text-espresso-500">
                          {msg.audioKind === "original" ? "Authentic voice from archive" : "Authorized ElevenLabs voice"}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handlePlayAudio(msg.id, msg.audioUrl!)}
                      className={`p-2 rounded-full text-xs transition-all ${
                        isAudioPlaying
                          ? "bg-terracotta text-white shadow-xs"
                          : "bg-parchment-200 hover:bg-parchment-300 text-espresso-800"
                      }`}
                    >
                      {isAudioPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    </button>
                  </div>
                )}

                {/* Supporting Source Memory Cards */}
                {!isUser && msg.sources && msg.sources.length > 0 && (
                  <div className="p-3 rounded-2xl bg-parchment-100/80 border border-parchment-200 space-y-1.5 w-full">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-espresso-500 font-semibold block">
                      Supporting Archive Memories:
                    </span>
                    <div className="space-y-1">
                      {msg.sources.map((src) => {
                        const memoryObj = availableMemories.find((m) => m.id === src.memoryId);
                        return (
                          <div
                            key={src.memoryId}
                            onClick={() => memoryObj && onOpenMemoryDetail(memoryObj)}
                            className="flex items-center justify-between p-2 rounded-xl bg-white border border-parchment-200 text-xs text-espresso-800 hover:border-terracotta cursor-pointer transition-all"
                          >
                            <span className="font-serif italic font-medium">{src.memoryTitle}</span>
                            <span className="text-[10px] font-mono text-terracotta underline">View Memory</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Gentle Disclosure */}
                {!isUser && (
                  <p className="text-[10px] text-espresso-400 italic px-1">
                    An AI-generated reflection based strictly on the memories you saved.
                  </p>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-parchment-200 max-w-sm animate-pulse text-xs text-espresso-600">
              <Sparkles className="w-4 h-4 text-terracotta animate-spin" />
              <span>Gently reflecting through saved memories...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        <div className="p-3 bg-white border-t border-parchment-200 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <HelpCircle className="w-4 h-4 text-terracotta shrink-0 hidden sm:inline" />
          {SUGGESTED_QUESTIONS.map((q) => (
            <button
              key={q}
              onClick={() => handleSendMessage(q)}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-parchment-100 hover:bg-parchment-200 text-espresso-700 whitespace-nowrap transition-all border border-parchment-300 disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-parchment-200 flex items-center gap-2">
          <input
            type="text"
            placeholder={`Ask a question about ${activeProfile.name}'s memories...`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 rounded-full bg-parchment-100 text-sm text-espresso-900 border border-parchment-300 focus:outline-none focus:ring-2 focus:ring-terracotta/40"
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={isLoading || !inputText.trim()}
            aria-label="Send message"
            className="p-2.5 rounded-full bg-terracotta hover:bg-terracotta-dark text-white shadow-xs transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
