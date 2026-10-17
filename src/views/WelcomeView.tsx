import React from "react";
import {
  Sparkles,
  Disc3,
  Heart,
  Shield,
  ArrowRight,
  Headphones,
  Plus,
} from "lucide-react";
import type { AppView, Memory } from "../types";
import { formatMemoryDate } from "../utils/formatDate";

interface WelcomeViewProps {
  onNavigate: (view: AppView) => void;
  onOpenAddMemory: () => void;
  featuredMemories: Memory[];
  onSelectMemory: (memory: Memory) => void;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({
  onNavigate,
  onOpenAddMemory,
  featuredMemories,
  onSelectMemory,
}) => {
  const previewMemory = featuredMemories[0];

  return (
    <div className="space-y-16 py-6 sm:py-12">
      {/* Hero Section */}
      <section className="relative text-center max-w-4xl mx-auto px-4">
        {/* Subtle decorative emblem */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-parchment-200/90 border border-parchment-300 text-xs font-mono text-espresso-700 tracking-wider uppercase mb-8">
          <Heart className="w-3.5 h-3.5 text-terracotta fill-terracotta" />
          <span>A Private Memory Sanctuary</span>
        </div>

        {/* Wordmark & Emotional Tagline */}
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal text-espresso-950 tracking-tight leading-[1.1] mb-6">
          Keep the moments that <span className="italic font-normal">keep you close.</span>
        </h1>

        <p className="text-lg sm:text-xl text-espresso-700 max-w-2xl mx-auto leading-relaxed mb-10 font-sans">
          STILL HERE is a calm, private space to preserve original voice recordings,
          photographs, and written stories—with gentle AI-assisted reflections grounded
          deeply in your authentic memories.
        </p>

        {/* Primary & Secondary Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-espresso-900 hover:bg-espresso-950 text-parchment-50 font-medium text-base shadow-warm-md hover:shadow-warm-lg transition-all transform active:scale-95 flex items-center justify-center gap-3 cursor-pointer"
          >
            <span>Open your memory space</span>
            <ArrowRight className="w-4 h-4 text-terracotta-light" />
          </button>

          <button
            type="button"
            onClick={() => onNavigate("gallery")}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-parchment-100 text-espresso-800 border border-parchment-300 font-medium text-base shadow-warm-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Explore the experience</span>
          </button>

          <button
            type="button"
            onClick={onOpenAddMemory}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-parchment-200 hover:bg-parchment-300 text-espresso-800 border border-parchment-300 font-medium text-base transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-terracotta" />
            <span>Add a memory</span>
          </button>
        </div>

        {/* AI Transparency Notice */}
        <div className="mt-8 inline-flex items-center gap-2 text-xs font-mono text-espresso-500">
          <Sparkles className="w-3.5 h-3.5 text-brass" />
          <span>Conversations and generated reflections are thoughtfully AI-assisted, never replacing original voices.</span>
        </div>
      </section>

      {/* Tasteful Visual Preview Section (Fictional Demo Content) */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="rounded-3xl bg-[#FAF7F2] border border-[#E6DDD2] p-6 sm:p-10 shadow-album relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Editorial Album Preview Card */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-terracotta">
                <Disc3 className="w-4 h-4 text-terracotta animate-spin-slow" />
                <span>Featured Memory Preview</span>
              </div>

              {previewMemory && (
                <div
                  onClick={() => onSelectMemory(previewMemory)}
                  className="rounded-2xl bg-white border border-parchment-300 p-5 shadow-warm-sm group cursor-pointer hover:border-terracotta/50 transition-all"
                >
                  <div className="aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-espresso-950 relative">
                    {previewMemory.imageUrl ? (
                      <img
                        src={previewMemory.imageUrl}
                        alt={previewMemory.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-espresso-900 text-parchment-100">
                        <Disc3 className="w-12 h-12 text-terracotta" />
                      </div>
                    )}
                    <span className="absolute bottom-3 left-3 bg-espresso-950/80 backdrop-blur-sm text-parchment-100 px-2.5 py-1 rounded-full text-xs font-mono">
                      {formatMemoryDate(previewMemory.occurredAt)}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-medium text-espresso-900 mb-2 group-hover:text-terracotta transition-colors">
                    {previewMemory.title}
                  </h3>
                  <p className="text-sm text-espresso-600 line-clamp-2 leading-relaxed">
                    {previewMemory.description}
                  </p>
                </div>
              )}
            </div>

            {/* Right: Analogue & Reflection Excerpt */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-2xl bg-white border border-parchment-300 shadow-warm-xs">
                <span className="text-[11px] font-mono uppercase tracking-wider text-terracotta block mb-2 font-semibold">
                  1. Authentic Saved Voice
                </span>
                <p className="font-serif italic text-base text-espresso-900 leading-relaxed">
                  "Listen to those thrushes out there. You won't hear that kind of quiet in the city. Two mugs, cold morning air, warm hands."
                </p>
                <span className="text-xs font-mono text-espresso-500 block mt-2">
                  Arthur • June 14, 1988 (Reel Recording)
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-parchment-100 border border-parchment-300 shadow-warm-xs">
                <span className="text-[11px] font-mono uppercase tracking-wider text-brass-dark block mb-2 font-semibold">
                  2. Grounded Reflection
                </span>
                <p className="text-sm text-espresso-700 leading-relaxed font-sans">
                  "When you revisit this quiet morning, the memory preserves how small rituals like sharing coffee in the mist can anchor a lifetime of affection."
                </p>
                <span className="text-xs font-mono text-espresso-500 block mt-2">
                  STILL HERE Reflection Assistant
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-espresso-950 mb-3">
            Designed for what matters most.
          </h2>
          <p className="text-sm sm:text-base text-espresso-600">
            A quiet sanctuary built with tactile warmth, reverence for original voices, and strict privacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-white border border-parchment-300 shadow-warm-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-terracotta-light flex items-center justify-center text-terracotta">
              <Headphones className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-medium text-espresso-900">
              Authentic Recordings
            </h3>
            <p className="text-sm text-espresso-600 leading-relaxed">
              Listen to the actual cadence, laughter, and sighs in original audio notes. Authentic recordings are never replaced or synthesized without consent.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-parchment-300 shadow-warm-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-brass/15 flex items-center justify-center text-brass-dark">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-medium text-espresso-900">
              Grounded Reflections
            </h3>
            <p className="text-sm text-espresso-600 leading-relaxed">
              Ask questions about your archive and receive answers strictly anchored in your saved memories, with direct links back to original words.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-parchment-300 shadow-warm-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-olive-light flex items-center justify-center text-olive">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-medium text-espresso-900">
              Private & Respected
            </h3>
            <p className="text-sm text-espresso-600 leading-relaxed">
              Your personal memories belong only to you. No tracking, no public exposure, and transparent control over your archive data.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
