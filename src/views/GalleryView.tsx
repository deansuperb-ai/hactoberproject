import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Image as ImageIcon,
  Headphones,
  BookOpen,
  Sparkles,
  Plus,
  RefreshCw,
} from "lucide-react";
import type { Memory, MemoryType } from "../types";
import { MemoryCard } from "../components/memory/MemoryCard";
import { TagBadge } from "../components/common/TagBadge";

interface GalleryViewProps {
  memories: Memory[];
  isLoading: boolean;
  error: string | null;
  onRefresh: () => void;
  onSelectMemory: (memory: Memory) => void;
  onPlayAudio: (memory: Memory) => void;
  currentAudioUrl: string | null;
  isPlaying: boolean;
  onOpenAddMemory: () => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({
  memories,
  isLoading,
  error,
  onRefresh,
  onSelectMemory,
  onPlayAudio,
  currentAudioUrl,
  isPlaying,
  onOpenAddMemory,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<"all" | MemoryType>("all");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Extract all unique categories
  const allCategories = useMemo(() => {
    const set = new Set<string>();
    memories.forEach((m) => {
      if (m.category) set.add(m.category);
    });
    return Array.from(set);
  }, [memories]);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    memories.forEach((m) => m.tags?.forEach((t: string) => set.add(t)));
    return Array.from(set);
  }, [memories]);

  // Filter memories
  const filteredMemories = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return memories.filter((m) => {
      // Category filter
      if (selectedCategory !== "all" && m.category !== selectedCategory) {
        return false;
      }

      // Type filter
      if (selectedType !== "all" && m.type !== selectedType) {
        return false;
      }

      // Tag filter
      if (selectedTag && !m.tags?.includes(selectedTag)) {
        return false;
      }

      // Search query
      if (query) {
        const titleMatch = m.title.toLowerCase().includes(query);
        const descMatch = m.description.toLowerCase().includes(query);
        const tagMatch = m.tags?.some((t: string) => t.toLowerCase().includes(query));
        const transcriptMatch = m.transcript?.toLowerCase().includes(query);
        const catMatch = m.category?.toLowerCase().includes(query);
        if (!titleMatch && !descMatch && !tagMatch && !transcriptMatch && !catMatch) {
          return false;
        }
      }

      return true;
    });
  }, [memories, searchQuery, selectedType, selectedTag, selectedCategory]);

  return (
    <div className="space-y-8 py-4 sm:py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title & Introduction */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-parchment-300">
        <div>
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-espresso-500 mb-1.5 block">
            Memory Archive
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-espresso-950 tracking-tight">
            Memories Gallery
          </h1>
          <p className="text-sm sm:text-base text-espresso-600 mt-1 max-w-2xl font-sans">
            Browse through preserved photographs, authentic audio notes, and written letters in your personal collection.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenAddMemory}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-terracotta hover:bg-terracotta-hover text-white text-sm font-medium shadow-warm-sm transition-all transform active:scale-95 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Memory</span>
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-espresso-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, story excerpt, or people..."
              aria-label="Search memories"
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-parchment-300 bg-white text-espresso-900 placeholder:text-espresso-400 focus:bg-white text-sm transition-all shadow-warm-xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-espresso-400 hover:text-espresso-700 p-1"
                aria-label="Clear search"
              >
                Clear
              </button>
            )}
          </div>

          {/* Type Filter Tabs */}
          <div className="inline-flex items-center p-1 rounded-2xl bg-parchment-200/80 border border-parchment-300 shrink-0 overflow-x-auto">
            {[
              { id: "all", label: "All Moments" },
              { id: "photo", label: "Photos", icon: ImageIcon },
              { id: "audio", label: "Audio", icon: Headphones },
              { id: "story", label: "Stories", icon: BookOpen },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = selectedType === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedType(tab.id as "all" | MemoryType)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? "bg-white text-espresso-950 shadow-warm-xs font-semibold"
                      : "text-espresso-600 hover:text-espresso-900"
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Filter Tabs */}
        {allCategories.length > 0 && (
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-parchment-200/80 border border-parchment-300 overflow-x-auto scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-espresso-950 text-parchment-50 shadow-warm-xs"
                  : "text-espresso-700 hover:text-espresso-950"
              }`}
            >
              <span>All Categories ({memories.length})</span>
            </button>
            {allCategories.map((cat) => {
              const count = memories.filter((m) => m.category === cat).length;
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(isSelected ? "all" : cat)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? "bg-terracotta text-white shadow-warm-xs font-semibold"
                      : "text-espresso-700 hover:bg-parchment-300/60"
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] ${isSelected ? "text-white/80" : "text-espresso-400"}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Tag Pills Filter */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-mono text-espresso-500 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" />
              Filter by tag:
            </span>
            {selectedTag && (
              <button
                type="button"
                onClick={() => setSelectedTag(null)}
                className="text-xs font-mono text-terracotta underline mr-1 cursor-pointer"
              >
                Show all tags
              </button>
            )}
            {allTags.map((tag) => (
              <TagBadge
                key={tag}
                label={tag}
                size="sm"
                selected={selectedTag === tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Error state */}
      {error && (
        <div
          role="alert"
          className="p-6 rounded-3xl bg-terracotta-light border border-terracotta-border text-center space-y-3"
        >
          <p className="text-sm font-medium text-terracotta-dark">{error}</p>
          <button
            type="button"
            onClick={onRefresh}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-terracotta text-white text-xs font-medium cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reload archive</span>
          </button>
        </div>
      )}

      {/* Loading state */}
      {isLoading && !error && (
        <div className="py-20 text-center space-y-4">
          <div className="w-10 h-10 border-2 border-terracotta/30 border-t-terracotta rounded-full animate-spin mx-auto" />
          <p className="font-serif italic text-base text-espresso-600">
            Gathering memories from your archive...
          </p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && filteredMemories.length === 0 && (
        <div className="py-20 text-center max-w-md mx-auto space-y-4 rounded-3xl bg-[#FAF7F2] border border-[#E6DDD2] p-8 shadow-warm-xs">
          <div className="w-16 h-16 rounded-full bg-parchment-200 flex items-center justify-center mx-auto text-espresso-400">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-2xl font-medium text-espresso-900">
            No memories match your search
          </h3>
          <p className="text-sm text-espresso-600 font-sans leading-relaxed">
            {searchQuery || selectedTag || selectedType !== "all"
              ? "Try adjusting your search terms or clearing your selected filters to view more archived moments."
              : "Your archive is currently quiet. Preserving your first photograph, voice recording, or story will bring it to life."}
          </p>
          {(searchQuery || selectedTag || selectedType !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedTag(null);
                setSelectedType("all");
              }}
              className="px-4 py-2 rounded-xl bg-espresso-900 text-parchment-50 text-xs font-medium cursor-pointer"
            >
              Reset filters
            </button>
          )}
        </div>
      )}

      {/* Memories Grid */}
      {!isLoading && !error && filteredMemories.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMemories.map((mem) => (
            <MemoryCard
              key={mem.id}
              memory={mem}
              onSelect={onSelectMemory}
              onPlayAudio={onPlayAudio}
              isPlaying={isPlaying && currentAudioUrl === mem.audioUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
};
