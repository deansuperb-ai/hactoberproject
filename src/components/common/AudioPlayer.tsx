import React, { useState } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Disc3,
  Sparkles,
} from "lucide-react";
import { formatDuration } from "../../utils/formatDate";
import { generateWaveformBars } from "../../utils/audioWaveform";

interface AudioPlayerProps {
  url: string;
  title: string;
  sourceLabel?: string;
  kind?: "original" | "generated_narration" | "memory";
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playbackRate?: number;
  volume?: number;
  isMuted?: boolean;
  onTogglePlay: () => void;
  onSeek: (seconds: number) => void;
  onChangeSpeed?: (rate: number) => void;
  onSetVolume?: (vol: number) => void;
  onToggleMute?: () => void;
  compact?: boolean;
  className?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  url,
  title,
  sourceLabel = "Personal Memory Archive Recording",
  kind = "original",
  isPlaying,
  currentTime,
  duration,
  playbackRate = 1,
  volume = 0.9,
  isMuted = false,
  onTogglePlay,
  onSeek,
  onChangeSpeed,
  onSetVolume,
  onToggleMute,
  compact = false,
  className = "",
}) => {
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const waveformBars = generateWaveformBars(title + url, compact ? 24 : 36);
  const progressRatio = duration > 0 ? Math.min(1, currentTime / duration) : 0;

  const isOriginal = kind === "original";

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 ${
        isOriginal
          ? "bg-[#FDFBF7] border-[#E8DFC8] shadow-warm-sm"
          : "bg-[#F7F4EF] border-[#E2D8C7] shadow-warm-xs"
      } ${compact ? "p-3 sm:p-4" : "p-4 sm:p-6"} ${className}`}
      role="region"
      aria-label={`Audio player for ${title}`}
    >
      {/* Top Header Label */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          {isOriginal ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide bg-terracotta/10 text-terracotta border border-terracotta/20">
              <Disc3
                className={`w-3.5 h-3.5 text-terracotta ${
                  isPlaying ? "animate-spin-slow" : ""
                }`}
                aria-hidden="true"
              />
              <span>Original Archive Recording</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide bg-brass/10 text-brass-dark border border-brass/25">
              <Sparkles className="w-3.5 h-3.5 text-brass-dark" aria-hidden="true" />
              <span>AI-Generated Spoken Narration</span>
            </span>
          )}
        </div>

        {sourceLabel && (
          <span className="text-[11px] font-mono text-espresso-500 tracking-tight truncate max-w-[200px]">
            {sourceLabel}
          </span>
        )}
      </div>

      {/* Track Title */}
      {!compact && (
        <h4 className="font-serif text-lg font-medium text-espresso-900 mb-3 truncate">
          {title}
        </h4>
      )}

      {/* Analogue Waveform Visualizer & Interactive Scrubbing */}
      <div className="relative mb-3 group">
        <div
          className="flex items-center justify-between gap-1 h-10 px-2 py-1 bg-parchment-200/50 rounded-lg border border-parchment-300/60 overflow-hidden cursor-pointer"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickPos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            onSeek(clickPos * (duration || 0));
          }}
          title="Click to seek"
        >
          {waveformBars.map((height, idx) => {
            const barRatio = idx / waveformBars.length;
            const isPlayed = barRatio <= progressRatio;
            return (
              <div
                key={idx}
                className={`w-1 rounded-full transition-all duration-150 ${
                  isPlayed
                    ? isOriginal
                      ? "bg-terracotta shadow-xs"
                      : "bg-brass shadow-xs"
                    : "bg-espresso-300/40"
                } ${isPlaying && isPlayed ? "opacity-100" : "opacity-80"}`}
                style={{ height: `${height}%` }}
              />
            );
          })}
        </div>

        {/* Accessible range slider on top */}
        <input
          type="range"
          min="0"
          max={duration || 100}
          value={currentTime}
          onChange={(e) => onSeek(parseFloat(e.target.value))}
          aria-label={`Playback position for ${title}`}
          aria-valuemin={0}
          aria-valuemax={duration || 100}
          aria-valuenow={currentTime}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      {/* Audio Controls Row */}
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Play/Pause and Restart */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onTogglePlay}
            aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all shadow-warm-sm active:scale-95 ${
              isOriginal
                ? "bg-terracotta hover:bg-terracotta-hover text-white focus-visible:ring-terracotta"
                : "bg-espresso-800 hover:bg-espresso-900 text-parchment-100 focus-visible:ring-espresso-800"
            }`}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>

          <button
            type="button"
            onClick={() => onSeek(0)}
            aria-label="Restart recording"
            className="w-8 h-8 rounded-full flex items-center justify-center text-espresso-600 hover:text-espresso-900 hover:bg-parchment-200/80 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Middle: Numerical Time Indicators (Accessible, no waveform dependency) */}
        <div className="font-mono text-xs sm:text-sm text-espresso-700 tracking-wider">
          <span className="font-semibold text-espresso-900">
            {formatDuration(currentTime)}
          </span>
          <span className="text-espresso-400 mx-1">/</span>
          <span>{formatDuration(duration)}</span>
        </div>

        {/* Right: Speed & Volume Controls */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {onChangeSpeed && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                aria-label={`Playback speed: ${playbackRate}x`}
                className="px-2 py-1 text-xs font-mono font-medium rounded-md bg-parchment-200 text-espresso-700 hover:bg-parchment-300 transition-colors border border-parchment-300"
              >
                {playbackRate}x
              </button>

              {showSpeedMenu && (
                <div className="absolute right-0 bottom-full mb-2 bg-white rounded-lg shadow-warm-md border border-parchment-300 py-1 z-20 flex flex-col min-w-[70px]">
                  {[0.75, 1, 1.25, 1.5].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => {
                        onChangeSpeed(rate);
                        setShowSpeedMenu(false);
                      }}
                      className={`px-3 py-1 text-xs text-left font-mono hover:bg-parchment-100 transition-colors ${
                        playbackRate === rate
                          ? "font-bold text-terracotta bg-terracotta-light/40"
                          : "text-espresso-800"
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {onToggleMute && (
            <button
              type="button"
              onClick={onToggleMute}
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              className="w-8 h-8 rounded-full flex items-center justify-center text-espresso-600 hover:text-espresso-900 hover:bg-parchment-200/80 transition-colors"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-terracotta" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
          )}

          {onSetVolume && !compact && (
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => onSetVolume(parseFloat(e.target.value))}
              aria-label="Volume level"
              className="w-14 sm:w-18 accent-terracotta cursor-pointer hidden md:block"
            />
          )}
        </div>
      </div>
    </div>
  );
};
