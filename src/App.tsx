import { useState, useEffect, useCallback } from "react";
import type {
  AppView,
  PersonProfile,
  Memory,
  FlashbackExperience,
} from "./types";
import {
  listProfiles,
  getActiveProfileId,
  setActiveProfileId,
  listMemories,
  uploadMemory,
  updateMemory,
  deleteMemory,
  listFlashbacks,
  deleteFlashback,
  ELEANOR_DEMO_PROFILE,
} from "./services/stillHereApi";
import { useAudioPlayer } from "./hooks/useAudioPlayer";

// Navigation & Common
import { Navigation } from "./components/common/Navigation";
import { GlobalAudioBanner } from "./components/common/GlobalAudioBanner";
import { ToastContainer, type ToastMessage } from "./components/common/Toast";

// Views
import { HomeProfileView } from "./views/HomeProfileView";
import { GalleryView } from "./views/GalleryView";
import { FlashbacksView } from "./views/FlashbacksView";
import { FeelTheExistenceView } from "./views/FeelTheExistenceView";
import { SettingsPrivacyView } from "./views/SettingsPrivacyView";

// Modals
import { CreateProfileModal } from "./components/profile/CreateProfileModal";
import { AddMemoryModal } from "./components/memory/AddMemoryModal";
import { MemoryDetailModal } from "./components/memory/MemoryDetailModal";
import { CreateFlashbackModal } from "./components/flashback/CreateFlashbackModal";
import { VerticalCinematicFlashback } from "./components/flashback/VerticalCinematicFlashback";

