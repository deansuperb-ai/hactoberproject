import type {
  PersonProfile,
  Memory,
  FlashbackExperience,
  ChatRequest,
  ChatResponse,
  ConversationSession,
} from "../types";
import { DEMO_ASSETS } from "../assets/demoAssets";

export const STORAGE_KEYS = {
  PROFILES: "still_here_profiles_v2",
  ACTIVE_PROFILE_ID: "still_here_active_profile_id_v2",
  MEMORIES: "still_here_memories_v2",
  FLASHBACKS: "still_here_flashbacks_v2",
  CONVERSATIONS: "still_here_conversations_v2",
  API_KEY: "still_here_elevenlabs_api_key",
  VOICE_ID: "still_here_elevenlabs_voice_id",
};

// ==========================================
// 1. ELEANOR DEMO PROFILE & SAMPLE DATA
// ==========================================

export const ELEANOR_DEMO_PROFILE: PersonProfile = {
  id: "profile-eleanor-demo",
  name: "Eleanor — Demo Profile",
  relationship: "Grandmother",
  portraitUrl: DEMO_ASSETS.eleanorPortrait,
  caption: "Sunday mornings at Grandma's house: warm tea, fresh bread, and rain tapping gently against the window.",
  description: "A gentle soul who filled the kitchen with warmth, the scent of cinnamon rolls, and quiet comfort on rainy mornings.",
  details: "Lived in Portland, Oregon. Kept handwritten recipes and an old upright piano by the front window.",
  isDemo: true,
  createdAt: "2026-10-01T08:00:00Z",
  voiceStatus: "ready",
  voiceId: "JBFqnCBsd6RMkjVDRZzb",
  voiceName: "George (Warm Storyteller)",
};

export const ELEANOR_DEMO_MEMORIES: Memory[] = [
  {
    id: "mem-eleanor-kitchen-morning",
    profileId: "profile-eleanor-demo",
    title: "A Rainy Morning in the Kitchen",
    description: "A quiet morning remembered through the smell of fresh bread, a familiar voice, and the sound of rain outside.",
    occurredAt: "1991-10-13",
    type: "photo",
    tags: ["Kitchen", "Sunday", "Baking", "Morning Rain"],
    imageUrl: DEMO_ASSETS.kitchenBread,
    audioUrl: DEMO_ASSETS.recipeAudio,
    transcript: "Eleanor: 'There's no hurry when the rain is falling. Let the dough rise at its own pace, keep your hands warm, and listen to the window.'",
    sourceLabel: "Authentic Kitchen Cassette Dictaphone & 35mm Print",
    location: "Kitchen Farmhouse, Portland",
    people: ["Eleanor", "Grandchild"],
    isFavorite: true,
    visualKind: "demo_image",
  },
  {
    id: "mem-eleanor-rain-window",
    profileId: "profile-eleanor-demo",
    title: "Watching the Rain Tapping the Glass",
    description: "Sitting at the small breakfast table watching the droplets streak down the glass panes while the tea kettle hummed.",
    occurredAt: "1993-11-04",
    type: "story",
    tags: ["Rain", "Tea", "Quiet", "Autumn"],
    imageUrl: DEMO_ASSETS.rainWindow,
    transcript: "'Some afternoons only need a steaming mug and the sound of water against the roof.'",
    sourceLabel: "Handwritten Journal Entry #7",
    location: "Breakfast Nook",
    people: ["Eleanor"],
    isFavorite: true,
    visualKind: "demo_image",
  },
  {
    id: "mem-eleanor-teacup-warmth",
    profileId: "profile-eleanor-demo",
    title: "The Warm Ceramic Teacup",
    description: "Holding the blue willow ceramic teacup between both hands, blowing gently across the steam before the first sip.",
    occurredAt: "1994-04-18",
    type: "audio",
    tags: ["Tea", "Sunday", "Keepsake"],
    imageUrl: DEMO_ASSETS.warmTeacup,
    audioUrl: DEMO_ASSETS.cabinMorningAudio,
    transcript: "Eleanor: 'Take a breath before you drink. The warmth starts in your palms before it ever reaches you.'",
    sourceLabel: "Sunday Morning Voice Recording",
    location: "Porch Nook",
    people: ["Eleanor"],
    isFavorite: false,
    visualKind: "demo_image",
  },
];

