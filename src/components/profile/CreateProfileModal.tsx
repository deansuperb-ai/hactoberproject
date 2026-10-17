import React, { useState, useRef } from "react";
import { Upload, X, User, Heart, AlertCircle, CheckCircle2 } from "lucide-react";
import { Modal } from "../common/Modal";
import type { PersonProfile } from "../../types";
import { createProfile } from "../../services/stillHereApi";

interface CreateProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProfileCreated: (profile: PersonProfile) => void;
}

const COMMON_RELATIONSHIPS = [
  "Grandmother",
  "Grandfather",
  "Mother",
  "Father",
  "Partner / Spouse",
  "Sister",
  "Brother",
  "Daughter",
  "Son",
  "Close Friend",
  "Mentor",
];

export const CreateProfileModal: React.FC<CreateProfileModalProps> = ({
  isOpen,
  onClose,
  onProfileCreated,
}) => {
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [caption, setCaption] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [portraitUrl, setPortraitUrl] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdProfile, setCreatedProfile] = useState<PersonProfile | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select an image file (JPEG, PNG, or WebP).");
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setErrorMessage("Image file size should be less than 15MB.");
      return;
    }

    setErrorMessage(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPortraitUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage("Please provide a name or nickname for the person you want to remember.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const profile = await createProfile({
        name: name.trim(),
        relationship: relationship.trim() || undefined,
        caption: caption.trim() || undefined,
        description: description.trim() || undefined,
        details: details.trim() || undefined,
        portraitUrl: portraitUrl || undefined,
      });

      setCreatedProfile(profile);
      setIsSuccess(true);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "Failed to create profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleComplete = () => {
    if (createdProfile) {
      onProfileCreated(createdProfile);
    }
    handleReset();
    onClose();
  };

  const handleReset = () => {
    setName("");
    setRelationship("");
    setCaption("");
    setDescription("");
    setDetails("");
    setPortraitUrl(null);
    setErrorMessage(null);
    setIsSuccess(false);
    setCreatedProfile(null);
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        handleReset();
        onClose();
      }}
      title={isSuccess ? "Memory Profile Created" : "Create a Memory Profile"}
      maxWidth="lg"
    >
      {isSuccess && createdProfile ? (
        <div className="text-center py-6 space-y-5 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-olive-light text-olive-dark flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-2xl text-espresso-900 font-medium">
              {createdProfile.name}'s Memory Sanctuary
            </h3>
            <p className="text-sm text-espresso-600 max-w-md mx-auto leading-relaxed">
              Their memory profile has been preserved. You can now add photos, voice notes, letters, and create your first cinematic flashback.
            </p>
          </div>

          <div className="pt-4 flex justify-center">
            <button
              onClick={handleComplete}
              className="px-6 py-2.5 rounded-full bg-terracotta text-white font-medium text-sm hover:bg-terracotta-dark shadow-sm transition-all"
            >
              Open Their Memories
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 py-2">
          <p className="text-sm text-espresso-600 leading-relaxed">
            Create a gentle, private sanctuary dedicated to someone you love. You can upload memories and revisit them anytime.
          </p>

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-terracotta-light/20 border border-terracotta/30 flex items-start gap-2.5 text-xs text-terracotta-dark">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Portrait Upload Area */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-espresso-800 uppercase tracking-wider">
              Portrait Photograph (Optional)
            </label>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all ${
                portraitUrl
                  ? "border-olive bg-parchment-100"
                  : "border-parchment-300 hover:border-terracotta bg-white"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileSelect(e.target.files[0]);
                  }
                }}
              />

              {portraitUrl ? (
                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-md ring-4 ring-parchment-200">
                    <img
                      src={portraitUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left space-y-1">
                    <p className="text-xs font-medium text-espresso-800">
                      Portrait selected
                    </p>
                    <p className="text-[11px] text-espresso-500">
                      Click to choose a different photo
                    </p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPortraitUrl(null);
                      }}
                      className="inline-flex items-center gap-1 text-[11px] text-terracotta hover:underline mt-1"
                    >
                      <X className="w-3 h-3" /> Remove photograph
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 py-4">
                  <div className="w-12 h-12 rounded-full bg-parchment-200 text-espresso-600 flex items-center justify-center mx-auto">
                    <Upload className="w-5 h-5 text-terracotta" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs font-medium text-espresso-800">
                      Drag & drop their portrait here, or click to browse
                    </p>
                    <p className="text-[11px] text-espresso-500">
                      JPEG, PNG, or WebP up to 15MB
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Name & Relationship */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-espresso-800 uppercase tracking-wider">
                Name or Nickname <span className="text-terracotta">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g., Grandmother Eleanor, Dad, Sarah"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-parchment-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta/40 text-espresso-900"
                />
                <User className="w-4 h-4 text-espresso-400 absolute left-3 top-3" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-espresso-800 uppercase tracking-wider">
                Relationship
              </label>
              <div className="relative">
                <input
                  type="text"
                  list="relationships-list"
                  placeholder="e.g., Grandmother, Friend, Father"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-parchment-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta/40 text-espresso-900"
                />
                <Heart className="w-4 h-4 text-espresso-400 absolute left-3 top-3" />
                <datalist id="relationships-list">
                  {COMMON_RELATIONSHIPS.map((rel) => (
                    <option key={rel} value={rel} />
                  ))}
                </datalist>
              </div>
            </div>
          </div>

          {/* Short Caption */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-espresso-800 uppercase tracking-wider">
              Profile Caption / Sentiment
            </label>
            <input
              type="text"
              placeholder="e.g., Sunday mornings, warm tea, and quiet laughter."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-parchment-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta/40 text-espresso-900"
            />
            <p className="text-[11px] text-espresso-500">
              A brief line that captures how you remember them.
            </p>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-espresso-800 uppercase tracking-wider">
              Short Description / Who They Were
            </label>
            <textarea
              rows={3}
              placeholder="Tell a brief story about what made them special, favorite places, or what they loved."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-white border border-parchment-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta/40 text-espresso-900 resize-none"
            />
          </div>

          {/* Meaningful Details */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-espresso-800 uppercase tracking-wider">
              Meaningful Details & Places (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g., Montana cabin, loved jazz records, gardener"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-white border border-parchment-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta/40 text-espresso-900"
            />
          </div>

          {/* Form Actions */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-parchment-200">
            <button
              type="button"
              onClick={() => {
                handleReset();
                onClose();
              }}
              className="px-4 py-2 text-xs font-medium text-espresso-600 hover:text-espresso-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !name.trim()}
              className="px-6 py-2.5 rounded-full bg-terracotta text-white font-medium text-xs hover:bg-terracotta-dark shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Preserving Profile..." : "Save Memory Profile"}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
