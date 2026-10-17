import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Upload,
  Image as ImageIcon,
  Headphones,
  BookOpen,
  AlertCircle,
  CheckCircle2,
  X,
  FileAudio,
} from "lucide-react";
import type { Memory, MemoryType } from "../../types";
import { Modal } from "../common/Modal";

interface AddMemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (memoryData: Omit<Memory, "id"> & { id?: string }) => Promise<void>;
  existingMemories: Memory[];
  editingMemory?: Memory | null;
  activeProfileId?: string;
}

const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
const MAX_AUDIO_SIZE_BYTES = 25 * 1024 * 1024; // 25MB

export const AddMemoryModal: React.FC<AddMemoryModalProps> = ({
  isOpen,
  onClose,
  onSave,
  existingMemories,
  editingMemory,
  activeProfileId,
}) => {
  const [type, setType] = useState<MemoryType>("photo");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [sourceLabel, setSourceLabel] = useState("");
  const [transcript, setTranscript] = useState("");
  const [relatedMemoryId, setRelatedMemoryId] = useState("");

  // Media preview states
  const [imageUrl, setImageUrl] = useState<string>("");
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [imageFileName, setImageFileName] = useState<string>("");
  const [audioFileName, setAudioFileName] = useState<string>("");

  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  const resetForm = useCallback(() => {
    setType("photo");
    setTitle("");
    setDate("");
    setDescription("");
    setTagsInput("");
    setSourceLabel("");
    setTranscript("");
    setRelatedMemoryId("");
    setImageUrl("");
    setAudioUrl("");
    setImageFileName("");
    setAudioFileName("");
    setValidationError(null);
    setIsSubmitting(false);
    setSubmitSuccess(false);
  }, []);

  // Sync when editing
  useEffect(() => {
    if (editingMemory) {
      setType(editingMemory.type);
      setTitle(editingMemory.title);
      setDate(editingMemory.occurredAt || "");
      setDescription(editingMemory.description);
      setTagsInput(editingMemory.tags.join(", "));
      setSourceLabel(editingMemory.sourceLabel || "");
      setTranscript(editingMemory.transcript || "");
      setRelatedMemoryId(editingMemory.relatedMemoryId || "");
      setImageUrl(editingMemory.imageUrl || "");
      setAudioUrl(editingMemory.audioUrl || "");
      setImageFileName(editingMemory.imageUrl ? "Current photo" : "");
      setAudioFileName(editingMemory.audioUrl ? "Current audio" : "");
    } else {
      resetForm();
    }
  }, [editingMemory, isOpen, resetForm]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidationError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setValidationError("Invalid file type. Please upload a valid image (JPEG, PNG, WebP).");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      setValidationError("Image file size exceeds 10MB limit.");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setImageUrl(objectUrl);
    setImageFileName(file.name);
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidationError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("audio/") && !file.name.match(/\.(mp3|wav|m4a|ogg|aac)$/i)) {
      setValidationError("Invalid audio file. Please upload an MP3, WAV, M4A, or OGG file.");
      return;
    }

    if (file.size > MAX_AUDIO_SIZE_BYTES) {
      setValidationError("Audio file size exceeds 25MB limit.");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setAudioUrl(objectUrl);
    setAudioFileName(file.name);
    if (!sourceLabel) {
      setSourceLabel(`Voice Recording (${file.name})`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!title.trim()) {
      setValidationError("Please give this memory a meaningful title.");
      return;
    }

    if (!description.trim()) {
      setValidationError("Please write a short description or story for this memory.");
      return;
    }

    const tags = tagsInput
      .split(/[,#]/)
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const memoryPayload: Omit<Memory, "id"> & { id?: string } = {
      id: editingMemory?.id,
      profileId: editingMemory?.profileId || activeProfileId || "profile-eleanor-demo",
      title: title.trim(),
      description: description.trim(),
      occurredAt: date.trim() ? date.trim() : null,
      type,
      tags,
      imageUrl: imageUrl || undefined,
      audioUrl: audioUrl || undefined,
      transcript: transcript.trim() || undefined,
      sourceLabel: sourceLabel.trim() || undefined,
      relatedMemoryId: relatedMemoryId || undefined,
    };

    setIsSubmitting(true);
    try {
      await onSave(memoryPayload);
      setSubmitSuccess(true);
      setTimeout(() => {
        onClose();
        resetForm();
      }, 700);
    } catch (err: unknown) {
      console.error("Save memory error:", err);
      setValidationError("Failed to save memory to archive. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingMemory ? "Edit Archive Memory" : "Preserve a New Memory"}
      description="Add authentic recordings, photographs, or written reflections to your private archive."
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error notification */}
        {validationError && (
          <div
            role="alert"
            className="flex items-center gap-3 p-3.5 rounded-2xl bg-terracotta-light text-terracotta-dark border border-terracotta-border text-sm"
          >
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Success notification */}
        {submitSuccess && (
          <div
            role="alert"
            className="flex items-center gap-3 p-3.5 rounded-2xl bg-olive-light text-olive-dark border border-olive-border text-sm font-medium"
          >
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>Memory preserved safely in your private archive.</span>
          </div>
        )}

        {/* Memory Type Selection Tabs */}
        <div>
          <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-espresso-600 mb-2">
            Memory Type
          </label>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {[
              { id: "photo", label: "Photograph", icon: ImageIcon },
              { id: "audio", label: "Voice Recording", icon: Headphones },
              { id: "story", label: "Written Story", icon: BookOpen },
            ].map((t) => {
              const Icon = t.icon;
              const isSelected = type === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setType(t.id as MemoryType)}
                  className={`flex flex-col sm:flex-row items-center justify-center gap-2 p-3 rounded-2xl border text-sm font-medium transition-all cursor-pointer ${
                    isSelected
                      ? "bg-espresso-900 text-parchment-50 border-espresso-900 shadow-warm-xs"
                      : "bg-white text-espresso-700 border-parchment-300 hover:bg-parchment-100"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? "text-terracotta-light" : "text-espresso-500"}`} />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Title and Date Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label
              htmlFor="memory-title"
              className="block text-xs font-mono font-semibold uppercase tracking-wider text-espresso-600 mb-1.5"
            >
              Title <span className="text-terracotta">*</span>
            </label>
            <input
              id="memory-title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Sunrise on the Cedar Porch"
              className="w-full px-4 py-2.5 rounded-xl border border-parchment-300 bg-white text-espresso-900 placeholder:text-espresso-400 focus:bg-white transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="memory-date"
              className="block text-xs font-mono font-semibold uppercase tracking-wider text-espresso-600 mb-1.5"
            >
              Date (Optional)
            </label>
            <input
              id="memory-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-parchment-300 bg-white text-espresso-900 focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Description / Story */}
        <div>
          <label
            htmlFor="memory-desc"
            className="block text-xs font-mono font-semibold uppercase tracking-wider text-espresso-600 mb-1.5"
          >
            Description & Context <span className="text-terracotta">*</span>
          </label>
          <textarea
            id="memory-desc"
            required
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the occasion, who was present, or what made this moment meaningful..."
            className="w-full px-4 py-2.5 rounded-xl border border-parchment-300 bg-white text-espresso-900 placeholder:text-espresso-400 focus:bg-white transition-colors text-sm leading-relaxed"
          />
        </div>

        {/* Media Upload Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Photograph Upload */}
          <div className="p-4 rounded-2xl bg-white border border-parchment-300">
            <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-espresso-600 mb-2">
              Photograph Upload
            </label>
            <input
              type="file"
              ref={imageInputRef}
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageUpload}
              className="hidden"
            />
            {imageUrl ? (
              <div className="relative group rounded-xl overflow-hidden aspect-[4/3] bg-parchment-200">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                {imageFileName && (
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-espresso-950/75 backdrop-blur-sm text-white text-[11px] font-mono truncate max-w-[80%]">
                    {imageFileName}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setImageUrl("");
                    setImageFileName("");
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-espresso-950/70 text-white hover:bg-espresso-950 transition-colors"
                  aria-label="Remove photo"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => imageInputRef.current?.click()}
                className="w-full border-2 border-dashed border-parchment-300 hover:border-terracotta rounded-xl p-6 flex flex-col items-center justify-center text-center transition-colors cursor-pointer"
              >
                <Upload className="w-6 h-6 text-espresso-400 mb-1" />
                <span className="text-xs font-medium text-espresso-700">
                  Select image file
                </span>
                <span className="text-[10px] text-espresso-400 mt-0.5">
                  JPG, PNG, WebP up to 10MB
                </span>
              </button>
            )}
          </div>

          {/* Audio Upload */}
          <div className="p-4 rounded-2xl bg-white border border-parchment-300">
            <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-espresso-600 mb-2">
              Authentic Voice Recording
            </label>
            <input
              type="file"
              ref={audioInputRef}
              accept="audio/*"
              onChange={handleAudioUpload}
              className="hidden"
            />
            {audioUrl ? (
              <div className="p-4 rounded-xl bg-parchment-100 border border-parchment-300 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 truncate">
                  <FileAudio className="w-5 h-5 text-terracotta shrink-0" />
                  <span className="text-xs font-medium text-espresso-900 truncate">
                    {audioFileName || "Audio recording loaded"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setAudioUrl("");
                    setAudioFileName("");
                  }}
                  className="p-1 rounded-full text-espresso-400 hover:text-espresso-800"
                  aria-label="Remove audio recording"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => audioInputRef.current?.click()}
                className="w-full border-2 border-dashed border-parchment-300 hover:border-terracotta rounded-xl p-6 flex flex-col items-center justify-center text-center transition-colors cursor-pointer"
              >
                <Headphones className="w-6 h-6 text-espresso-400 mb-1" />
                <span className="text-xs font-medium text-espresso-700">
                  Select audio recording
                </span>
                <span className="text-[10px] text-espresso-400 mt-0.5">
                  MP3, WAV, M4A up to 25MB
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Transcript / Spoken Words */}
        <div>
          <label
            htmlFor="memory-transcript"
            className="block text-xs font-mono font-semibold uppercase tracking-wider text-espresso-600 mb-1.5"
          >
            Spoken Transcript or Verbatim Words (Optional)
          </label>
          <textarea
            id="memory-transcript"
            rows={2}
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Exact spoken quotes from the recording or letter..."
            className="w-full px-4 py-2.5 rounded-xl border border-parchment-300 bg-white text-espresso-900 placeholder:text-espresso-400 focus:bg-white transition-colors text-sm"
          />
        </div>

        {/* Tags, Source Label, Related Memory Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="memory-tags"
              className="block text-xs font-mono font-semibold uppercase tracking-wider text-espresso-600 mb-1.5"
            >
              Tags (comma separated)
            </label>
            <input
              id="memory-tags"
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="Cabin, Morning, Arthur"
              className="w-full px-4 py-2 rounded-xl border border-parchment-300 bg-white text-xs text-espresso-900"
            />
          </div>

          <div>
            <label
              htmlFor="memory-source"
              className="block text-xs font-mono font-semibold uppercase tracking-wider text-espresso-600 mb-1.5"
            >
              Original Source Note
            </label>
            <input
              id="memory-source"
              type="text"
              value={sourceLabel}
              onChange={(e) => setSourceLabel(e.target.value)}
              placeholder="e.g. 1984 cassette, Tin Box #2"
              className="w-full px-4 py-2 rounded-xl border border-parchment-300 bg-white text-xs text-espresso-900"
            />
          </div>

          <div>
            <label
              htmlFor="memory-related"
              className="block text-xs font-mono font-semibold uppercase tracking-wider text-espresso-600 mb-1.5"
            >
              Associate Related Memory
            </label>
            <select
              id="memory-related"
              value={relatedMemoryId}
              onChange={(e) => setRelatedMemoryId(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-parchment-300 bg-white text-xs text-espresso-900"
            >
              <option value="">None (Standalone memory)</option>
              {existingMemories
                .filter((m) => m.id !== editingMemory?.id)
                .map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.title}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-parchment-300">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium rounded-xl text-espresso-700 hover:bg-parchment-200 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 text-sm font-medium rounded-xl bg-terracotta hover:bg-terracotta-hover text-white shadow-warm-sm transition-all transform active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting
              ? "Saving..."
              : editingMemory
              ? "Save Changes"
              : "Preserve in Archive"}
          </button>
        </div>
      </form>
    </Modal>
  );
};
