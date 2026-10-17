import React from "react";
import {
  Flame,
  Plus,
  Play,
  Layers,
  ArrowRight,
  User,
  Film,
} from "lucide-react";
import type { PersonProfile, Memory, FlashbackExperience } from "../types";

interface HomeProfileViewProps {
  activeProfile: PersonProfile;
  memories: Memory[];
  flashbacks: FlashbackExperience[];
  onCreateProfile: () => void;
  onExploreDemo: () => void;
  onOpenMemories: () => void;
  onCreateFlashback: () => void;
  onPlayFlashback: (flashback: FlashbackExperience) => void;
  onOpenFeelExistence: () => void;
  onOpenMemoryDetail: (memory: Memory) => void;
}

export const HomeProfileView: React.FC<HomeProfileViewProps> = ({
  activeProfile,
  memories,
  flashbacks,
  onCreateProfile,
  onExploreDemo,
  onOpenMemories,
  onCreateFlashback,
  onPlayFlashback,
  onOpenFeelExistence,
  onOpenMemoryDetail,
}) => {
  const latestFlashback = flashbacks[0] || null;
  const recentMemories = memories.slice(0, 6);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-14 animate-fade-in">
      {/* ======================================================== */}
      {/* A. WELCOME AREA                                          */}
      {/* ======================================================== */}
      <section className="text-center max-w-2xl mx-auto space-y-4 pt-4">
        <span className="text-[11px] uppercase tracking-[0.2em] font-mono text-terracotta font-semibold block">
          STILL HERE • Private Memory Sanctuary
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-espresso-950 font-normal tracking-tight leading-tight">
          Some memories never leave us.
        </h1>
        <p className="text-sm sm:text-base text-espresso-600 font-serif leading-relaxed max-w-xl mx-auto">
          Keep their photographs, stories, and familiar moments close. Revisit the memories that matter to you.
        </p>

        <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onCreateProfile}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-terracotta hover:bg-terracotta-dark text-white text-xs sm:text-sm font-medium shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create a memory profile</span>
          </button>

          <button
            onClick={onExploreDemo}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-parchment-200 hover:bg-parchment-300 text-espresso-800 text-xs sm:text-sm font-medium transition-all cursor-pointer"
          >
            <span>Explore demo memories</span>
          </button>
        </div>
      </section>

      {/* ======================================================== */}
      {/* B. FEATURED PERSON PROFILE CARD                          */}
      {/* ======================================================== */}
      <section className="p-6 sm:p-10 rounded-3xl bg-white border border-parchment-200 shadow-sm relative overflow-hidden">
        {/* Subtle Warm Tone Background Accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-terracotta/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Portrait Photo */}
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden shadow-xl ring-8 ring-parchment-100 bg-parchment-200 shrink-0 group">
            {activeProfile.portraitUrl ? (
              <img
                src={activeProfile.portraitUrl}
                alt={activeProfile.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-espresso-400">
                <User className="w-16 h-16" />
              </div>
            )}
            {activeProfile.isDemo && (
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-black/60 backdrop-blur-xs text-parchment-200 font-medium">
                Demo Portrait
              </span>
            )}
          </div>

          {/* Profile Details & Metadata */}
          <div className="flex-1 text-center lg:text-left space-y-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                {activeProfile.relationship && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-parchment-100 text-espresso-700 border border-parchment-300">
                    {activeProfile.relationship}
                  </span>
                )}
                {activeProfile.isDemo ? (
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-olive-light text-olive-dark font-medium">
                    Demo Experience
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-parchment-100 text-espresso-600">
                    Private Sanctuary
                  </span>
                )}
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-espresso-900 font-normal">
                {activeProfile.name}
              </h2>

              {activeProfile.caption && (
                <p className="font-serif text-sm sm:text-base text-terracotta-dark italic">
                  "{activeProfile.caption}"
                </p>
              )}
            </div>

            {activeProfile.description && (
              <p className="text-xs sm:text-sm text-espresso-600 leading-relaxed max-w-xl">
                {activeProfile.description}
              </p>
            )}

            {/* Actual Stored Metrics */}
            <div className="flex items-center justify-center lg:justify-start gap-6 pt-1 text-xs text-espresso-500 font-mono">
              <div className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-terracotta" />
                <span>
                  <strong className="text-espresso-800">{memories.length}</strong> memories saved
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Film className="w-4 h-4 text-terracotta" />
                <span>
                  <strong className="text-espresso-800">{flashbacks.length}</strong> flashbacks
                </span>
              </div>
            </div>

            {/* Actions: Open Memories, Create Flashback, Feel the Existence */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <button
                onClick={onOpenMemories}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-parchment-200 hover:bg-parchment-300 text-espresso-900 text-xs font-medium transition-all cursor-pointer"
              >
                <span>Open their memories</span>
              </button>

              <button
                onClick={onCreateFlashback}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-espresso-900 hover:bg-espresso-800 text-parchment-100 text-xs font-medium shadow-xs transition-all cursor-pointer"
              >
                <Film className="w-3.5 h-3.5 text-terracotta" />
                <span>Create a flashback</span>
              </button>

              <button
                onClick={onOpenFeelExistence}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-terracotta hover:bg-terracotta-dark text-white text-xs font-medium shadow-xs transition-all cursor-pointer"
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Feel the Existence</span>
              </button>
            </div>
          </div>
        </div>

        {/* Eleanor Demo Spotlight Section if Active Profile is Eleanor */}
        {activeProfile.isDemo && (
          <div className="mt-8 pt-8 border-t border-parchment-200 space-y-4 bg-parchment-50 -mx-6 sm:-mx-10 -mb-6 sm:-mb-10 p-6 sm:p-8 rounded-b-3xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-terracotta font-semibold">
                  Featured Demonstration Memory
                </span>
                <h3 className="font-serif text-xl text-espresso-900 font-medium">
                  A Rainy Morning in the Kitchen
                </h3>
                <p className="text-xs text-espresso-600 font-serif italic max-w-lg">
                  "A quiet morning remembered through the smell of fresh bread, a familiar voice, and the sound of rain outside."
                </p>
              </div>

              {latestFlashback && (
                <button
                  onClick={() => onPlayFlashback(latestFlashback)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-espresso-900 hover:bg-espresso-800 text-white text-xs font-medium shadow-md transition-all cursor-pointer shrink-0"
                >
                  <Play className="w-3.5 h-3.5 fill-current text-terracotta" />
                  <span>Experience demo flashback</span>
                </button>
              )}
            </div>
          </div>
        )}
      </section>

      {/* ======================================================== */}
      {/* C. RECENT MEMORIES GRID                                  */}
      {/* ======================================================== */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl text-espresso-900 font-normal">
              Recent Memories
            </h2>
            <p className="text-xs text-espresso-500">
              Photographs, audio recordings, letters, and moments preserved for {activeProfile.name}
            </p>
          </div>

          <button
            onClick={onOpenMemories}
            className="inline-flex items-center gap-1 text-xs font-medium text-terracotta hover:underline"
          >
            <span>View all ({memories.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {recentMemories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {recentMemories.map((mem) => (
              <div
                key={mem.id}
                onClick={() => onOpenMemoryDetail(mem)}
                className="group p-4 rounded-2xl bg-white border border-parchment-200 hover:border-terracotta/40 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-3"
              >
                {/* Image / Media Preview */}
                {mem.imageUrl ? (
                  <div className="w-full aspect-16/10 rounded-xl overflow-hidden bg-parchment-100 relative">
                    <img
                      src={mem.imageUrl}
                      alt={mem.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/60 backdrop-blur-xs text-white">
                      {mem.type}
                    </span>
                  </div>
                ) : (
                  <div className="w-full aspect-16/10 rounded-xl bg-parchment-100 flex items-center justify-center text-xs text-espresso-500 font-serif italic p-4 text-center">
                    "{mem.description.slice(0, 90)}..."
                  </div>
                )}

                <div className="space-y-1">
                  <h3 className="font-serif text-base text-espresso-900 font-medium group-hover:text-terracotta transition-colors line-clamp-1">
                    {mem.title}
                  </h3>
                  <p className="text-xs text-espresso-600 line-clamp-2 leading-relaxed">
                    {mem.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-parchment-100 flex items-center justify-between text-[11px] text-espresso-500">
                  <span>{mem.occurredAt || "Date unknown"}</span>
                  {mem.audioUrl && (
                    <span className="inline-flex items-center gap-1 text-terracotta font-medium">
                      Audio recording
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 rounded-3xl bg-white border border-dashed border-parchment-300 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-parchment-200 text-espresso-500 flex items-center justify-center mx-auto">
              <Plus className="w-5 h-5 text-terracotta" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-lg text-espresso-900 font-medium">
                No memories yet
              </h3>
              <p className="text-xs text-espresso-600 max-w-sm mx-auto">
                Add a photograph, voice recording, or story to begin building {activeProfile.name}'s memory album.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* ======================================================== */}
      {/* D. CONTINUE YOUR JOURNEY (FLASHBACK SPOTLIGHT)           */}
      {/* ======================================================== */}
      <section className="p-6 sm:p-8 rounded-3xl bg-espresso-950 text-parchment-100 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-terracotta-light">
              Cinematic Flashback Experience
            </span>
            <h3 className="font-serif text-2xl text-parchment-50 font-normal">
              {latestFlashback ? latestFlashback.title : "Experience a Vertically Unfolding Memory"}
            </h3>
            <p className="text-xs text-parchment-300 font-serif italic max-w-xl">
              {latestFlashback
                ? latestFlashback.subtitle || latestFlashback.openingCaption
                : "Watch photographs, familiar places, and authentic voices unfold as you scroll downward."}
            </p>
          </div>

          {latestFlashback ? (
            <button
              onClick={() => onPlayFlashback(latestFlashback)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-parchment-100 hover:bg-white text-espresso-950 text-xs font-medium shadow-md transition-all cursor-pointer shrink-0"
            >
              <Play className="w-3.5 h-3.5 fill-current text-terracotta" />
              <span>Resume Flashback</span>
            </button>
          ) : (
            <button
              onClick={onCreateFlashback}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-terracotta hover:bg-terracotta-dark text-white text-xs font-medium shadow-md transition-all cursor-pointer shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Your First Flashback</span>
            </button>
          )}
        </div>
      </section>
    </div>
  );
};
