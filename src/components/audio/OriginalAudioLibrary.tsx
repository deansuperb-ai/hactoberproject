import React, { useState } from "react";
import {
  Mic,
  Play,
  Pause,
  FileText,
  Clock,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import type { Memory } from "../../types";

interface OriginalAudioLibraryProps {
  recordings: Memory[];
  onPlayRecording: (recording: Memory) => void;
  activePlayingUrl: string | null;
  isPlaying: boolean;
  onOpenVoiceSetup: () => void;
}

export const OriginalAudioLibrary: React.FC<OriginalAudioLibraryProps> = ({
  recordings,
  onPlayRecording,
  activePlayingUrl,
  isPlaying,
  onOpenVoiceSetup,
}) => {
  const [expandedTranscriptId, setExpandedTranscriptId] = useState<string | null>(null);

  const audioMemories = recordings.filter(
    (m) => m.type === "audio" || (m.audioUrl && m.audioUrl.length > 0)
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-parchment-100 rounded-2xl border border-parchment-300">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Mic className="w-5 h-5 text-terracotta" />
            <h3 className="font-serif text-lg font-medium text-espresso-900">
              Original Voice Library
            </h3>
            <span className="text-xs font-mono bg-terracotta-light text-terracotta-dark px-2.5 py-0.5 rounded-full">
              {audioMemories.length} Authentic Recordings
            </span>
          </div>
          <p className="text-xs text-espresso-600 font-sans max-w-xl">
            These are authentic voice notes and spoken recollections uploaded directly to this memory space.
            Original audio is strictly preserved and never altered or synthesized.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenVoiceSetup}
          className="px-4 py-2 rounded-xl text-xs font-medium bg-terracotta hover:bg-terracotta-dark text-parchment-50 transition-colors shadow-sm flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Mic className="w-3.5 h-3.5" />
          <span>Preserve Their Voice (3+ Uploads)</span>
        </button>
      </div>

      {/* Recordings List */}
      {audioMemories.length === 0 ? (
        <div className="p-12 text-center bg-parchment-50 rounded-2xl border border-dashed border-parchment-300 space-y-3">
          <Mic className="w-8 h-8 text-parchment-400 mx-auto" />
          <h4 className="font-serif text-base text-espresso-800">No original recordings saved yet</h4>
          <p className="text-xs text-espresso-500 font-sans max-w-md mx-auto">
            Upload voice notes, voicemails, or conversations to preserve their authentic voice.
          </p>
          <button
            type="button"
            onClick={onOpenVoiceSetup}
            className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium bg-parchment-200 hover:bg-parchment-300 text-espresso-800 transition-colors cursor-pointer"
          >
            <span>Start Voice Setup Flow</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {audioMemories.map((rec) => {
            const isCurrentlyPlaying = isPlaying && activePlayingUrl === rec.audioUrl;
            const hasTranscript = Boolean(rec.transcript && rec.transcript.trim().length > 0);
            const isTranscriptExpanded = expandedTranscriptId === rec.id;

            return (
              <div
                key={rec.id}
                className="p-5 rounded-2xl bg-parchment-50 border border-parchment-300 hover:border-parchment-400 transition-all shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-terracotta-dark bg-terracotta-light/60 px-2 py-0.5 rounded-md">
                        <ShieldCheck className="w-3 h-3 text-terracotta" />
                        Original recording
                      </span>
                      <h4 className="font-serif text-base font-medium text-espresso-900 leading-snug">
                        {rec.title}
                      </h4>
                    </div>

                    <button
                      type="button"
                      onClick={() => onPlayRecording(rec)}
                      className={`p-3 rounded-full transition-all cursor-pointer shadow-sm ${
                        isCurrentlyPlaying
                          ? "bg-terracotta text-parchment-50 scale-105"
                          : "bg-parchment-200 hover:bg-terracotta hover:text-parchment-50 text-espresso-800"
                      }`}
                      aria-label={isCurrentlyPlaying ? "Pause recording" : "Play recording"}
                    >
                      {isCurrentlyPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4 ml-0.5" />
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-espresso-600 line-clamp-2 font-sans leading-relaxed">
                    {rec.description}
                  </p>
                </div>

                {/* Metadata & Transcript Expansion */}
                <div className="pt-3 border-t border-parchment-200/80 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-espresso-500 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-espresso-400" />
                      {rec.occurredAt || "Date unrecorded"}
                    </span>
                    {hasTranscript && (
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedTranscriptId(isTranscriptExpanded ? null : rec.id)
                        }
                        className="flex items-center gap-1 text-terracotta hover:text-terracotta-dark transition-colors cursor-pointer font-sans"
                      >
                        <FileText className="w-3 h-3" />
                        <span>{isTranscriptExpanded ? "Hide words" : "Read words"}</span>
                        {isTranscriptExpanded ? (
                          <ChevronUp className="w-3 h-3" />
                        ) : (
                          <ChevronDown className="w-3 h-3" />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Transcript drawer */}
                  {hasTranscript && isTranscriptExpanded && (
                    <div className="p-3 bg-parchment-100/90 rounded-xl border border-parchment-200 text-xs font-serif text-espresso-800 italic leading-relaxed animate-fadeIn">
                      “{rec.transcript}”
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
