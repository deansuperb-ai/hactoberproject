import type { ElevenLabsVoice } from "../types";

export type ElevenLabsStatus = {
  configured: boolean;
  defaultVoiceId: string;
  defaultModelId: string;
  error?: string;
};

export const DEFAULT_VOICE_ID = "JBFqnCBsd6RMkjVDRZzb";
export const DEFAULT_MODEL_ID = "eleven_flash_v2_5";
const EMBEDDED_API_KEY = "sk_af64fbad0558ea5193ab9b66cb3906e8bc5a279752299247";

export function getElevenLabsApiKey(): string {
  return localStorage.getItem("still_here_elevenlabs_api_key") || EMBEDDED_API_KEY;
}

export function setElevenLabsApiKey(key: string): void {
  localStorage.setItem("still_here_elevenlabs_api_key", key.trim());
}

const narrationAudioCache = new Map<string, string>();

export async function getElevenLabsStatus(): Promise<ElevenLabsStatus> {
  const apiKey = getElevenLabsApiKey();
  if (apiKey) {
    return {
      configured: true,
      defaultVoiceId: DEFAULT_VOICE_ID,
      defaultModelId: DEFAULT_MODEL_ID,
    };
  }

  return {
    configured: false,
    defaultVoiceId: DEFAULT_VOICE_ID,
    defaultModelId: DEFAULT_MODEL_ID,
    error: "API key not configured",
  };
}

export async function getElevenLabsVoices(): Promise<{
  configured: boolean;
  voices: ElevenLabsVoice[];
  error?: string;
}> {
  const apiKey = getElevenLabsApiKey();

  if (apiKey) {
    try {
      const res = await fetch("https://api.elevenlabs.io/v1/voices", {
        headers: {
          "xi-api-key": apiKey,
        },
      });

      if (res.ok) {
        const data = await res.json();
        const voices = (data.voices || []).map((v: Record<string, unknown>) => ({
          voiceId: v.voice_id as string,
          name: (v.name as string) || "Unnamed Voice",
          category: (v.category as string) || "premade",
          description: (v.description as string) || "",
          previewUrl: (v.preview_url as string) || "",
          labels: (v.labels as Record<string, string>) || {},
        }));

        if (voices.length > 0) {
          return {
            configured: true,
            voices,
          };
        }
      }
    } catch (err) {
      console.warn("Direct ElevenLabs fetch failed, using fallback:", err);
    }
  }

  return {
    configured: Boolean(apiKey),
    voices: getFallbackNarratorVoices(),
  };
}

export async function generateNarrationSpeech(
  text: string,
  voiceId?: string
): Promise<{ audioUrl: string; isCached: boolean }> {
  const trimmed = text.trim();
  if (!trimmed) {
    throw new Error("Narration text cannot be empty.");
  }

  const targetVoiceId = voiceId || DEFAULT_VOICE_ID;
  const cacheKey = `${targetVoiceId}:${trimmed}`;

  if (narrationAudioCache.has(cacheKey)) {
    return { audioUrl: narrationAudioCache.get(cacheKey)!, isCached: true };
  }

  const apiKey = getElevenLabsApiKey();

  if (apiKey) {
    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${targetVoiceId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": apiKey,
        },
        body: JSON.stringify({
          text: trimmed,
          model_id: DEFAULT_MODEL_ID,
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
          },
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const audioUrl = URL.createObjectURL(blob);
        narrationAudioCache.set(cacheKey, audioUrl);
        return { audioUrl, isCached: false };
      }
    } catch (err) {
      console.warn("TTS direct call failed:", err);
    }
  }

  throw new Error("Unable to synthesize audio. Please check network connection or ElevenLabs API key.");
}

export function getFallbackNarratorVoices(): ElevenLabsVoice[] {
  return [
    {
      voiceId: "JBFqnCBsd6RMkjVDRZzb",
      name: "George - Warm Storyteller",
      category: "premade",
      description: "Warm, resonant delivery with natural cadence ideal for reflective personal stories.",
      previewUrl: "https://storage.googleapis.com/eleven-public-prod/premade/voices/JBFqnCBsd6RMkjVDRZzb/e6206d1a-0721-4787-ac34-a10b16d042f3.mp3",
      labels: { accent: "british", age: "middle_aged", gender: "male", use_case: "narration" },
    },
    {
      voiceId: "EXAVITQu4vr4xnSDxMaL",
      name: "Sarah - Reassuring & Confident",
      category: "premade",
      description: "Gentle, calm tone with comforting intimacy for memories and personal reflections.",
      previewUrl: "https://storage.googleapis.com/eleven-public-prod/premade/voices/EXAVITQu4vr4xnSDxMaL/01a3e733-433e-4f59-9943-7f3e1a069502.mp3",
      labels: { accent: "american", age: "young", gender: "female", use_case: "news" },
    },
    {
      voiceId: "pqHfZKP75CvOlQylNhV4",
      name: "Bill - Wise & Balanced",
      category: "premade",
      description: "Thoughtful and measured elder tone, well suited for archival readings.",
      previewUrl: "https://storage.googleapis.com/eleven-public-prod/premade/voices/pqHfZKP75CvOlQylNhV4/d782b3ff-84ba-4029-848c-acf01285524d.mp3",
      labels: { accent: "american", age: "old", gender: "male", use_case: "narration" },
    },
  ];
}
