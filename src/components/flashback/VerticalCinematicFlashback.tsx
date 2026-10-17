import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  ChevronDown,
  Sparkles,
  Mic,
  Calendar,
  Clock,
  ArrowUp,
  BookmarkCheck,
  ShieldCheck,
  Info,
} from "lucide-react";
import type { FlashbackExperience, VisualSourceKind } from "../../types";

interface VerticalCinematicFlashbackProps {
  flashback: FlashbackExperience | null;
  isOpen: boolean;
  onClose: () => void;
  onSave?: (flashback: FlashbackExperience) => void;
}

export const VerticalCinematicFlashback: React.FC<VerticalCinematicFlashbackProps> = ({
  flashback,
  isOpen,
  onClose,
  onSave,
}) => {
  if (!flashback || !isOpen) return null;

  const [activeShotIndex, setActiveShotIndex] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [currentPlayingUrl, setCurrentPlayingUrl] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const shotsContainerRef = useRef<HTMLDivElement | null>(null);
  const shotRefs = useRef<(HTMLElement | null)[]>([]);

  // Stop audio on close or unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        scrollToShot(Math.min(activeShotIndex + 1, flashback.shots.length - 1));
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        scrollToShot(Math.max(activeShotIndex - 1, 0));
      } else if (e.key === " ") {
        e.preventDefault();
        toggleActiveAudio();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeShotIndex, flashback.shots.length]);

  const scrollToShot = (index: number) => {
    if (shotRefs.current[index]) {
      shotRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
      setActiveShotIndex(index);
    }
  };

  const handlePlayAudio = (url: string) => {
    if (currentPlayingUrl === url && isPlayingAudio) {
      audioRef.current?.pause();
      setIsPlayingAudio(false);
      return;
    }

    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.muted = isMuted;
      audioRef.current.play().then(() => {
        setIsPlayingAudio(true);
        setCurrentPlayingUrl(url);
      }).catch((err) => {
        console.warn("Audio playback interrupted:", err);
      });
    }
  };

  const toggleActiveAudio = () => {
    const activeShot = flashback.shots[activeShotIndex];
    const url = activeShot?.audioUrl || activeShot?.narrationAudioUrl;
    if (url) {
      handlePlayAudio(url);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave(flashback);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  const renderVisualBadge = (kind: VisualSourceKind) => {
    switch (kind) {
      case "original":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-olive-light/90 text-olive-dark backdrop-blur-sm shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-olive" /> Original photograph
          </span>
        );
      case "ai_recreation":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-terracotta-light/90 text-terracotta-dark backdrop-blur-sm shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-terracotta" /> AI-generated recreation
          </span>
        );
      case "demo_image":
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-parchment-200/90 text-espresso-700 backdrop-blur-sm shadow-xs">
            <Info className="w-3.5 h-3.5 text-espresso-500" /> Illustrative demo image
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1A1614] text-parchment-100 flex flex-col overflow-hidden animate-fade-in">
      {/* Hidden Audio Player Element */}
      <audio
        ref={audioRef}
        onEnded={() => {
          setIsPlayingAudio(false);
          setCurrentPlayingUrl(null);
        }}
      />

      {/* Top Floating Control Bar */}
      <header className="absolute top-0 left-0 right-0 z-30 px-6 py-4 flex items-center justify-between bg-gradient-to-b from-[#1A1614]/90 via-[#1A1614]/50 to-transparent pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <button
            onClick={onClose}
            aria-label="Return to memories"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-espresso-900/80 hover:bg-espresso-800 text-xs text-parchment-200 border border-parchment-700/40 backdrop-blur-md transition-all"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Return to Memories</span>
          </button>

          {flashback.isDemo && (
            <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-terracotta/20 border border-terracotta/40 text-terracotta-light font-medium">
              Demo Experience
            </span>
          )}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            className="p-2 rounded-full bg-espresso-900/80 hover:bg-espresso-800 text-parchment-200 border border-parchment-700/40 backdrop-blur-md transition-all"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-terracotta" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-terracotta/90 hover:bg-terracotta text-white text-xs font-medium shadow-md transition-all"
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>{savedSuccess ? "Saved to Profile" : "Save Flashback"}</span>
          </button>
        </div>
      </header>

      {/* Main Vertically Scrollable Container */}
      <main
        ref={shotsContainerRef}
        className="flex-1 overflow-y-auto scroll-smooth custom-scrollbar relative"
      >
        {/* ======================================================== */}
        {/* OPENING HERO SCREEN                                      */}
        {/* ======================================================== */}
        <section className="min-h-screen relative flex items-center justify-center px-6 py-24">
          {/* Subtle Ambient Background Backdrop */}
          {flashback.coverImageUrl && (
            <div
              className="absolute inset-0 bg-cover bg-center opacity-25 filter blur-2xl scale-105"
              style={{ backgroundImage: `url(${flashback.coverImageUrl})` }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1614]/60 via-[#1A1614]/80 to-[#1A1614]" />

          {/* Hero Content */}
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
            <span className="text-xs uppercase tracking-[0.25em] text-parchment-400 font-mono block">
              {flashback.openingHeading || "A memory to revisit"}
            </span>

            {/* Main Opening Photograph */}
            {flashback.coverImageUrl && (
              <div className="relative max-w-lg mx-auto aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border border-parchment-700/40 group">
                <img
                  src={flashback.coverImageUrl}
                  alt={flashback.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-left">
                  <span className="text-xs text-parchment-200 font-serif italic">
                    {flashback.title}
                  </span>
                  {renderVisualBadge(flashback.shots[0]?.visualKind || "demo_image")}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <h1 className="font-serif text-3xl sm:text-5xl text-parchment-50 font-normal tracking-tight leading-tight">
                {flashback.title}
              </h1>

              {flashback.openingCaption && (
                <p className="text-sm sm:text-base text-parchment-300 max-w-xl mx-auto font-serif italic leading-relaxed">
                  "{flashback.openingCaption}"
                </p>
              )}
            </div>

            {/* Begin Flashback Trigger Button */}
            <div className="pt-4 flex flex-col items-center gap-3">
              <button
                onClick={() => scrollToShot(0)}
                className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-parchment-100 text-espresso-950 font-medium text-sm hover:bg-white shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Begin Flashback</span>
                <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-1 text-terracotta" />
              </button>
              <p className="text-xs text-parchment-400">
                Scroll down gently to experience each memory shot
              </p>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* VERTICALLY SCROLLING MEMORY SHOTS SEQUENCE               */}
        {/* ======================================================== */}
        <div className="max-w-5xl mx-auto px-6 py-12 space-y-32">
          {flashback.shots.map((shot, idx) => {
            const isEven = idx % 2 === 0;
            const isCurrentAudioPlaying =
              isPlayingAudio &&
              (currentPlayingUrl === shot.audioUrl || currentPlayingUrl === shot.narrationAudioUrl);

            return (
              <section
                key={shot.id}
                ref={(el) => {
                  shotRefs.current[idx] = el;
                }}
                className={`relative flex flex-col ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                } items-center gap-8 md:gap-14 py-8 border-t border-parchment-800/40`}
              >
                {/* Timeline Indicator Pill */}
                <div className="absolute -top-4 left-0 md:left-1/2 md:-translate-x-1/2 px-3 py-1 rounded-full bg-espresso-900 border border-parchment-700/40 text-[11px] font-mono text-parchment-300 flex items-center gap-1.5 shadow-md z-10">
                  <Clock className="w-3 h-3 text-terracotta" />
                  <span>Shot {shot.shotNumber} of {flashback.shots.length}</span>
                </div>

                {/* Left/Right: Large Photograph / Media Preview */}
                <div className="w-full md:w-1/2 flex justify-center">
                  <div className="relative w-full max-w-md aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border border-parchment-700/40 bg-espresso-900/60 group">
                    {shot.imageUrl ? (
                      <img
                        src={shot.imageUrl}
                        alt={shot.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-espresso-800/80 p-8 text-center text-parchment-400 font-serif italic">
                        "{shot.caption}"
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                    {/* Badge Overlay */}
                    <div className="absolute top-3 left-3">
                      {renderVisualBadge(shot.visualKind)}
                    </div>

                    {/* Timeline Date / Position */}
                    {shot.occurredAt && (
                      <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-xs text-[11px] font-mono text-parchment-300">
                        <Calendar className="w-3 h-3 text-terracotta-light" />
                        <span>{shot.occurredAt}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right/Left: Contextual Captions & Audio Player */}
                <div className="w-full md:w-1/2 space-y-5 text-left">
                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-widest text-terracotta-light font-mono block">
                      Scene {shot.shotNumber}
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-parchment-50 font-normal leading-snug">
                      {shot.title}
                    </h2>
                  </div>

                  {/* Concise Grounded Caption */}
                  <p className="text-sm sm:text-base text-parchment-200 leading-relaxed font-serif">
                    {shot.caption}
                  </p>

                  {/* Reflection Text (if generated or present) */}
                  {shot.reflectionText && (
                    <blockquote className="p-4 rounded-xl bg-espresso-900/70 border-l-2 border-terracotta text-xs text-parchment-300 italic font-serif leading-relaxed">
                      "{shot.reflectionText}"
                    </blockquote>
                  )}

                  {/* Original Recording or Narration Audio Player */}
                  {(shot.audioUrl || shot.narrationAudioUrl) && (
                    <div className="p-4 rounded-2xl bg-espresso-900/90 border border-parchment-700/50 space-y-2.5 shadow-lg">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <Mic className="w-4 h-4 text-terracotta" />
                          <span className="font-medium text-parchment-200">
                            {shot.audioUrl ? "Original recording" : "AI-generated narration"}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-parchment-400">
                          {shot.audioUrl ? "Authentic voice note" : "Authorized ElevenLabs narrator"}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handlePlayAudio((shot.audioUrl || shot.narrationAudioUrl)!)}
                          aria-label={isCurrentAudioPlaying ? "Pause audio" : "Play audio"}
                          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all ${
                            isCurrentAudioPlaying
                              ? "bg-terracotta text-white shadow-md animate-pulse"
                              : "bg-parchment-200 hover:bg-white text-espresso-950"
                          }`}
                        >
                          {isCurrentAudioPlaying ? (
                            <>
                              <Pause className="w-3.5 h-3.5" />
                              <span>Pause Recording</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>Play Recording</span>
                            </>
                          )}
                        </button>

                        <div className="flex-1 h-1.5 rounded-full bg-espresso-800 overflow-hidden relative">
                          <div
                            className={`h-full bg-terracotta transition-all duration-300 ${
                              isCurrentAudioPlaying ? "w-full animate-pulse" : "w-0"
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* GENTLE CLOSING SCREEN                                    */}
        {/* ======================================================== */}
        <section className="min-h-screen relative flex items-center justify-center px-6 py-24 text-center">
          <div className="max-w-xl mx-auto space-y-8 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-espresso-900 border border-parchment-700 text-terracotta flex items-center justify-center mx-auto shadow-xl">
              <BookmarkCheck className="w-8 h-8" />
            </div>

            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest text-parchment-400 font-mono block">
                Memory Flashback Complete
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-parchment-100 font-light leading-tight">
                {flashback.closingText || "Keep these moments close."}
              </h2>
              <p className="text-sm text-parchment-300 font-serif italic max-w-md mx-auto">
                These memories belong to you. Revisit them whenever you want to feel close.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => {
                  if (shotsContainerRef.current) {
                    shotsContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-espresso-900 hover:bg-espresso-800 border border-parchment-700 text-parchment-200 text-xs font-medium transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Replay Flashback</span>
              </button>

              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-parchment-100 hover:bg-white text-espresso-950 text-xs font-medium shadow-md transition-all"
              >
                <span>Return to Person's Memories</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Sticky Timeline Bar */}
      <footer className="px-6 py-3 bg-[#1A1614]/95 border-t border-parchment-800/60 backdrop-blur-md flex items-center justify-between text-xs text-parchment-300 z-20">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-parchment-400">Jump to Shot:</span>
          <div className="flex items-center gap-1.5">
            {flashback.shots.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToShot(i)}
                aria-label={`Jump to shot ${i + 1}`}
                className={`w-6 h-6 rounded-full text-[10px] font-mono flex items-center justify-center transition-all ${
                  activeShotIndex === i
                    ? "bg-terracotta text-white font-bold"
                    : "bg-espresso-800 hover:bg-espresso-700 text-parchment-400"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-[11px] text-parchment-400">
          <span>Keyboard: ↑/↓ to navigate, Space to play audio, Esc to exit</span>
          <button
            onClick={() => {
              if (shotsContainerRef.current) {
                shotsContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center gap-1 hover:text-parchment-200 transition-colors"
          >
            <ArrowUp className="w-3 h-3" /> Top
          </button>
        </div>
      </footer>
    </div>
  );
};
