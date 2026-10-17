import React from "react";
import {
  Flame,
  Plus,
  Play,
  ArrowRight,
  User,
  Film,
  Mic,
  Sparkles,
  Headphones,
  BookOpen,
} from "lucide-react";
import type {
  PersonProfile,
  Memory,
  FlashbackExperience,
  AuthUser,
} from "../types";

interface HomeProfileViewProps {
  currentUser?: AuthUser | null;
  activeProfile: PersonProfile;
  allProfiles: PersonProfile[];
  memories: Memory[];
  flashbacks: FlashbackExperience[];
  onCreateProfile: () => void;
  onExploreDemo: () => void;
  onOpenMemories: () => void;
  onCreateFlashback: () => void;
  onPlayFlashback: (flashback: FlashbackExperience) => void;
  onOpenFeelExistence: () => void;
  onOpenMemoryDetail: (memory: Memory) => void;
  onSwitchProfile: (profile: PersonProfile) => void;
  onOpenVoiceSetup: () => void;
}

export const HomeProfileView: React.FC<HomeProfileViewProps> = ({
  currentUser,
  activeProfile,
  allProfiles,
  memories,
  flashbacks,
  onCreateProfile,
  onExploreDemo,
  onOpenMemories,
  onCreateFlashback,
  onPlayFlashback,
  onOpenFeelExistence,
  onOpenMemoryDetail,
  onSwitchProfile,
  onOpenVoiceSetup,
}) => {
  const latestFlashback = flashbacks[0] || null;
  const recentMemories = memories.slice(0, 6);
  const audioCount = memories.filter((m) => m.type === "audio" || Boolean(m.audioUrl)).length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-16 animate-fade-in">
      
      {/* ======================================================== */}
      {/* 1. WELCOME BACK AREA                                     */}
      {/* ======================================================== */}
      <section className="text-center max-w-2xl mx-auto space-y-3 pt-2">
        <span className="text-[11px] uppercase tracking-[0.2em] font-mono text-terracotta font-semibold block">
          STILL HERE • Private Memory Sanctuary
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-espresso-950 font-normal tracking-tight leading-tight">
          {currentUser ? `Welcome back, ${currentUser.name}.` : "Some memories never leave us."}
        </h1>
        <p className="text-sm sm:text-base text-espresso-600 font-serif leading-relaxed max-w-xl mx-auto">
          {currentUser
            ? "Your memories, all in one place. Keep their photographs, voices, and stories close."
            : "Keep their photographs, stories, and familiar moments close. Revisit the memories that matter to you."}
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onCreateProfile}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-terracotta hover:bg-terracotta-dark text-white text-xs sm:text-sm font-medium shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create a memory profile</span>
          </button>

          <button
            onClick={onExploreDemo}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-parchment-200/80 hover:bg-parchment-300 text-espresso-800 text-xs sm:text-sm font-medium transition-all cursor-pointer border border-parchment-300"
          >
            <Sparkles className="w-4 h-4 text-terracotta" />
            <span>Explore demo memories</span>
          </button>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. PEOPLE I REMEMBER SECTION                             */}
      {/* ======================================================== */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-parchment-300 pb-3">
          <div>
            <h2 className="font-serif text-2xl font-normal text-espresso-900">
              People I Remember
            </h2>
            <p className="text-xs text-espresso-500 font-sans mt-0.5">
              Personal archives dedicated to the people you love.
            </p>
          </div>
          <button
            type="button"
            onClick={onCreateProfile}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-terracotta hover:text-terracotta-dark transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Person</span>
          </button>
        </div>

        {allProfiles.length === 0 ? (
          <div className="p-12 text-center bg-parchment-50 rounded-3xl border border-dashed border-parchment-300 space-y-4">
            <User className="w-10 h-10 text-parchment-400 mx-auto" />
            <div className="space-y-1">
              <h3 className="font-serif text-lg text-espresso-800">No memory profiles created yet</h3>
              <p className="text-xs text-espresso-500 font-sans max-w-sm mx-auto">
                Begin by creating a private memory space for someone you miss.
              </p>
            </div>
            <button
              type="button"
              onClick={onCreateProfile}
              className="px-5 py-2.5 rounded-full bg-terracotta text-parchment-50 text-xs font-medium hover:bg-terracotta-dark transition-all shadow cursor-pointer"
            >
              Create Your First Memory Profile
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProfiles.map((p) => {
              const isSelected = p.id === activeProfile.id;
              // Compute genuine counts if active, otherwise estimate
              const memCount = isSelected ? memories.length : (p.isDemo ? 3 : 0);
              const recCount = isSelected ? audioCount : (p.isDemo ? 2 : 0);

              return (
                <div
                  key={p.id}
                  className={`p-6 rounded-3xl transition-all border flex flex-col justify-between space-y-5 ${
                    isSelected
                      ? "bg-parchment-50 border-terracotta/50 shadow-md ring-1 ring-terracotta/20"
                      : "bg-parchment-100/60 border-parchment-300 hover:border-parchment-400 hover:shadow-sm"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-espresso-900 border-2 border-parchment-300 shrink-0 shadow">
                        {p.portraitUrl ? (
                          <img
                            src={p.portraitUrl}
                            alt={p.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-parchment-300 font-serif text-xl">
                            {p.name.charAt(0)}
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-serif text-lg font-medium text-espresso-950 truncate">
                            {p.name}
                          </h3>
                          {p.isDemo && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-terracotta-light text-terracotta-dark">
                              Demo
                            </span>
                          )}
                        </div>

                        {p.relationship && (
                          <span className="text-xs text-terracotta font-serif italic block">
                            {p.relationship}
                          </span>
                        )}

                        <div className="flex items-center gap-3 mt-1.5 text-xs text-espresso-500 font-mono">
                          <span>{memCount} {memCount === 1 ? "memory" : "memories"}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-terracotta-dark">
                            <Mic className="w-3 h-3" />
                            {recCount} {recCount === 1 ? "recording" : "recordings"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-espresso-600 line-clamp-2 font-sans leading-relaxed">
                      {p.description || p.caption || "A quiet space dedicated to their presence and memory."}
                    </p>
                  </div>

                  {/* Actions for this person */}
                  <div className="pt-3 border-t border-parchment-200/80 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          onSwitchProfile(p);
                          onOpenMemories();
                        }}
                        className="py-2 px-3 rounded-xl bg-parchment-200 hover:bg-parchment-300 text-espresso-800 text-xs font-medium transition-colors cursor-pointer text-center"
                      >
                        Open Memories
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onSwitchProfile(p);
                          onCreateFlashback();
                        }}
                        className="py-2 px-3 rounded-xl bg-parchment-200 hover:bg-parchment-300 text-espresso-800 text-xs font-medium transition-colors cursor-pointer text-center"
                      >
                        Create Flashback
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          onSwitchProfile(p);
                          onOpenFeelExistence();
                        }}
                        className="py-2 px-3 rounded-xl bg-terracotta/10 hover:bg-terracotta/20 text-terracotta-dark text-xs font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Flame className="w-3.5 h-3.5 text-terracotta" />
                        <span>Feel Existence</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onSwitchProfile(p);
                          onOpenVoiceSetup();
                        }}
                        className="py-2 px-3 rounded-xl bg-parchment-200 hover:bg-parchment-300 text-espresso-800 text-xs font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Mic className="w-3.5 h-3.5 text-terracotta" />
                        <span>Voice Setup</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ======================================================== */}
      {/* 3. PRESERVE THEIR VOICE PROMINENT ONBOARDING BANNER      */}
      {/* ======================================================== */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-espresso-900 to-espresso-950 text-parchment-100 border border-parchment-700 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta/20 border border-terracotta/40 text-terracotta-light text-xs font-mono">
            <Mic className="w-3.5 h-3.5" />
            <span>Preserve Their Voice • 3+ Recording Guided Flow</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-normal leading-snug">
            Add recordings to keep their original voice close.
          </h3>

          <p className="text-xs sm:text-sm text-parchment-300 leading-relaxed font-light">
            Upload voice notes, voicemails, or conversations to keep their original voice and meaningful words together with your memories.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenVoiceSetup}
          className="relative z-10 px-6 py-3.5 rounded-full bg-terracotta hover:bg-terracotta-dark text-parchment-50 font-medium text-xs sm:text-sm transition-all shadow-lg hover:shadow-xl shrink-0 cursor-pointer flex items-center gap-2"
        >
          <Headphones className="w-4 h-4" />
          <span>Launch Voice Setup</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* ======================================================== */}
      {/* 4. RECENT MEMORIES SECTION                               */}
      {/* ======================================================== */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-parchment-300 pb-3">
          <div>
            <h2 className="font-serif text-2xl font-normal text-espresso-900">
              Recently Added
            </h2>
            <p className="text-xs text-espresso-500 font-sans mt-0.5">
              Photographs, recordings, and stories saved in {activeProfile.name}'s archive.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenMemories}
            className="text-xs font-medium text-terracotta hover:text-terracotta-dark transition-colors cursor-pointer"
          >
            View all memories →
          </button>
        </div>

        {recentMemories.length === 0 ? (
          <div className="p-8 text-center bg-parchment-50 rounded-2xl border border-dashed border-parchment-300 text-xs text-espresso-500">
            No memories uploaded yet for this person. Add photographs, letters, or voice notes to begin.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {recentMemories.map((mem) => (
              <div
                key={mem.id}
                onClick={() => onOpenMemoryDetail(mem)}
                className="group p-4 bg-parchment-50 rounded-2xl border border-parchment-300 hover:border-parchment-400 hover:shadow-md transition-all cursor-pointer space-y-3"
              >
                {mem.imageUrl ? (
                  <div className="w-full aspect-16/10 rounded-xl overflow-hidden bg-espresso-900 relative">
                    <img
                      src={mem.imageUrl}
                      alt={mem.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-espresso-950/75 text-parchment-200 backdrop-blur-xs">
                      {mem.type === "photo" ? "Photograph" : mem.type}
                    </span>
                  </div>
                ) : (
                  <div className="w-full aspect-16/10 rounded-xl bg-parchment-200 flex items-center justify-center text-espresso-400">
                    {mem.type === "audio" ? <Mic className="w-8 h-8" /> : <BookOpen className="w-8 h-8" />}
                  </div>
                )}

                <div className="space-y-1">
                  <h4 className="font-serif text-sm font-medium text-espresso-900 group-hover:text-terracotta transition-colors line-clamp-1">
                    {mem.title}
                  </h4>
                  <p className="text-xs text-espresso-600 line-clamp-2 font-sans leading-relaxed">
                    {mem.description}
                  </p>
                </div>

                <div className="text-[11px] font-mono text-espresso-400 pt-1 flex items-center justify-between">
                  <span>{mem.occurredAt || "Date unrecorded"}</span>
                  <span className="text-terracotta text-xs font-sans group-hover:translate-x-1 transition-transform">
                    Revisit →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ======================================================== */}
      {/* 5. SAVED FLASHBACKS & CONTINUE JOURNEY                   */}
      {/* ======================================================== */}
      {latestFlashback && (
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-parchment-300 pb-3">
            <div>
              <h2 className="font-serif text-2xl font-normal text-espresso-900">
                Continue Where You Left Off
              </h2>
              <p className="text-xs text-espresso-500 font-sans mt-0.5">
                Resume your vertical memory journey for {activeProfile.name}.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-parchment-50 border border-parchment-300 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-espresso-900 overflow-hidden shrink-0">
                {latestFlashback.coverImageUrl ? (
                  <img
                    src={latestFlashback.coverImageUrl}
                    alt={latestFlashback.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Film className="w-8 h-8 text-parchment-300 m-auto mt-4" />
                )}
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-terracotta uppercase tracking-wider">
                  Saved Vertical Flashback • {latestFlashback.shots.length} Shots
                </span>
                <h4 className="font-serif text-lg font-medium text-espresso-950">
                  {latestFlashback.title}
                </h4>
                <p className="text-xs text-espresso-600 font-sans line-clamp-1">
                  {latestFlashback.openingCaption || "A quiet morning remembered through familiar sounds and photographs."}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onPlayFlashback(latestFlashback)}
              className="px-5 py-2.5 rounded-full bg-terracotta hover:bg-terracotta-dark text-parchment-50 text-xs font-medium transition-colors shadow flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Resume Flashback</span>
            </button>
          </div>
        </section>
      )}
    </div>
  );
};
