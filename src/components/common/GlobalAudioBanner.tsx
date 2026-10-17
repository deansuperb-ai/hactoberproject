import React from "react";
import {
  Play,
  Pause,
  X,
  Disc3,
  Volume2,
  VolumeX,
} from "lucide-react";
import { formatDuration } from "../../utils/formatDate";
import type { AudioTrackInfo } from "../../hooks/useAudioPlayer";

interface GlobalAudioBannerProps {
  currentTrack: AudioTrackInfo | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  onTogglePlay: () => void;
  onSeek: (seconds: number) => void;
  onToggleMute: () => void;
  onClose: () => void;
}

export const GlobalAudioBanner: React.FC<GlobalAudioBannerProps> = ({
  currentTrack,
  isPlaying,
  currentTime,
  duration,
  volume,
  isMuted,
  onTogglePlay,
  onSeek,
  onToggleMute,
  onClose,
}) => {
  if (!currentTrack) return null;

  const isOriginal = currentTrack.kind !== "generated_narration";

  return (
    <div
      role="region"
      aria-label="Continuous audio playback bar"
      className="fixed bottom-0 inset-x-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#E2D8C7] shadow-album py-3 px-4 sm:px-6 transition-all animate-in slide-in-from-bottom-4 duration-300"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Track Info */}
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
              isOriginal
                ? "bg-terracotta-light text-terracotta"
                : "bg-brass/20 text-brass-dark"
            }`}
          >
            <Disc3
              className={`w-5 h-5 ${isPlaying ? "animate-spin-slow" : ""}`}
            />
          </div>

          <div className="truncate">
            <h5 className="font-serif text-sm sm:text-base font-medium text-espresso-900 truncate">
              {currentTrack.title}
            </h5>
            <span className="text-[11px] font-mono text-espresso-500 block truncate">
              {currentTrack.sourceLabel || (isOriginal ? "Original Archive Recording" : "Spoken Narration")}
            </span>
          </div>
        </div>

        {/* Playback Controls & Scrubber */}
        <div className="flex-1 max-w-xl flex items-center gap-3">
          <button
            type="button"
            onClick={onTogglePlay}
            aria-label={isPlaying ? "Pause audio" : "Play audio"}
            className="w-9 h-9 rounded-full bg-espresso-900 hover:bg-espresso-950 text-white flex items-center justify-center shrink-0 shadow-warm-xs transition-transform active:scale-95 cursor-pointer"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current ml-0.5" />
            )}
          </button>

          <span className="font-mono text-xs text-espresso-700 w-10 text-right shrink-0">
            {formatDuration(currentTime)}
          </span>

          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={(e) => onSeek(parseFloat(e.target.value))}
            aria-label="Audio scrubber"
            className="flex-1 accent-terracotta h-1.5 bg-parchment-300 rounded-lg cursor-pointer"
          />

          <span className="font-mono text-xs text-espresso-500 w-10 shrink-0">
            {formatDuration(duration)}
          </span>
        </div>

        {/* Right Actions: Mute & Dismiss */}
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <button
            type="button"
            onClick={onToggleMute}
            aria-label={isMuted ? "Unmute" : "Mute"}
            title={`Volume: ${Math.round(volume * 100)}%`}
            className="p-2 rounded-xl text-espresso-600 hover:text-espresso-900 hover:bg-parchment-200 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-terracotta" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close audio player"
            className="p-2 rounded-xl text-espresso-500 hover:text-espresso-900 hover:bg-parchment-200 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
