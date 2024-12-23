import { create } from 'zustand'

interface VideoPlayerState {
    currentTime: number;
    isPlaying: boolean;
    duration: number;
    isPaused: boolean;
    hasVideoLoaded: boolean;
    isMuted: boolean;
    setCurrentTime: (time: number) => void;
    setIsPlaying: (isPlaying: boolean) => void;
    setDuration: (duration: number) => void;
    setIsPaused: (isPaused: boolean) => void;
    setHasVideoLoaded: (hasVideoLoaded: boolean) => void;
    setIsMuted: (isMuted: boolean) => void;
  }
  
  export const useVideoPlayerStore = create<VideoPlayerState>((set) => ({
    currentTime: 0,
    isPlaying: false,
    duration: 0,
    isPaused: true,
    hasVideoLoaded: false,
    isMuted: false,
    
    setCurrentTime: (time) => set({ currentTime: time }),
    setIsPlaying: (isPlaying) => set({ isPlaying }),
    setDuration: (duration) => set({ duration }),
    setIsPaused: (isPaused) => set({ isPaused }),
    setHasVideoLoaded: (hasVideoLoaded) => set({ hasVideoLoaded }),
    setIsMuted: (isMuted) => set({ isMuted }),
  }));
  