export const ELEANOR_DEMO_FLASHBACK: FlashbackExperience = {
  id: "flashback-eleanor-demo-kitchen",
  profileId: "profile-eleanor-demo",
  title: "Sunday Mornings with Grandma",
  subtitle: "A gentle remembrance of warm tea, fresh bread, and the sound of autumn rain.",
  createdAt: "2026-10-15T10:00:00Z",
  isDemo: true,
  coverImageUrl: DEMO_ASSETS.eleanorPortrait,
  openingHeading: "A memory to revisit",
  openingCaption: "Sunday mornings at Grandma's house: warm tea, fresh bread, and rain tapping gently against the window.",
  narratorVoiceId: "JBFqnCBsd6RMkjVDRZzb",
  narratorName: "George (Warm Storyteller)",
  shots: [
    {
      id: "shot-1-face",
      shotNumber: 1,
      title: "A Familiar Face",
      caption: "Eleanor's kind gaze in the soft morning light. The presence that made everyone who entered feel completely at home.",
      imageUrl: DEMO_ASSETS.eleanorPortrait,
      occurredAt: "1990 — Demo Portrait",
      visualKind: "demo_image",
      reflectionText: "The quiet familiarity of a smile that welcomed you without a single demand.",
    },
    {
      id: "shot-2-rainy-morning",
      shotNumber: 2,
      title: "A Rainy Morning in the Kitchen",
      caption: "A quiet morning remembered through the smell of fresh bread, a familiar voice, and the sound of rain outside.",
      imageUrl: DEMO_ASSETS.kitchenBread,
      audioUrl: DEMO_ASSETS.recipeAudio,
      occurredAt: "1991-10-13",
      visualKind: "demo_image",
      reflectionText: "Flour dusted across the butcher block, the steady tap of raindrops, and the warmth of the woodstove.",
    },
    {
      id: "shot-3-details",
      shotNumber: 3,
      title: "The Small Details",
      caption: "Rain tapping gently against the windowpane, blurring the autumn Douglas firs into soft green watercolors.",
      imageUrl: DEMO_ASSETS.rainWindow,
      occurredAt: "1993-11-04",
      visualKind: "demo_image",
      reflectionText: "The unhurried rhythm of an autumn morning where time felt suspended.",
    },
    {
      id: "shot-4-moment-to-keep",
      shotNumber: 4,
      title: "A Moment to Keep",
      caption: "Holding the warm ceramic cup with both hands. A comforting memory that stays with you across the years.",
      imageUrl: DEMO_ASSETS.warmTeacup,
      audioUrl: DEMO_ASSETS.cabinMorningAudio,
      occurredAt: "1994-04-18",
      visualKind: "demo_image",
      reflectionText: "Some moments leave a gentle light that never completely dims.",
    },
  ],
  closingText: "Keep these moments close. They remain a part of who you are.",
};

// ==========================================
// 2. STORAGE HELPERS
// ==========================================

function getStoredProfiles(): PersonProfile[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILES);
    if (!raw) {
      const initial = [ELEANOR_DEMO_PROFILE];
      localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return [ELEANOR_DEMO_PROFILE];
    }
    return parsed;
  } catch {
    return [ELEANOR_DEMO_PROFILE];
  }
}

function setStoredProfiles(profiles: PersonProfile[]): void {
  localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(profiles));
}

function getStoredMemories(): Memory[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MEMORIES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.MEMORIES, JSON.stringify(ELEANOR_DEMO_MEMORIES));
      return ELEANOR_DEMO_MEMORIES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : ELEANOR_DEMO_MEMORIES;
  } catch {
    return ELEANOR_DEMO_MEMORIES;
  }
}

function setStoredMemories(memories: Memory[]): void {
  localStorage.setItem(STORAGE_KEYS.MEMORIES, JSON.stringify(memories));
}

function getStoredFlashbacks(): FlashbackExperience[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FLASHBACKS);
    if (!raw) {
      const initial = [ELEANOR_DEMO_FLASHBACK];
      localStorage.setItem(STORAGE_KEYS.FLASHBACKS, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [ELEANOR_DEMO_FLASHBACK];
  } catch {
    return [ELEANOR_DEMO_FLASHBACK];
  }
}

function setStoredFlashbacks(flashbacks: FlashbackExperience[]): void {
  localStorage.setItem(STORAGE_KEYS.FLASHBACKS, JSON.stringify(flashbacks));
}

// ==========================================
// 3. API ADAPTER IMPLEMENTATIONS
// ==========================================

export async function listProfiles(): Promise<PersonProfile[]> {
  return getStoredProfiles();
}

export async function getActiveProfileId(): Promise<string> {
  const stored = localStorage.getItem(STORAGE_KEYS.ACTIVE_PROFILE_ID);
  const profiles = getStoredProfiles();
  if (stored && profiles.some((p) => p.id === stored)) {
    return stored;
  }
  return profiles[0]?.id || ELEANOR_DEMO_PROFILE.id;
}

export async function setActiveProfileId(id: string): Promise<void> {
  localStorage.setItem(STORAGE_KEYS.ACTIVE_PROFILE_ID, id);
}

