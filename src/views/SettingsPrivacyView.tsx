import React, { useState } from "react";
import {
  Lock,
  Sparkles,
  Trash2,
  Download,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Server,
} from "lucide-react";
import type { Memory } from "../types";
import {
  isDemoModeActive,
  setDemoModeOverride,
  resetDemoArchive,
} from "../services/stillHereApi";
import { ConfirmDialog } from "../components/common/ConfirmDialog";

interface SettingsPrivacyViewProps {
  memories: Memory[];
  onMemoriesUpdated: () => void;
  onClearAllConversations: () => void;
  onShowToast: (message: string, type: "success" | "error" | "info") => void;
}

export const SettingsPrivacyView: React.FC<SettingsPrivacyViewProps> = ({
  memories,
  onMemoriesUpdated,
  onClearAllConversations,
  onShowToast,
}) => {
  const [demoActive, setDemoActive] = useState<boolean>(isDemoModeActive());
  const [showClearConvoDialog, setShowClearConvoDialog] = useState(false);
  const [showPurgeMemoriesDialog, setShowPurgeMemoriesDialog] = useState(false);
  const [showResetDemoDialog, setShowResetDemoDialog] = useState(false);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";

  const handleToggleDemo = (enabled: boolean) => {
    setDemoModeOverride(enabled);
    setDemoActive(enabled);
    onMemoriesUpdated();
    onShowToast(
      enabled
        ? "Switched to offline demo archive mode."
        : "Switched to connected backend mode.",
      "info"
    );
  };

  const handleResetDemoData = () => {
    resetDemoArchive();
    onMemoriesUpdated();
    onShowToast("Archive reset to default demonstration memories.", "success");
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(memories, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `still-here-archive-backup-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    onShowToast("Private archive exported successfully.", "success");
  };

  const handlePurgeAllMemories = () => {
    try {
      localStorage.setItem("still_here_memories_v1", JSON.stringify([]));
      onMemoriesUpdated();
      onShowToast("All memories deleted from private archive.", "info");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="py-4 sm:py-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="pb-6 border-b border-parchment-300">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-espresso-500 mb-1.5 block">
          Security & Privacy
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-espresso-950 tracking-tight">
          Archive Settings & Privacy
        </h1>
        <p className="text-sm sm:text-base text-espresso-600 mt-1 font-sans">
          Your memories and voice recordings are deeply personal. Review privacy policies, manage storage, and configure archive options.
        </p>
      </div>

      {/* Sensitive Personal Data Notice */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E6DDD2] shadow-warm-xs space-y-4">
        <div className="flex items-center gap-3 text-espresso-900">
          <div className="w-10 h-10 rounded-2xl bg-olive-light text-olive flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-medium text-espresso-900">
              Personal Memory Sanctuary
            </h2>
            <p className="text-xs text-espresso-500">
              Private data sovereignty and ethical handling principles
            </p>
          </div>
        </div>

        <p className="text-sm text-espresso-700 leading-relaxed font-sans">
          STILL HERE stores and presents deeply sensitive personal memories, authentic voice recordings of loved ones, and intimate letters. We treat this content with the utmost solemnity:
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-espresso-700">
          <li className="flex items-start gap-2 p-3 rounded-2xl bg-parchment-100 border border-parchment-300">
            <CheckCircle2 className="w-4 h-4 text-olive shrink-0 mt-0.5" />
            <span>Memories are stored in your private domain and never used for public training.</span>
          </li>
          <li className="flex items-start gap-2 p-3 rounded-2xl bg-parchment-100 border border-parchment-300">
            <CheckCircle2 className="w-4 h-4 text-olive shrink-0 mt-0.5" />
            <span>Original voice recordings are preserved in their authentic cadence without alteration.</span>
          </li>
          <li className="flex items-start gap-2 p-3 rounded-2xl bg-parchment-100 border border-parchment-300">
            <CheckCircle2 className="w-4 h-4 text-olive shrink-0 mt-0.5" />
            <span>You retain full export and permanent deletion rights at any moment.</span>
          </li>
          <li className="flex items-start gap-2 p-3 rounded-2xl bg-parchment-100 border border-parchment-300">
            <CheckCircle2 className="w-4 h-4 text-olive shrink-0 mt-0.5" />
            <span>No telemetry or tracking scripts run in your memory archive.</span>
          </li>
        </ul>
      </section>

      {/* AI-Generated Content Disclosure */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E6DDD2] shadow-warm-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brass/15 text-brass-dark flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-medium text-espresso-900">
              AI-Generated Reflection Disclosure
            </h2>
            <p className="text-xs text-espresso-500">
              Clear distinction between authentic memories and synthetic reflections
            </p>
          </div>
        </div>

        <p className="text-sm text-espresso-700 leading-relaxed font-sans">
          To maintain honesty and respect for human grief and remembrance, STILL HERE strictly distinguishes all generated content:
        </p>

        <div className="space-y-3 pt-1">
          <div className="p-3.5 rounded-2xl bg-parchment-100 border border-parchment-300 flex items-start gap-3">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-terracotta text-white shrink-0 mt-0.5">
              1. Original Recording
            </span>
            <p className="text-xs text-espresso-700 leading-relaxed">
              Authentic, unedited voice and ambient audio preserved exactly as recorded.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-parchment-100 border border-parchment-300 flex items-start gap-3">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-espresso-800 text-parchment-100 shrink-0 mt-0.5">
              2. Words From Archive
            </span>
            <p className="text-xs text-espresso-700 leading-relaxed">
              Verbatim quotations extracted from your saved letters, journals, and transcripts with exact source attribution.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-parchment-100 border border-parchment-300 flex items-start gap-3">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-brass-dark text-white shrink-0 mt-0.5">
              3. AI Reflection
            </span>
            <p className="text-xs text-espresso-700 leading-relaxed">
              Newly synthesized reflections created by conversational models to help you explore your archive. They are not authentic personal messages.
            </p>
          </div>
        </div>
      </section>

      {/* Backend & Voice Generation Status */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E6DDD2] shadow-warm-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-parchment-200 text-espresso-800 flex items-center justify-center shrink-0">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-medium text-espresso-900">
              Connection & Narration Status
            </h2>
            <p className="text-xs text-espresso-500">
              Shared integration status (Configured via VITE_API_BASE_URL)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-parchment-100 border border-parchment-300 space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-espresso-500 block">
              Backend Endpoint
            </span>
            <span className="text-sm font-mono font-medium text-espresso-900 break-all">
              {apiBaseUrl ? apiBaseUrl : "Local Offline Adapter (Demo Mode)"}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-parchment-100 border border-parchment-300 space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-espresso-500 block">
              Narration Engine
            </span>
            <span className="text-sm font-medium text-espresso-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-olive animate-pulse" />
              <span>{apiBaseUrl ? "Connected Backend Voice" : "Local Ambient Synthesizer Ready"}</span>
            </span>
          </div>
        </div>

        {/* Demo Mode Switcher */}
        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-brass/10 border border-brass/20">
          <div>
            <span className="font-serif text-base font-medium text-espresso-900 block">
              Demo Archive Mode
            </span>
            <span className="text-xs text-espresso-600 block">
              Toggle between offline demonstration archive and connected backend.
            </span>
          </div>

          <button
            type="button"
            onClick={() => handleToggleDemo(!demoActive)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
              demoActive
                ? "bg-espresso-900 text-parchment-100"
                : "bg-white border border-parchment-300 text-espresso-800"
            }`}
          >
            {demoActive ? "Demo Mode: Active" : "Backend Mode: Active"}
          </button>
        </div>
      </section>

      {/* Archive Management & Controls */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E6DDD2] shadow-warm-xs space-y-6">
        <h2 className="font-serif text-2xl font-medium text-espresso-900">
          Archive Management & Safeguards
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Export JSON backup */}
          <button
            type="button"
            onClick={handleExportData}
            className="p-4 rounded-2xl border border-parchment-300 bg-[#FAF7F2] hover:bg-parchment-200 transition-colors text-left flex items-center gap-3 cursor-pointer"
          >
            <Download className="w-5 h-5 text-espresso-700 shrink-0" />
            <div>
              <span className="font-serif text-base font-medium text-espresso-900 block">
                Export Archive Backup
              </span>
              <span className="text-xs text-espresso-500 block">
                Download JSON copy of all saved memories
              </span>
            </div>
          </button>

          {/* Reset Demo Data */}
          <button
            type="button"
            onClick={() => setShowResetDemoDialog(true)}
            className="p-4 rounded-2xl border border-parchment-300 bg-[#FAF7F2] hover:bg-parchment-200 transition-colors text-left flex items-center gap-3 cursor-pointer"
          >
            <RotateCcw className="w-5 h-5 text-espresso-700 shrink-0" />
            <div>
              <span className="font-serif text-base font-medium text-espresso-900 block">
                Restore Demo Memories
              </span>
              <span className="text-xs text-espresso-500 block">
                Reset to default fictional demonstration items
              </span>
            </div>
          </button>

          {/* Clear Conversations */}
          <button
            type="button"
            onClick={() => setShowClearConvoDialog(true)}
            className="p-4 rounded-2xl border border-parchment-300 bg-[#FAF7F2] hover:bg-terracotta-light/30 transition-colors text-left flex items-center gap-3 cursor-pointer"
          >
            <Trash2 className="w-5 h-5 text-terracotta shrink-0" />
            <div>
              <span className="font-serif text-base font-medium text-espresso-900 block">
                Clear Conversations
              </span>
              <span className="text-xs text-espresso-500 block">
                Delete reflection history without removing memories
              </span>
            </div>
          </button>

          {/* Purge All Memories */}
          <button
            type="button"
            onClick={() => setShowPurgeMemoriesDialog(true)}
            className="p-4 rounded-2xl border border-terracotta-border bg-terracotta-light/20 hover:bg-terracotta-light/40 transition-colors text-left flex items-center gap-3 cursor-pointer"
          >
            <AlertTriangle className="w-5 h-5 text-terracotta shrink-0" />
            <div>
              <span className="font-serif text-base font-medium text-terracotta-dark block">
                Purge All Memories
              </span>
              <span className="text-xs text-espresso-500 block">
                Permanently delete all stored archive moments
              </span>
            </div>
          </button>
        </div>
      </section>

      {/* Confirmation Dialogs */}
      <ConfirmDialog
        isOpen={showClearConvoDialog}
        onClose={() => setShowClearConvoDialog(false)}
        onConfirm={() => {
          onClearAllConversations();
          onShowToast("All reflection conversations cleared.", "info");
        }}
        title="Clear Reflection History"
        message="Are you sure you want to remove all saved conversation threads? Your photos and recordings will remain completely untouched."
        confirmLabel="Clear Conversations"
        isDestructive={true}
      />

      <ConfirmDialog
        isOpen={showPurgeMemoriesDialog}
        onClose={() => setShowPurgeMemoriesDialog(false)}
        onConfirm={handlePurgeAllMemories}
        title="Permanently Purge All Memories"
        message="Are you sure you want to delete all memories from this archive? This action cannot be undone."
        confirmLabel="Purge Memories"
        isDestructive={true}
      />

      <ConfirmDialog
        isOpen={showResetDemoDialog}
        onClose={() => setShowResetDemoDialog(false)}
        onConfirm={handleResetDemoData}
        title="Restore Demonstration Memories"
        message="This will reload the initial fictional demonstration memories (Arthur's Porch, Piano Nocturne, Nora's Recipe)."
        confirmLabel="Restore Demo Archive"
        isDestructive={false}
      />
    </div>
  );
};
