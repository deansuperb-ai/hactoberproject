import { useState, useEffect, useRef, useCallback } from "react";

export interface AudioTrackInfo {
  url: string;
  title: string;
  sourceLabel?: string;
  kind?: "original" | "generated_narration" | "memory";
}

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<AudioTrackInfo | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [volume, setVolumeState] = useState<number>(0.9);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize audio instance once
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      setError(null);
    };
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    const handleError = () => {
      setError("Unable to play audio recording.");
      setIsPlaying(false);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.pause();
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  const play = useCallback(
    (track: AudioTrackInfo) => {
      if (!audioRef.current) return;
      const audio = audioRef.current;

      if (currentTrack?.url === track.url) {
        audio.play().catch((err) => {
          console.warn("Audio play prevented:", err);
          setError("Playback permission required.");
        });
        return;
      }

      setError(null);
      setCurrentTrack(track);
      audio.src = track.url;
      audio.playbackRate = playbackRate;
      audio.volume = isMuted ? 0 : volume;
      audio.play().catch((err) => {
        console.warn("Audio play prevented:", err);
        setError("Playback failed. Please click play to start.");
      });
    },
    [currentTrack?.url, playbackRate, volume, isMuted]
  );

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
  }, []);

  const toggle = useCallback(
    (track?: AudioTrackInfo) => {
      if (track && track.url !== currentTrack?.url) {
        play(track);
        return;
      }
      if (isPlaying) {
        pause();
      } else if (currentTrack) {
        audioRef.current?.play().catch(console.warn);
      }
    },
    [isPlaying, currentTrack, play, pause]
  );

  const seek = useCallback((time: number) => {
    if (!audioRef.current) return;
    const boundedTime = Math.max(0, Math.min(time, audioRef.current.duration || 0));
    audioRef.current.currentTime = boundedTime;
    setCurrentTime(boundedTime);
  }, []);

  const changeSpeed = useCallback((rate: number) => {
    if (!audioRef.current) return;
    audioRef.current.playbackRate = rate;
    setPlaybackRate(rate);
  }, []);

  const setVolume = useCallback((vol: number) => {
    if (!audioRef.current) return;
    const clamped = Math.max(0, Math.min(1, vol));
    audioRef.current.volume = clamped;
    setVolumeState(clamped);
    if (clamped > 0 && isMuted) {
      setIsMuted(false);
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  }, [isMuted, volume]);

  const stop = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setCurrentTrack(null);
    setIsPlaying(false);
  }, []);

  return {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    playbackRate,
    volume,
    isMuted,
    error,
    play,
    pause,
    stop,
    toggle,
    togglePlay: toggle,
    seek,
    changeSpeed,
    setVolume,
    toggleMute,
  };
}