export async function createProfile(input: Partial<PersonProfile>): Promise<PersonProfile> {
  if (!input.name || !input.name.trim()) {
    throw new Error("A name or nickname is required to create a memory profile.");
  }

  const newProfile: PersonProfile = {
    id: `profile-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: input.name.trim(),
    relationship: input.relationship?.trim() || undefined,
    portraitUrl: input.portraitUrl || undefined,
    caption: input.caption?.trim() || undefined,
    description: input.description?.trim() || undefined,
    details: input.details?.trim() || undefined,
    isDemo: false,
    createdAt: new Date().toISOString(),
    voiceStatus: "not_configured",
  };

  const existing = getStoredProfiles();
  const updated = [newProfile, ...existing];
  setStoredProfiles(updated);
  await setActiveProfileId(newProfile.id);
  return newProfile;
}

export async function updateProfile(id: string, input: Partial<PersonProfile>): Promise<PersonProfile> {
  const existing = getStoredProfiles();
  const index = existing.findIndex((p) => p.id === id);
  if (index === -1) {
    throw new Error("Profile not found.");
  }

  const updatedProfile: PersonProfile = {
    ...existing[index],
    ...input,
  };
  existing[index] = updatedProfile;
  setStoredProfiles(existing);
  return updatedProfile;
}

export async function deleteProfile(id: string): Promise<boolean> {
  const profiles = getStoredProfiles();
  if (profiles.length <= 1) {
    throw new Error("Cannot delete the only profile. Please create another profile first.");
  }

  const remaining = profiles.filter((p) => p.id !== id);
  setStoredProfiles(remaining);

  // Also remove associated memories and flashbacks
  const memories = getStoredMemories().filter((m) => m.profileId !== id);
  setStoredMemories(memories);

  const flashbacks = getStoredFlashbacks().filter((f) => f.profileId !== id);
  setStoredFlashbacks(flashbacks);

  // Switch to first remaining profile if active was deleted
  const activeId = await getActiveProfileId();
  if (activeId === id) {
    await setActiveProfileId(remaining[0].id);
  }

  return true;
}

export async function listMemories(profileId?: string): Promise<Memory[]> {
  const all = getStoredMemories();
  if (!profileId) return all;
  return all.filter((m) => m.profileId === profileId);
}

export async function uploadMemory(profileId: string, memory: Partial<Memory>): Promise<Memory> {
  if (!memory.title || !memory.title.trim()) {
    throw new Error("A memory title is required.");
  }

  const newMemory: Memory = {
    id: `mem-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    profileId,
    title: memory.title.trim(),
    description: memory.description?.trim() || "",
    occurredAt: memory.occurredAt || null,
    type: memory.type || "photo",
    tags: memory.tags || [],
    imageUrl: memory.imageUrl,
    audioUrl: memory.audioUrl,
    videoUrl: memory.videoUrl,
    transcript: memory.transcript?.trim(),
    sourceLabel: memory.sourceLabel?.trim() || "Uploaded to your private archive",
    location: memory.location?.trim(),
    people: memory.people || [],
    isFavorite: Boolean(memory.isFavorite),
    visualKind: memory.visualKind || "original",
  };

  const existing = getStoredMemories();
  setStoredMemories([newMemory, ...existing]);
  return newMemory;
}

export async function updateMemory(id: string, metadata: Partial<Memory>): Promise<Memory> {
  const existing = getStoredMemories();
  const index = existing.findIndex((m) => m.id === id);
  if (index === -1) {
    throw new Error("Memory not found.");
  }

  const updated: Memory = {
    ...existing[index],
    ...metadata,
  };
  existing[index] = updated;
  setStoredMemories(existing);
  return updated;
}

export async function deleteMemory(id: string): Promise<boolean> {
  const existing = getStoredMemories();
  const remaining = existing.filter((m) => m.id !== id);
  setStoredMemories(remaining);
  return true;
}

export async function listFlashbacks(profileId?: string): Promise<FlashbackExperience[]> {
  const all = getStoredFlashbacks();
  if (!profileId) return all;
  return all.filter((f) => f.profileId === profileId);
}