export function App() {
  const [currentView, setCurrentView] = useState<AppView>("home");
  const [activeProfile, setActiveProfile] = useState<PersonProfile>(ELEANOR_DEMO_PROFILE);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [flashbacks, setFlashbacks] = useState<FlashbackExperience[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Modals
  const [isCreateProfileOpen, setIsCreateProfileOpen] = useState(false);
  const [isAddMemoryOpen, setIsAddMemoryOpen] = useState(false);
  const [isCreateFlashbackOpen, setIsCreateFlashbackOpen] = useState(false);
  const [selectedMemoryDetail, setSelectedMemoryDetail] = useState<Memory | null>(null);
  const [activeVerticalFlashback, setActiveVerticalFlashback] = useState<FlashbackExperience | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const audio = useAudioPlayer();

  const showToast = useCallback((message: string, type: "success" | "error" | "info" = "info") => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Load active profile and associated data
  const loadProfileData = useCallback(async () => {
    setIsLoading(true);
    try {
      const profiles = await listProfiles();
      const activeId = await getActiveProfileId();
      const current = profiles.find((p) => p.id === activeId) || profiles[0] || ELEANOR_DEMO_PROFILE;
      setActiveProfile(current);

      const profileMemories = await listMemories(current.id);
      setMemories(profileMemories);

      const profileFlashbacks = await listFlashbacks(current.id);
      setFlashbacks(profileFlashbacks);
    } catch (err) {
      console.error("Failed to load profile data:", err);
      showToast("Unable to load profile memories.", "error");
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadProfileData();
  }, [loadProfileData]);

  // Switch Profile
  const handleSwitchProfile = async (profile: PersonProfile) => {
    // Stop audio from previous profile
    audio.pause();
    await setActiveProfileId(profile.id);
    setActiveProfile(profile);

    const profileMemories = await listMemories(profile.id);
    setMemories(profileMemories);

    const profileFlashbacks = await listFlashbacks(profile.id);
    setFlashbacks(profileFlashbacks);

    showToast(`Switched to ${profile.name}'s memory space.`, "info");
  };

  // Profile Created
  const handleProfileCreated = async (profile: PersonProfile) => {
    setActiveProfile(profile);
    const profileMemories = await listMemories(profile.id);
    setMemories(profileMemories);
    setFlashbacks([]);
    setCurrentView("memories");
    showToast(`Created memory profile for ${profile.name}.`, "success");
  };

  // Add / Edit Memory
  const handleSaveMemory = async (memoryPayload: Omit<Memory, "id"> & { id?: string }) => {
    if (memoryPayload.id) {
      await updateMemory(memoryPayload.id, memoryPayload);
      showToast("Memory updated successfully.", "success");
    } else {
      await uploadMemory(activeProfile.id, memoryPayload);
      showToast("Memory preserved in your archive.", "success");
    }
    const updated = await listMemories(activeProfile.id);
    setMemories(updated);
  };

  // Delete Memory
  const handleDeleteMemory = async (id: string) => {
    await deleteMemory(id);
    const updated = await listMemories(activeProfile.id);
    setMemories(updated);
    setSelectedMemoryDetail(null);
    showToast("Memory removed from archive.", "info");
  };

  // Delete Flashback
  const handleDeleteFlashback = async (id: string) => {
    await deleteFlashback(id);
    const updated = await listFlashbacks(activeProfile.id);
    setFlashbacks(updated);
    showToast("Flashback removed.", "info");
  };

  // Audio Play Trigger
  const handlePlayMemoryAudio = (memory: Memory) => {
    if (!memory.audioUrl) return;
    audio.toggle({
      url: memory.audioUrl,
      title: memory.title,
      sourceLabel: memory.sourceLabel || "Authentic Recording",
      kind: "original",
    });
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-espresso-950 flex flex-col font-sans selection:bg-terracotta-light selection:text-terracotta-dark">
      {/* Top Header & Navigation */}
      <Navigation
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        onOpenAddMemory={() => setIsAddMemoryOpen(true)}
        activeProfile={activeProfile}
        onCreateProfile={() => setIsCreateProfileOpen(true)}
      />

      {/* Main View Display */}
      <main className="flex-1 pb-24">
        {currentView === "home" && (
          <HomeProfileView
            activeProfile={activeProfile}
            memories={memories}
            flashbacks={flashbacks}
            onCreateProfile={() => setIsCreateProfileOpen(true)}
            onExploreDemo={() => {
              handleSwitchProfile(ELEANOR_DEMO_PROFILE);
              showToast("Switched to Eleanor's demo archive.", "info");
            }}
            onOpenMemories={() => setCurrentView("memories")}
            onCreateFlashback={() => setIsCreateFlashbackOpen(true)}
            onPlayFlashback={(fb) => setActiveVerticalFlashback(fb)}
            onOpenFeelExistence={() => setCurrentView("feel_existence")}
            onOpenMemoryDetail={(mem) => setSelectedMemoryDetail(mem)}
          />
        )}

        {currentView === "memories" && (
          <GalleryView
            memories={memories}
            isLoading={isLoading}
            error={null}
            onRefresh={loadProfileData}
            onSelectMemory={(mem) => setSelectedMemoryDetail(mem)}
            onPlayAudio={handlePlayMemoryAudio}
            currentAudioUrl={audio.currentTrack?.url || null}
            isPlaying={audio.isPlaying}
            onOpenAddMemory={() => setIsAddMemoryOpen(true)}
          />
        )}

        {currentView === "flashbacks" && (
          <FlashbacksView
            activeProfile={activeProfile}
            flashbacks={flashbacks}
            onCreateFlashback={() => setIsCreateFlashbackOpen(true)}
            onPlayFlashback={(fb) => setActiveVerticalFlashback(fb)}
            onDeleteFlashback={handleDeleteFlashback}
          />
        )}

        {currentView === "feel_existence" && (
          <FeelTheExistenceView
            activeProfile={activeProfile}
            onSwitchProfile={handleSwitchProfile}
            onOpenMemoryDetail={(mem) => setSelectedMemoryDetail(mem)}
          />
        )}

        {currentView === "settings" && (
          <SettingsPrivacyView
            memories={memories}
            onMemoriesUpdated={loadProfileData}
            onClearAllConversations={() => showToast("Conversation history cleared.", "info")}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Persistent Global Audio Banner for Authentic Recordings */}
      {audio.currentTrack && (
        <GlobalAudioBanner
          currentTrack={audio.currentTrack}
          isPlaying={audio.isPlaying}
          currentTime={audio.currentTime}
          duration={audio.duration}
          volume={audio.volume}
          isMuted={audio.isMuted}
          onTogglePlay={audio.togglePlay}
          onSeek={audio.seek}
          onToggleMute={audio.toggleMute}
          onClose={audio.stop}
        />
      )}

      {/* Floating Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Modals */}
      <CreateProfileModal
        isOpen={isCreateProfileOpen}
        onClose={() => setIsCreateProfileOpen(false)}
        onProfileCreated={handleProfileCreated}
      />

      <AddMemoryModal
        isOpen={isAddMemoryOpen}
        onClose={() => setIsAddMemoryOpen(false)}
        onSave={handleSaveMemory}
        existingMemories={memories}
        activeProfileId={activeProfile?.id}
      />

      <MemoryDetailModal
        memory={selectedMemoryDetail}
        isOpen={Boolean(selectedMemoryDetail)}
        onClose={() => setSelectedMemoryDetail(null)}
        onTogglePlay={handlePlayMemoryAudio}
        isPlaying={audio.isPlaying && audio.currentTrack?.url === selectedMemoryDetail?.audioUrl}
        currentTime={audio.currentTime}
        duration={audio.duration}
        onSeek={audio.seek}
        onEdit={() => {
          setSelectedMemoryDetail(null);
          setIsAddMemoryOpen(true);
        }}
        onDelete={handleDeleteMemory}
      />

      <CreateFlashbackModal
        isOpen={isCreateFlashbackOpen}
        onClose={() => setIsCreateFlashbackOpen(false)}
        activeProfile={activeProfile}
        memories={memories}
        onFlashbackCreated={(newFb) => {
          setFlashbacks((prev) => [newFb, ...prev]);
          showToast(`Flashback "${newFb.title}" crafted successfully.`, "success");
        }}
        onPlayFlashbackNow={(newFb) => {
          setActiveVerticalFlashback(newFb);
        }}
      />

      {/* Fullscreen Vertical Cinematic Flashback Experience */}
      <VerticalCinematicFlashback
        flashback={activeVerticalFlashback}
        isOpen={Boolean(activeVerticalFlashback)}
        onClose={() => setActiveVerticalFlashback(null)}
        onSave={(fb) => {
          setFlashbacks((prev) => {
            if (prev.some((f) => f.id === fb.id)) return prev;
            return [fb, ...prev];
          });
          showToast("Flashback saved to profile.", "success");
        }}
      />
    </div>
  );
}
