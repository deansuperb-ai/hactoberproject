import React from "react";
import {
  Film,
  Play,
  Plus,
  Trash2,
} from "lucide-react";
import type { FlashbackExperience, PersonProfile } from "../types";

interface FlashbacksViewProps {
  activeProfile: PersonProfile;
  flashbacks: FlashbackExperience[];
  onCreateFlashback: () => void;
  onPlayFlashback: (flashback: FlashbackExperience) => void;
  onDeleteFlashback: (id: string) => void;
}

export const FlashbacksView: React.FC<FlashbacksViewProps> = ({
  activeProfile,
  flashbacks,
  onCreateFlashback,
  onPlayFlashback,
  onDeleteFlashback,
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-parchment-200">
        <div>
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-terracotta mb-1 block">
            Memory Experiences • {activeProfile.name}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-espresso-900 font-normal">
            Flashbacks
          </h1>
          <p className="text-xs sm:text-sm text-espresso-600 mt-1 max-w-xl">
            Cinematic memory journeys that unfold vertically down the page, pairing authentic photographs with voice notes.
          </p>
        </div>

        <button
          onClick={onCreateFlashback}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-terracotta hover:bg-terracotta-dark text-white text-xs sm:text-sm font-medium shadow-sm transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create a Flashback</span>
        </button>
      </div>

      {/* Flashbacks Grid */}
      {flashbacks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flashbacks.map((fb) => (
            <div
              key={fb.id}
              className="group p-5 rounded-3xl bg-white border border-parchment-200 hover:border-terracotta/40 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              {/* Cover Photo */}
              <div
                onClick={() => onPlayFlashback(fb)}
                className="relative w-full aspect-16/10 rounded-2xl overflow-hidden bg-espresso-950 cursor-pointer"
              >
                {fb.coverImageUrl ? (
                  <img
                    src={fb.coverImageUrl}
                    alt={fb.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-parchment-400">
                    <Film className="w-8 h-8 text-terracotta" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 group-hover:bg-terracotta group-hover:text-white text-espresso-900 flex items-center justify-center shadow-lg transition-all transform group-hover:scale-110">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Badge */}
                {fb.isDemo && (
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-black/60 backdrop-blur-xs text-parchment-200 font-medium">
                    Demo Experience
                  </span>
                )}

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-parchment-200">
                  <span className="font-mono text-[11px]">{fb.shots.length} shots</span>
                </div>
              </div>

              {/* Title & Captions */}
              <div className="space-y-1.5">
                <h3
                  onClick={() => onPlayFlashback(fb)}
                  className="font-serif text-xl text-espresso-900 font-medium group-hover:text-terracotta transition-colors cursor-pointer"
                >
                  {fb.title}
                </h3>
                {fb.subtitle && (
                  <p className="text-xs text-espresso-600 line-clamp-2 leading-relaxed">
                    {fb.subtitle}
                  </p>
                )}
              </div>

              {/* Footer Actions */}
              <div className="pt-3 border-t border-parchment-100 flex items-center justify-between">
                <button
                  onClick={() => onPlayFlashback(fb)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-terracotta hover:underline cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Begin Vertical Scroll</span>
                </button>

                {!fb.isDemo && (
                  <button
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to delete the flashback "${fb.title}"?`)) {
                        onDeleteFlashback(fb.id);
                      }
                    }}
                    aria-label="Delete flashback"
                    className="p-1.5 rounded-lg text-espresso-400 hover:text-terracotta hover:bg-parchment-100 transition-all cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-14 rounded-3xl bg-white border border-dashed border-parchment-300 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-parchment-100 text-terracotta flex items-center justify-center mx-auto">
            <Film className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-xl text-espresso-900 font-medium">
              No flashbacks created yet
            </h3>
            <p className="text-xs text-espresso-600 max-w-md mx-auto">
              Select memories from {activeProfile.name}'s archive to craft an immersive, vertically unfolding memory journey.
            </p>
          </div>
          <button
            onClick={onCreateFlashback}
            className="px-6 py-2.5 rounded-full bg-terracotta text-white text-xs font-medium hover:bg-terracotta-dark shadow-sm transition-all"
          >
            Create First Flashback
          </button>
        </div>
      )}
    </div>
  );
};
