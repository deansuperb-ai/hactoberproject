import React from "react";
import {
  Plus,
  Headphones,
  MessageSquare,
  Clock,
  Sparkles,
  ArrowRight,
  Disc3,
  Calendar,
} from "lucide-react";
import type { Memory, AppView } from "../types";
import { formatMemoryDate } from "../utils/formatDate";
import { MemoryCard } from "../components/memory/MemoryCard";

interface MemorySpaceViewProps {
  memories: Memory[];
  onSelectMemory: (memory: Memory) => void;
  onPlayAudio: (memory: Memory) => void;
  currentAudioUrl: string | null;
  isPlaying: boolean;
  onOpenAddMemory: () => void;
  onNavigate: (view: AppView) => void;
}

export const MemorySpaceView: React.FC<MemorySpaceViewProps> = ({
  memories,
  onSelectMemory,
  onPlayAudio,
  currentAudioUrl,
  isPlaying,
  onOpenAddMemory,
  onNavigate,
}) => {
  // Select featured memory (prioritizes memory with audio and photo)
  const featuredMemory =
    memories.find((m) => m.audioUrl && m.imageUrl) || memories[0];

  const recentMemories = memories.slice(0, 4);

  // Memories sorted by date for compact timeline preview
  const datedMemories = [...memories]
    .filter((m) => m.occurredAt)
    .sort((a, b) => (b.occurredAt || "").localeCompare(a.occurredAt || ""))
    .slice(0, 3);

  return (
    <div className="space-y-12 py-4 sm:py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Personalized Welcome Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-parchment-300">
        <div>
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-espresso-500 mb-2 block">
            Private Archive
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-espresso-950 tracking-tight">
            Welcome to your memory space.
          </h1>
          <p className="text-base text-espresso-600 mt-2 max-w-2xl font-sans">
            Here you can browse preserved recordings, letters, and reflections. Take your time, listen closely, and revisit the moments that matter.
          </p>
        </div>

        {/* Quick Actions Row */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenAddMemory}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-terracotta hover:bg-terracotta-hover text-white text-sm font-medium shadow-warm-sm transition-all transform active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Memory</span>
          </button>

          <button
            type="button"
            onClick={() => {
              const audioMem = memories.find((m) => m.audioUrl);
              if (audioMem) onPlayAudio(audioMem);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white hover:bg-parchment-100 text-espresso-800 border border-parchment-300 text-sm font-medium shadow-warm-xs transition-colors cursor-pointer"
          >
            <Headphones className="w-4 h-4 text-espresso-600" />
            <span>Listen to a Memory</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate("conversation")}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-espresso-900 hover:bg-espresso-950 text-parchment-100 text-sm font-medium shadow-warm-sm transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-terracotta-light" />
            <span>Start Conversation</span>
          </button>
        </div>
      </section>

      {/* Featured Memory Hero Spotlight */}
      {featuredMemory && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-terracotta">
              <Sparkles className="w-4 h-4" />
              <span>Cherished Memory Spotlight</span>
            </div>
            <button
              type="button"
              onClick={() => onNavigate("gallery")}
              className="text-xs font-medium text-espresso-600 hover:text-terracotta transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>View full archive</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div
            onClick={() => onSelectMemory(featuredMemory)}
            className="card-album rounded-3xl p-6 sm:p-8 bg-white border border-[#E6DDD2] shadow-album group cursor-pointer"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 aspect-[16/10] rounded-2xl overflow-hidden bg-espresso-950 relative border border-parchment-300">
                {featuredMemory.imageUrl ? (
                  <img
                    src={featuredMemory.imageUrl}
                    alt={featuredMemory.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-espresso-900 text-parchment-100">
                    <Disc3 className="w-16 h-16 text-terracotta" />
                  </div>
                )}
                {featuredMemory.audioUrl && (
                  <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-espresso-950/80 backdrop-blur-sm text-parchment-100">
                    <Headphones className="w-3.5 h-3.5 text-terracotta" />
                    <span>Authentic Audio Attached</span>
                  </span>
                )}
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-espresso-500">
                  <Calendar className="w-3.5 h-3.5 text-espresso-400" />
                  <span>{formatMemoryDate(featuredMemory.occurredAt)}</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl font-medium text-espresso-950 group-hover:text-terracotta transition-colors leading-tight">
                  {featuredMemory.title}
                </h2>

                <p className="text-base text-espresso-600 leading-relaxed font-sans line-clamp-3">
                  {featuredMemory.description}
                </p>

                {featuredMemory.transcript && (
                  <blockquote className="p-4 rounded-xl bg-parchment-100 border-l-3 border-terracotta text-sm font-serif italic text-espresso-900">
                    "{featuredMemory.transcript}"
                  </blockquote>
                )}

                <div className="pt-2 flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-terracotta group-hover:underline">
                    <span>Revisit this moment</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Recently Revisited Memories Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-2xl font-medium text-espresso-900">
              Recently Revisited Memories
            </h3>
            <p className="text-xs sm:text-sm text-espresso-500">
              Moments from your archive waiting to be experienced again.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate("gallery")}
            className="text-xs sm:text-sm font-medium text-espresso-600 hover:text-terracotta transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>See all memories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentMemories.map((mem) => (
            <MemoryCard
              key={mem.id}
              memory={mem}
              onSelect={onSelectMemory}
              onPlayAudio={onPlayAudio}
              isPlaying={isPlaying && currentAudioUrl === mem.audioUrl}
            />
          ))}
        </div>
      </section>

      {/* Compact Memory Timeline Preview */}
      <section className="rounded-3xl bg-[#FAF7F2] border border-[#E6DDD2] p-6 sm:p-8 space-y-4 shadow-warm-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-terracotta" />
            <h3 className="font-serif text-xl sm:text-2xl font-medium text-espresso-900">
              Chronological Thread
            </h3>
          </div>
          <button
            type="button"
            onClick={() => onNavigate("timeline")}
            className="text-xs sm:text-sm font-medium text-espresso-600 hover:text-terracotta transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Open full timeline</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {datedMemories.map((mem) => (
            <div
              key={mem.id}
              onClick={() => onSelectMemory(mem)}
              className="p-4 rounded-2xl bg-white border border-parchment-300 hover:border-terracotta/50 transition-colors cursor-pointer group"
            >
              <span className="text-xs font-mono text-terracotta font-semibold block mb-1">
                {formatMemoryDate(mem.occurredAt)}
              </span>
              <h4 className="font-serif text-lg font-medium text-espresso-900 group-hover:text-terracotta transition-colors truncate">
                {mem.title}
              </h4>
              <p className="text-xs text-espresso-600 line-clamp-2 mt-1">
                {mem.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
