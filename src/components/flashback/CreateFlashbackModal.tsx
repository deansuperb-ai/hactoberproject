import React, { useState, useEffect } from "react";
import {
  Check,
  Film,
  AlertCircle,
  Loader2,
} from "lucide-react";
import type {
  Memory,
  FlashbackExperience,
  FlashbackShot,
  PersonProfile,
} from "../../types";
import { Modal } from "../common/Modal";
import { createFlashback } from "../../services/stillHereApi";

interface CreateFlashbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeProfile: PersonProfile;
  memories: Memory[];
  onFlashbackCreated: (flashback: FlashbackExperience) => void;
  onPlayFlashbackNow: (flashback: FlashbackExperience) => void;
}

export const CreateFlashbackModal: React.FC<CreateFlashbackModalProps> = ({
  isOpen,
  onClose,
  activeProfile,
  memories,
  onFlashbackCreated,
  onPlayFlashbackNow,
}) => {
  const [selectedMemoryIds, setSelectedMemoryIds] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Pre-select memories with images or audio
      const defaultSelected = memories
        .filter((m) => m.imageUrl || m.audioUrl)
        .slice(0, 4)
        .map((m) => m.id);
      setSelectedMemoryIds(defaultSelected.length > 0 ? defaultSelected : memories.slice(0, 3).map((m) => m.id));
      setTitle(`Moments with ${activeProfile.name}`);
      setSubtitle("A gentle journey through preserved photographs and authentic voices.");
      setErrorMessage(null);
    }
  }, [isOpen, memories, activeProfile.name]);

  const toggleMemorySelection = (id: string) => {
    setSelectedMemoryIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleCreate = async (playImmediately: boolean) => {
    if (!title.trim()) {
      setErrorMessage("Please give this flashback a title.");
      return;
    }
    if (selectedMemoryIds.length === 0) {
      setErrorMessage("Please select at least one memory to include in the flashback.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const selectedMemories = memories.filter((m) => selectedMemoryIds.includes(m.id));

      const shots: FlashbackShot[] = selectedMemories.map((m, idx) => ({
        id: `shot-${idx + 1}-${m.id}`,
        shotNumber: idx + 1,
        title: m.title,
        caption: m.description,
        imageUrl: m.imageUrl,
        audioUrl: m.audioUrl,
        occurredAt: m.occurredAt || "Date unknown",
        visualKind: m.visualKind || "original",
        reflectionText: m.transcript ? `Authentic note: "${m.transcript.slice(0, 100)}..."` : undefined,
      }));

      const newFlashback = await createFlashback({
        profileId: activeProfile.id,
        title: title.trim(),
        subtitle: subtitle.trim() || undefined,
        coverImageUrl: selectedMemories[0]?.imageUrl || activeProfile.portraitUrl,
        openingHeading: "A memory to revisit",
        openingCaption: subtitle.trim() || `Memories preserved for ${activeProfile.name}`,
        shots,
        closingText: "Keep these moments close. They remain a part of who you are.",
        isDemo: activeProfile.isDemo,
      });

      onFlashbackCreated(newFlashback);

      if (playImmediately) {
        onPlayFlashbackNow(newFlashback);
      }
      onClose();
    } catch (err: unknown) {
      console.error("Create flashback error:", err);
      setErrorMessage(err instanceof Error ? err.message : "Failed to create flashback.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create a Cinematic Flashback"
      maxWidth="xl"
    >
      <div className="space-y-6 py-2">
        <p className="text-xs sm:text-sm text-espresso-600 leading-relaxed font-serif">
          Craft a vertical, scrolling memory film that pairs your selected photographs, stories, and voice recordings for {activeProfile.name}.
        </p>

        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-terracotta-light/30 border border-terracotta/40 flex items-start gap-2.5 text-xs text-terracotta-dark">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Title & Subtitle */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-espresso-800 uppercase tracking-wider">
              Flashback Title <span className="text-terracotta">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Sunday Mornings, Summer at the Lake"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-parchment-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta/40 text-espresso-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-espresso-800 uppercase tracking-wider">
              Opening Caption / Subtitle
            </label>
            <input
              type="text"
              placeholder="A brief guiding sentence before the memory film unfolds"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-parchment-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta/40 text-espresso-900"
            />
          </div>
        </div>

        {/* Memory Selection List */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-espresso-800 uppercase tracking-wider">
              Select Memories to Include ({selectedMemoryIds.length} of {memories.length} selected)
            </label>
            <button
              type="button"
              onClick={() => {
                if (selectedMemoryIds.length === memories.length) {
                  setSelectedMemoryIds([]);
                } else {
                  setSelectedMemoryIds(memories.map((m) => m.id));
                }
              }}
              className="text-xs text-terracotta hover:underline font-medium"
            >
              {selectedMemoryIds.length === memories.length ? "Deselect All" : "Select All"}
            </button>
          </div>

          <div className="max-h-60 overflow-y-auto space-y-2 p-1 custom-scrollbar">
            {memories.map((mem) => {
              const isSelected = selectedMemoryIds.includes(mem.id);
              return (
                <div
                  key={mem.id}
                  onClick={() => toggleMemorySelection(mem.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "border-terracotta bg-terracotta/5 shadow-xs"
                      : "border-parchment-200 bg-white hover:border-parchment-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all ${
                      isSelected
                        ? "bg-terracotta text-white"
                        : "border border-espresso-300 bg-white"
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </div>

                  {mem.imageUrl && (
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-parchment-200 shrink-0">
                      <img src={mem.imageUrl} alt={mem.title} className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-medium text-espresso-900 truncate font-serif">
                      {mem.title}
                    </h4>
                    <p className="text-[11px] text-espresso-500 truncate">{mem.description}</p>
                    <span className="text-[10px] font-mono text-espresso-400">
                      {mem.occurredAt || "Date unknown"} • {mem.type}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-parchment-200 flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-espresso-600 hover:text-espresso-900"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={isSubmitting || selectedMemoryIds.length === 0}
            onClick={() => handleCreate(false)}
            className="px-5 py-2.5 rounded-full border border-parchment-300 bg-white hover:bg-parchment-100 text-espresso-900 text-xs font-medium transition-all disabled:opacity-50"
          >
            Save Flashback
          </button>

          <button
            type="button"
            disabled={isSubmitting || selectedMemoryIds.length === 0}
            onClick={() => handleCreate(true)}
            className="px-6 py-2.5 rounded-full bg-terracotta hover:bg-terracotta-dark text-white text-xs font-medium shadow-sm transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Crafting Flashback...</span>
              </>
            ) : (
              <>
                <Film className="w-4 h-4" />
                <span>Save & Begin Scrolling</span>
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};
