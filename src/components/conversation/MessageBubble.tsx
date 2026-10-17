import React from "react";
import {
  Sparkles,
  Quote,
  ExternalLink,
} from "lucide-react";
import type { ConversationMessage } from "../../types";
import { AudioPlayer } from "../common/AudioPlayer";

interface MessageBubbleProps {
  message: ConversationMessage;
  onSelectMemory?: (memoryId: string) => void;
  // Audio state
  currentAudioUrl: string | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playbackRate: number;
  volume: number;
  isMuted: boolean;
  onTogglePlay: (url: string, title: string, kind?: "original" | "generated_narration") => void;
  onSeek: (seconds: number) => void;
  onChangeSpeed: (rate: number) => void;
  onSetVolume: (vol: number) => void;
  onToggleMute: () => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  onSelectMemory,
  currentAudioUrl,
  isPlaying,
  currentTime,
  duration,
  playbackRate,
  volume,
  isMuted,
  onTogglePlay,
  onSeek,
  onChangeSpeed,
  onSetVolume,
  onToggleMute,
}) => {
  const isUser = message.role === "user";
  const formattedTime = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const isAudioActive = currentAudioUrl === message.audioUrl;

  if (isUser) {
    return (
      <div className="flex justify-end mb-6">
        <div className="max-w-2xl flex flex-col items-end">
          <div className="bg-espresso-900 text-parchment-50 px-5 py-4 rounded-3xl rounded-br-md shadow-warm-sm">
            <p className="text-base font-sans leading-relaxed whitespace-pre-wrap">
              {message.text}
            </p>
          </div>
          <span className="text-[11px] font-mono text-espresso-400 mt-1.5 px-2">
            {formattedTime}
          </span>
        </div>
      </div>
    );
  }

  // Assistant Response with 3 Distinct Content Types
  return (
    <div className="flex justify-start mb-8">
      <div className="max-w-3xl w-full flex flex-col items-start">
        {/* Assistant Card Shell */}
        <div className="w-full bg-[#FAF7F2] border border-[#E6DDD2] rounded-3xl rounded-tl-md p-6 sm:p-7 shadow-warm-sm space-y-5">
          {/* Top Identifier & AI Disclosure Badge */}
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-parchment-300">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brass/20 text-brass-dark flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5" />
              </span>
              <span className="font-serif font-medium text-espresso-900 text-sm">
                Memory Space Reflection
              </span>
            </div>

            <span className="text-[11px] font-mono text-espresso-500 bg-parchment-200 px-2.5 py-0.5 rounded-full border border-parchment-300">
              AI-Assisted Synthesis
            </span>
          </div>

          {/* Distinction 1: Words from your archive (Exact Quotes) */}
          {message.sources && message.sources.length > 0 && (
            <div className="space-y-3">
              {message.sources.map((source, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl p-4 sm:p-5 bg-white border border-[#E2D8C7] shadow-warm-xs"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-terracotta">
                      <Quote className="w-3.5 h-3.5" />
                      <span>Words From Your Archive</span>
                    </span>

                    {onSelectMemory && (
                      <button
                        type="button"
                        onClick={() => onSelectMemory(source.memoryId)}
                        className="inline-flex items-center gap-1 text-xs font-medium text-espresso-600 hover:text-terracotta transition-colors cursor-pointer"
                      >
                        <span>View Memory</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  {source.excerpt && (
                    <p className="font-serif italic text-base sm:text-lg text-espresso-900 leading-relaxed mb-2">
                      "{source.excerpt}"
                    </p>
                  )}

                  <div className="text-xs font-mono text-espresso-500">
                    Source: <strong className="font-semibold text-espresso-800">{source.memoryTitle}</strong> ({source.sourceType})
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Distinction 2: AI-Generated Reflection */}
          <div className="rounded-2xl p-4 sm:p-5 bg-parchment-100/70 border border-parchment-300">
            <div className="flex items-center gap-2 mb-2 text-xs font-mono font-semibold uppercase tracking-wider text-brass-dark">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI-Generated Reflection</span>
            </div>
            <div className="prose prose-stone text-base text-espresso-800 leading-relaxed font-sans whitespace-pre-wrap">
              {message.text}
            </div>
          </div>

          {/* Distinction 3: Original Recording or Narration Audio Player */}
          {message.audioUrl && (
            <div className="pt-2">
              <AudioPlayer
                url={message.audioUrl}
                title={
                  message.audioKind === "original"
                    ? "Authentic Recording from Archive"
                    : "Spoken Narration of Reflection"
                }
                sourceLabel={
                  message.audioKind === "original"
                    ? "Authentic Saved Audio"
                    : "Generated Spoken Reflection"
                }
                kind={message.audioKind === "original" ? "original" : "generated_narration"}
                isPlaying={isAudioActive && isPlaying}
                currentTime={isAudioActive ? currentTime : 0}
                duration={isAudioActive ? duration : 0}
                playbackRate={playbackRate}
                volume={volume}
                isMuted={isMuted}
                onTogglePlay={() =>
                  onTogglePlay(
                    message.audioUrl!,
                    "Reflection Audio",
                    message.audioKind
                  )
                }
                onSeek={onSeek}
                onChangeSpeed={onChangeSpeed}
                onSetVolume={onSetVolume}
                onToggleMute={onToggleMute}
                compact={true}
              />
            </div>
          )}
        </div>

        <span className="text-[11px] font-mono text-espresso-400 mt-1.5 px-2">
          {formattedTime}
        </span>
      </div>
    </div>
  );
};
