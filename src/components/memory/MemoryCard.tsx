import React from "react";
import {
  Image as ImageIcon,
  Headphones,
  BookOpen,
  Play,
  Pause,
  Disc3,
  Calendar,
} from "lucide-react";
import type { Memory } from "../../types";
import { formatMemoryDate } from "../../utils/formatDate";
import { TagBadge } from "../common/TagBadge";

interface MemoryCardProps {
  memory: Memory;
  onSelect: (memory: Memory) => void;
  onPlayAudio?: (memory: Memory) => void;
  isPlaying?: boolean;
}

export const MemoryCard: React.FC<MemoryCardProps> = ({
  memory,
  onSelect,
  onPlayAudio,
  isPlaying = false,
}) => {
  const isAudioType = memory.type === "audio";
  const isPhotoType = memory.type === "photo";
  const hasAudio = Boolean(memory.audioUrl);

  const typeIcon = isAudioType ? (
    <Headphones className="w-3.5 h-3.5" />
  ) : isPhotoType ? (
    <ImageIcon className="w-3.5 h-3.5" />
  ) : (
    <BookOpen className="w-3.5 h-3.5" />
  );

  const typeLabel = isAudioType
    ? "Audio Recording"
    : isPhotoType
    ? "Photograph"
    : "Written Memoir";

  return (
    <article
      onClick={() => onSelect(memory)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(memory);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Open memory: ${memory.title}`}
      className="group card-album rounded-3xl overflow-hidden flex flex-col text-left cursor-pointer focus-visible:ring-terracotta relative"
    >
      {/* Artwork / Photo Header */}
      <div className="relative aspect-[4/3] bg-parchment-200 overflow-hidden border-b border-parchment-300">
        {memory.imageUrl ? (
          <img
            src={memory.imageUrl}
            alt={memory.title}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        ) : isAudioType ? (
          <div className="w-full h-full bg-gradient-to-br from-espresso-800 to-espresso-950 flex flex-col items-center justify-center p-6 text-parchment-100 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-terracotta/40 flex items-center justify-center mb-3">
                <Disc3 className={`w-8 h-8 text-terracotta ${isPlaying ? "animate-spin-slow" : ""}`} />
              </div>
              <span className="font-serif italic text-sm text-parchment-300">
                Authentic Voice Recording
              </span>
            </div>
          </div>
        ) : (
          <div className="w-full h-full bg-[#FAF5EE] flex flex-col items-center justify-center p-6 text-espresso-700 relative">
            <div className="w-12 h-12 rounded-2xl bg-parchment-200 flex items-center justify-center mb-2">
              <BookOpen className="w-6 h-6 text-espresso-600" />
            </div>
            <span className="font-serif text-xs text-espresso-500 italic">
              Archival Written Story
            </span>
          </div>
        )}

        {/* Type Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium tracking-wide bg-espresso-950/75 backdrop-blur-sm text-parchment-100 shadow-warm-xs">
            {typeIcon}
            <span>{typeLabel}</span>
          </span>
        </div>

        {/* Quick Audio Play Button overlay */}
        {hasAudio && onPlayAudio && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPlayAudio(memory);
            }}
            aria-label={isPlaying ? `Pause recording: ${memory.title}` : `Play recording: ${memory.title}`}
            className="absolute bottom-3 right-3 z-10 w-11 h-11 rounded-full bg-terracotta hover:bg-terracotta-hover text-white flex items-center justify-center shadow-warm-md transition-all transform active:scale-90 cursor-pointer focus-visible:ring-terracotta"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>
        )}
      </div>

      {/* Card Content Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Date & Source */}
          <div className="flex items-center justify-between text-xs text-espresso-500 font-mono mb-2">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-espresso-400" />
              {formatMemoryDate(memory.occurredAt)}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-xl sm:text-2xl font-medium text-espresso-900 group-hover:text-terracotta transition-colors line-clamp-1 mb-2">
            {memory.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-espresso-600 line-clamp-2 leading-relaxed mb-4">
            {memory.description}
          </p>
        </div>

        {/* Tags footer */}
        {memory.tags && memory.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-parchment-200">
            {memory.tags.slice(0, 3).map((tag) => (
              <TagBadge key={tag} label={tag} size="sm" />
            ))}
            {memory.tags.length > 3 && (
              <span className="text-[11px] font-mono text-espresso-400 self-center">
                +{memory.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
};
