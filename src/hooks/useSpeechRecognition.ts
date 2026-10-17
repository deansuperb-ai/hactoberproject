import { useState, useEffect, useRef, useCallback } from "react";

// Web Speech API definitions
interface SpeechRecognitionEventLike extends Event {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionErrorEventLike extends Event {
  error: string;
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
  onend: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
  }
}

export function useSpeechRecognition(onResultCallback?: (text: string) => void) {
  const [isSupported, setIsSupported] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognitionConstructor =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (SpeechRecognitionConstructor) {
        setIsSupported(true);
        try {
          const instance = new SpeechRecognitionConstructor();
          instance.continuous = false;
          instance.interimResults = true;
          instance.lang = "en-US";

          instance.onresult = (event: SpeechRecognitionEventLike) => {
            let combined = "";
            for (let i = 0; i < Object.keys(event.results).length; i++) {
              const res = event.results[i];
              if (res && res[0]) {
                combined += res[0].transcript;
              }
            }
            setTranscript(combined);
            if (onResultCallback && combined) {
              onResultCallback(combined);
            }
          };

          instance.onerror = (event: SpeechRecognitionErrorEventLike) => {
            console.warn("Speech recognition error:", event.error);
            setError(event.error === "not-allowed" ? "Microphone permission denied." : "Speech recognition error.");
            setIsListening(false);
          };

          instance.onend = () => {
            setIsListening(false);
          };

          recognitionRef.current = instance;
        } catch (e) {
          console.warn("Speech recognition could not be initialized:", e);
          setIsSupported(false);
        }
      } else {
        setIsSupported(false);
      }
    }
  }, [onResultCallback]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) return;
    setError(null);
    setTranscript("");
    try {
      recognitionRef.current.start();
      setIsListening(true);
    } catch (e) {
      console.warn("Failed to start speech recognition:", e);
    }
  }, []);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;
    try {
      recognitionRef.current.stop();
      setIsListening(false);
    } catch (e) {
      console.warn("Failed to stop speech recognition:", e);
    }
  }, []);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  return {
    isSupported,
    isListening,
    transcript,
    error,
    startListening,
    stopListening,
    toggleListening,
  };
}
