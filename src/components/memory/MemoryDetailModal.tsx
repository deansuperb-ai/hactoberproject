import React, { useState } from "react";
import {
  Calendar,
  Tag,
  Edit3,
  Trash2,
  Disc3,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import type { Memory } from "../../types";
import { formatMemoryDate } from "../../utils/formatDate";
import { TagBadge } from "../common/TagBadge";
import { AudioPlayer } from "../common/AudioPlayer";
import { Modal } from "../common/Modal";
import { ConfirmDialog } from "../common/ConfirmDialog";

interface MemoryDetailModalProps {
  memory: Memory | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (memory: Memory) => void;
  onDelete?: (id: string) => void;
  allMemories?: Memory[];
  onSelectRelated?: (memory: Memory) => void;
  // Audio state
  currentAudioUrl?: string | null;
  isPlaying?: boolean;
  currentTime?: number;
  duration?: number;
  playbackRate?: number;
  volume?: number;
  isMuted?: boolean;
  onTogglePlay?: (memory: Memory) => void;
  onSeek?: (seconds: number) => void;
  onChangeSpeed?: (rate: number) => void;
  onSetVolume?: (vol: number) => void;
  onToggleMute?: () => void;
}

export const MemoryDetailModal: React.FC<MemoryDetailModalProps> = ({
  memory,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  allMemories = [],
  onSelectRelated = () => {},
  currentAudioUrl = null,
  isPlaying = false,
  currentTime = 0,
  duration = 0,
  playbackRate = 1,
  volume = 1,
  isMuted = false,
  onTogglePlay = () => {},
  onSeek = () => {},
  onChangeSpeed = () => {},
  onSetVolume = () => {},
  onToggleMute = () => {},
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!memory || !isOpen) return null;

  const isCurrentAudioPlaying =
    isPlaying && currentAudioUrl === memory.audioUrl;

  // Find related memory if specified
  const relatedMemory = memory.relatedMemoryId
    ? allMemories.find((m) => m.id === memory.relatedMemoryId)
    : null;

  // Additional automatic associations based on shared tags
  const otherRelatedMemories = allMemories.filter(
    (m) =>
      m.id !== memory.id &&
      m.id !== memory.relatedMemoryId &&
      m.tags.some((t) => memory.tags.includes(t))
  );

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} maxWidth="xl">
        <div className="space-y-6">
          {/* Top Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-parchment-200 text-espresso-700 border border-parchment-300">
                <Calendar className="w-3.5 h-3.5 text-terracotta" />
                {formatMemoryDate(memory.occurredAt)}
              </span>

              {memory.sourceLabel && (
                <span className="text-xs font-mono text-espresso-500 italic">
                  Source: {memory.sourceLabel}
                </span>
              )}
            </div>

            {/* Actions: Edit & Delete */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onEdit?.(memory)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium bg-parchment-200 hover:bg-parchment-300 text-espresso-800 transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Memory</span>
              </button>

              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium text-terracotta hover:bg-terracotta-light/60 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>

          {/* Large Photograph or Audio Visual Artwork */}
          {memory.imageUrl ? (
            <div className="rounded-3xl overflow-hidden border border-parchment-300 shadow-warm-md bg-espresso-950 aspect-[16/10] max-h-[460px]">
              <img
                src={memory.imageUrl}
                alt={memory.title}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="rounded-3xl p-8 bg-gradient-to-br from-espresso-900 to-espresso-950 text-parchment-100 border border-espresso-800 flex flex-col items-center justify-center text-center shadow-warm-md">
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-terracotta/50 flex items-center justify-center mb-4">
                <Disc3
                  className={`w-10 h-10 text-terracotta ${
                    isCurrentAudioPlaying ? "animate-spin-slow" : ""
                  }`}
                />
              </div>
              <h4 className="font-serif text-2xl font-medium text-parchment-100">
                {memory.title}
              </h4>
              <p className="text-xs font-mono text-parchment-300 mt-1">
                Authentic archival voice recording preserved in your private collection
              </p>
            </div>
          )}

          {/* Memory Title & Story */}
          <div className="space-y-4 pt-2">
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-espresso-900 tracking-tight">
              {memory.title}
            </h2>

            <div className="prose prose-stone max-w-none text-base sm:text-lg text-espresso-800 leading-relaxed font-sans">
              <p>{memory.description}</p>
            </div>

            {/* Transcript or Spoken Words Quote if exists */}
            {memory.transcript && (
              <blockquote className="my-5 p-5 sm:p-6 rounded-2xl bg-parchment-150 border-l-4 border-terracotta shadow-warm-xs">
                <div className="flex items-center gap-2 mb-2 text-xs font-mono font-semibold uppercase tracking-wider text-terracotta">
                  <Sparkles className="w-4 h-4" />
                  <span>Words From Your Archive</span>
                </div>
                <p className="font-serif italic text-lg sm:text-xl text-espresso-900 leading-relaxed">
                  "{memory.transcript}"
                </p>
              </blockquote>
            )}
          </div>

          {/* Original Audio Player Section */}
          {memory.audioUrl && (
            <div className="pt-2">
              <AudioPlayer
                url={memory.audioUrl}
                title={memory.title}
                sourceLabel={memory.sourceLabel || "Original Archive Recording"}
                kind="original"
                isPlaying={isCurrentAudioPlaying}
                currentTime={isCurrentAudioPlaying ? currentTime : 0}
                duration={isCurrentAudioPlaying ? duration : 0}
                playbackRate={playbackRate}
                volume={volume}
                isMuted={isMuted}
                onTogglePlay={() => onTogglePlay(memory)}
                onSeek={onSeek}
                onChangeSpeed={onChangeSpeed}
                onSetVolume={onSetVolume}
                onToggleMute={onToggleMute}
              />
            </div>
          )}

          {/* Tags */}
          {memory.tags && memory.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <Tag className="w-4 h-4 text-espresso-400" />
              {memory.tags.map((tag) => (
                <TagBadge key={tag} label={tag} />
              ))}
            </div>
          )}

          {/* Associated Memories Section */}
          {(relatedMemory || otherRelatedMemories.length > 0) && (
            <div className="pt-6 border-t border-parchment-300">
              <h4 className="font-serif text-xl font-medium text-espresso-900 mb-3">
                Related Moments from Your Archive
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedMemory && (
                  <button
                    type="button"
                    onClick={() => onSelectRelated(relatedMemory)}
                    className="p-3.5 rounded-2xl border border-terracotta-border bg-terracotta-light/30 hover:bg-terracotta-light/60 text-left transition-colors flex items-center justify-between gap-3 group cursor-pointer"
                  >
                    <div>
                      <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-terracotta block">
                        Directly Associated
                      </span>
                      <span className="font-serif text-base font-medium text-espresso-900 group-hover:text-terracotta transition-colors">
                        {relatedMemory.title}
                      </span>
                      <span className="text-xs text-espresso-500 block">
                        {formatMemoryDate(relatedMemory.occurredAt)}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-terracotta group-hover:translate-x-1 transition-transform shrink-0" />
                  </button>
                )}

                {otherRelatedMemories.slice(0, 2).map((rel) => (
                  <button
                    key={rel.id}
                    type="button"
                    onClick={() => onSelectRelated(rel)}
                    className="p-3.5 rounded-2xl border border-parchment-300 bg-white hover:bg-parchment-100 text-left transition-colors flex items-center justify-between gap-3 group cursor-pointer"
                  >
                    <div>
                      <span className="text-[10px] font-mono tracking-wider uppercase text-espresso-500 block">
                        Shared Moment
                      </span>
                      <span className="font-serif text-base font-medium text-espresso-900 group-hover:text-terracotta transition-colors">
                        {rel.title}
                      </span>
                      <span className="text-xs text-espresso-500 block">
                        {formatMemoryDate(rel.occurredAt)}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-espresso-400 group-hover:translate-x-1 transition-transform shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={() => {
          onDelete?.(memory.id);
          onClose();
        }}
        title="Delete Memory"
        message={`Are you sure you wish to delete "${memory.title}" from your private archive? This action cannot be undone.`}
        confirmLabel="Delete Memory"
        isDestructive={true}
      />
    </>
  );
};