export async function createFlashback(input: Partial<FlashbackExperience>): Promise<FlashbackExperience> {
  if (!input.title || !input.title.trim()) {
    throw new Error("A flashback title is required.");
  }

  const newFlashback: FlashbackExperience = {
    id: `flashback-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    profileId: input.profileId || ELEANOR_DEMO_PROFILE.id,
    title: input.title.trim(),
    subtitle: input.subtitle?.trim(),
    createdAt: new Date().toISOString(),
    isDemo: Boolean(input.isDemo),
    coverImageUrl: input.coverImageUrl,
    openingHeading: input.openingHeading || "A memory to revisit",
    openingCaption: input.openingCaption || "",
    shots: input.shots || [],
    closingText: input.closingText || "Keep these moments close.",
    narratorVoiceId: input.narratorVoiceId || "JBFqnCBsd6RMkjVDRZzb",
    narratorName: input.narratorName || "Authorized Narrator",
  };

  const existing = getStoredFlashbacks();
  setStoredFlashbacks([newFlashback, ...existing]);
  return newFlashback;
}

export async function deleteFlashback(id: string): Promise<boolean> {
  const existing = getStoredFlashbacks();
  const remaining = existing.filter((f) => f.id !== id);
  setStoredFlashbacks(remaining);
  return true;
}

// ==========================================
// 4. CONVERSATION / FEEL THE EXISTENCE
// ==========================================

export async function sendMessage(input: ChatRequest): Promise<ChatResponse> {
  const trimmed = input.message.trim().toLowerCase();
  const profileId = input.profileId || ELEANOR_DEMO_PROFILE.id;
  const memories = await listMemories(profileId);
  const profiles = await listProfiles();
  const profile = profiles.find((p) => p.id === profileId) || ELEANOR_DEMO_PROFILE;

  // Find supporting memories
  let matchedMemories = memories.filter((m) => {
    return (
      trimmed.includes(m.title.toLowerCase()) ||
      (m.description && m.description.toLowerCase().split(" ").some((w) => w.length > 4 && trimmed.includes(w))) ||
      (m.location && trimmed.includes(m.location.toLowerCase())) ||
      m.tags.some((t) => trimmed.includes(t.toLowerCase()))
    );
  });

  if (matchedMemories.length === 0 && memories.length > 0) {
    matchedMemories = [memories[0]];
  }

  const primaryMemory = matchedMemories[0];

  let exactQuote: string | null = null;
  if (primaryMemory?.transcript) {
    exactQuote = primaryMemory.transcript;
  }

  let reflection = "";
  if (trimmed.includes("favorite") || trimmed.includes("best") || trimmed.includes("special")) {
    reflection = `From the memories saved in ${profile.name}'s archive, there is a deep sense of stillness in moments like "${primaryMemory?.title || "our days together"}". It reflects someone who found meaning in gentle routines—warm mugs, quiet windows, and listening closely to the day as it unfolded.`;
  } else if (trimmed.includes("rain") || trimmed.includes("weather") || trimmed.includes("morning")) {
    reflection = `Your archive mentions rainy mornings and the smell of bread and tea. In these moments, ${profile.name} cherished the unhurried quiet, reminding you that there is no need to rush when rain taps against the glass.`;
  } else if (trimmed.includes("recipe") || trimmed.includes("kitchen") || trimmed.includes("cook")) {
    reflection = `In the kitchen memories for ${profile.name}, patience was the true ingredient. The saved notes show a person who never measured love in strict spoonfuls, but in shared warmth and keeping your heart quiet.`;
  } else {
    reflection = `Looking through the ${memories.length} memories saved for ${profile.name}, moments like "${primaryMemory?.title || "this day"}" show a life anchored in warmth, attentive presence, and words that continue to offer comfort.`;
  }

  const sources = matchedMemories.map((m) => ({
    memoryId: m.id,
    memoryTitle: m.title,
    excerpt: m.description.substring(0, 110) + "...",
    sourceType: (m.type === "audio" ? "recording" : m.type === "story" ? "story" : "caption") as
      | "recording"
      | "story"
      | "caption",
  }));

  return {
    conversationId: input.conversationId || `convo-${Date.now()}`,
    exactQuote,
    reflection,
    sources,
    audioUrl: primaryMemory?.audioUrl,
    disclosure: "An AI-generated reflection based strictly on the memories you saved.",
  };
}

export async function getConversation(id: string): Promise<ConversationSession | null> {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEYS.CONVERSATIONS}_${id}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// Backward compatibility helpers
export function isDemoModeActive(): boolean {
  return true;
}

export function setDemoModeOverride(_enabled: boolean): void {}

export function resetDemoArchive(): void {
  localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify([ELEANOR_DEMO_PROFILE]));
  localStorage.setItem(STORAGE_KEYS.MEMORIES, JSON.stringify(ELEANOR_DEMO_MEMORIES));
  localStorage.setItem(STORAGE_KEYS.FLASHBACKS, JSON.stringify([ELEANOR_DEMO_FLASHBACK]));
}

export async function createMemory(memory: Partial<Memory>): Promise<Memory> {
  const activeId = await getActiveProfileId();
  return uploadMemory(activeId, memory);
}
