export type MemoryType = "photo" | "audio" | "story" | "video";

export type VisualSourceKind = "original" | "ai_recreation" | "demo_image";

export type PersonProfile = {
  id: string;
  name: string;
  relationship?: string;
  portraitUrl?: string;
  caption?: string;
  description?: string;
  details?: string;
  isDemo?: boolean;
  createdAt: string;
  voiceStatus?: "not_configured" | "ready" | "unavailable" | "processing";
  voiceId?: string;
  voiceName?: string;
};

export type Memory = {
  id: string;
  profileId?: string;
  title: string;
  description: string;
  occurredAt: string | null;
  type: MemoryType;
  tags: string[];
  imageUrl?: string;
  audioUrl?: string;
  videoUrl?: string;
  transcript?: string;
  sourceLabel?: string;
  location?: string;
  people?: string[];
  isFavorite?: boolean;
  visualKind?: VisualSourceKind;
  relatedMemoryId?: string;
  category?: string;
  lifeStage?: string;
  quote?: string;
  reflection?: string;
  sfx?: string;
};

export type FlashbackShot = {
  id: string;
  shotNumber: number;
  title: string;
  caption: string;
  imageUrl?: string;
  audioUrl?: string;
  occurredAt?: string | null;
  visualKind: VisualSourceKind;
  narrationText?: string;
  narrationAudioUrl?: string;
  reflectionText?: string;
};

export type FlashbackExperience = {
  id: string;
  profileId: string;
  title: string;
  subtitle?: string;
  createdAt: string;
  isDemo?: boolean;
  coverImageUrl?: string;
  openingHeading?: string;
  openingCaption?: string;
  shots: FlashbackShot[];
  closingText?: string;
  narratorVoiceId?: string;
  narratorName?: string;
};

export type MessageSource = {
  memoryId: string;
  memoryTitle: string;
  excerpt?: string;
  sourceType: "transcript" | "story" | "caption" | "recording";
};

export type ConversationMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  createdAt: string;
  responseType?: "exact_quote" | "reflection";
  sources?: MessageSource[];
  audioUrl?: string;
  audioKind?: "original" | "generated_narration";
};

export type ChatRequest = {
  conversationId?: string;
  profileId?: string;
  message: string;
  memoryIds?: string[];
};

export type ChatResponse = {
  conversationId: string;
  exactQuote: string | null;
  reflection: string;
  sources: MessageSource[];
  audioUrl?: string;
  disclosure: string;
};

export type ConversationSession = {
  id: string;
  profileId?: string;
  title: string;
  updatedAt: string;
  messages: ConversationMessage[];
};

export type ElevenLabsVoice = {
  voiceId: string;
  name: string;
  category: string;
  description: string;
  previewUrl?: string;
  labels?: Record<string, string>;
};

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  createdAt: string;
  isDemo?: boolean;
};

export type AudioUploadSlot = {
  id: string;
  slotNumber: number;
  label: string; // e.g. "Recording 1 — A familiar conversation"
  promptSubtitle: string;
  file?: File;
  fileName?: string;
  fileSize?: number;
  audioUrl?: string;
  durationSeconds?: number;
  uploadedAt?: string;
  status: "empty" | "uploading" | "ready" | "failed";
  errorMessage?: string;
  transcript?: string;
};

export type AudioAnalysisState =
  | "no_recordings"
  | "uploading"
  | "checking_quality"
  | "analyzing"
  | "awaiting_verification"
  | "voice_available"
  | "voice_unavailable"
  | "completed"
  | "failed";

export type AudioAnalysisResult = {
  state: AudioAnalysisState;
  recordingCount: number;
  totalDurationSeconds: number;
  averageQualityScore: number; // 0 - 100
  backgroundNoiseLevel: "low" | "moderate" | "high";
  multipleSpeakersDetected: boolean;
  clippingDetected: boolean;
  detectedLanguage: string;
  transcriptAvailable: boolean;
  meetsCloningRequirements: boolean;
  summaryFeedback: string;
  voiceConfigurationStatus: "not_configured" | "ready" | "unavailable" | "processing";
  configuredVoiceId?: string;
  configuredVoiceName?: string;
  recommendedNarrator?: {
    voiceId: string;
    name: string;
  };
};

export type AppView =
  | "auth"
  | "welcome"
  | "home"
  | "dashboard"
  | "memories"
  | "gallery"
  | "flashbacks"
  | "feel_existence"
  | "voice_archive"
  | "conversation"
  | "timeline"
  | "settings"
  | "detail"
  | "flashback_player";

