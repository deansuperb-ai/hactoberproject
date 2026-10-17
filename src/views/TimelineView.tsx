import React, { useMemo } from "react";
import {
  Calendar,
  Clock,
  Headphones,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import type { Memory } from "../types";
import { formatMemoryDate } from "../utils/formatDate";
import { TagBadge } from "../components/common/TagBadge";

interface TimelineViewProps {
  memories: Memory[];
  onSelectMemory: (memory: Memory) => void;
  onPlayAudio: (memory: Memory) => void;
  currentAudioUrl: string | null;
  isPlaying: boolean;
}

export const TimelineView: React.FC<TimelineViewProps> = ({
  memories,
  onSelectMemory,
  onPlayAudio,
  currentAudioUrl,
  isPlaying,
}) => {
  // Separate dated vs undated memories
  const { timelineGroups, undatedMemories } = useMemo(() => {
    const dated: Memory[] = [];
    const undated: Memory[] = [];

    memories.forEach((m) => {
      if (m.occurredAt && m.occurredAt.trim().length > 0) {
        dated.push(m);
      } else {
        undated.push(m);
      }
    });

    // Sort dated chronologically descending
    dated.sort((a, b) => (b.occurredAt || "").localeCompare(a.occurredAt || ""));

    // Group by Year
    const groups: { [year: string]: Memory[] } = {};
    dated.forEach((m) => {
      const year = m.occurredAt ? m.occurredAt.split("-")[0] : "Undated";
      if (!groups[year]) groups[year] = [];
      groups[year].push(m);
    });

    return {
      timelineGroups: Object.entries(groups),
      undatedMemories: undated,
    };
  }, [memories]);

  return (
    <div className="py-4 sm:py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Title Header */}
      <div className="pb-6 border-b border-parchment-300">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-espresso-500 mb-1.5 block">
          Chronological Memory Journey
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-espresso-950 tracking-tight">
          Memory Timeline
        </h1>
        <p className="text-sm sm:text-base text-espresso-600 mt-1 max-w-2xl font-sans">
          Walk back through the seasons, voice notes, and milestone events preserved in your private collection.
        </p>
      </div>

      {/* Dated Timeline Sections */}
      <div className="relative pl-6 sm:pl-10 space-y-12">
        {/* Continuous Warm Timeline Vertical Spine */}
        <div className="absolute left-2.5 sm:left-4 top-4 bottom-4 w-0.5 bg-gradient-to-b from-terracotta via-parchment-300 to-espresso-300" />

        {timelineGroups.map(([year, yearMemories]) => (
          <section key={year} className="relative space-y-6">
            {/* Year Milestone Node */}
            <div className="flex items-center gap-4">
              <div className="relative z-10 w-8 h-8 sm:w-9 sm:h-9 -ml-6 sm:-ml-8.5 rounded-full bg-espresso-900 border-4 border-[#FAF6F0] text-parchment-100 flex items-center justify-center shadow-warm-xs">
                <Clock className="w-4 h-4 text-terracotta-light" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-espresso-900 tracking-tight">
                {year}
              </h2>
            </div>

            {/* Year Memories List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-2 sm:pl-4">
              {yearMemories.map((mem) => {
                const isAudioPlaying =
                  isPlaying && currentAudioUrl === mem.audioUrl;

                return (
                  <article
                    key={mem.id}
                    onClick={() => onSelectMemory(mem)}
                    className="card-album rounded-3xl p-5 sm:p-6 bg-white border border-[#E6DDD2] shadow-warm-sm group cursor-pointer hover:border-terracotta/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Header */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-terracotta">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatMemoryDate(mem.occurredAt)}
                        </span>

                        <span className="text-[11px] font-mono text-espresso-500 uppercase px-2 py-0.5 rounded-md bg-parchment-200">
                          {mem.type}
                        </span>
                      </div>

                      {/* Photo / Audio Artwork */}
                      {mem.imageUrl && (
                        <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-4 bg-espresso-950">
                          <img
                            src={mem.imageUrl}
                            alt={mem.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="font-serif text-xl font-medium text-espresso-900 group-hover:text-terracotta transition-colors mb-2">
                        {mem.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-espresso-600 line-clamp-3 leading-relaxed mb-4">
                        {mem.description}
                      </p>
                    </div>

                    {/* Footer Info */}
                    <div className="pt-3 border-t border-parchment-200 flex items-center justify-between text-xs">
                      {mem.audioUrl ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onPlayAudio(mem);
                          }}
                          className="inline-flex items-center gap-1.5 text-terracotta font-medium hover:underline cursor-pointer"
                        >
                          <Headphones className="w-3.5 h-3.5" />
                          <span>{isAudioPlaying ? "Playing Audio..." : "Play Recording"}</span>
                        </button>
                      ) : (
                        <span className="text-espresso-400 font-mono">
                          {mem.tags[0] ? `#${mem.tags[0]}` : "Memory"}
                        </span>
                      )}

                      <span className="inline-flex items-center gap-1 text-espresso-500 group-hover:text-terracotta font-medium transition-colors">
                        <span>Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Undated / Timeless Moments Section */}
      {undatedMemories.length > 0 && (
        <section className="pt-8 border-t border-parchment-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-parchment-200 flex items-center justify-center text-espresso-600">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-medium text-espresso-900">
                Undated & Timeless Keepsakes
              </h2>
              <p className="text-xs text-espresso-500">
                Moments preserved without an exact calendar date, yet eternal in your memory.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {undatedMemories.map((mem) => (
              <article
                key={mem.id}
                onClick={() => onSelectMemory(mem)}
                className="card-album rounded-3xl p-5 bg-white border border-[#E6DDD2] shadow-warm-xs group cursor-pointer hover:border-terracotta/40 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-espresso-400 italic">
                    Timeless Memory
                  </span>
                  {mem.sourceLabel && (
                    <span className="text-[11px] font-mono text-espresso-500">
                      {mem.sourceLabel}
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-xl font-medium text-espresso-900 group-hover:text-terracotta transition-colors mb-2">
                  {mem.title}
                </h3>

                <p className="text-sm text-espresso-600 line-clamp-2 leading-relaxed mb-3">
                  {mem.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {mem.tags.map((t: string) => (
                    <TagBadge key={t} label={t} size="sm" />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
