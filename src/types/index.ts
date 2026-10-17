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

export type AppView =
  | "welcome"
  | "home"
  | "memories"
  | "gallery"
  | "flashbacks"
  | "feel_existence"
  | "conversation"
  | "timeline"
  | "settings"
  | "detail"
  | "flashback_player";
