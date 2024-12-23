import { create } from 'zustand';

interface WidgetAppState {
  isClaiming: boolean;
  isQuizCorrect: boolean;
  isTasksComplete: boolean;
  isAnswered: boolean;
  isClaimed: boolean | null;
  sharingUrl: string;
  leaderboardUrl: string;
  reward: string;
  claimStatus: string;
  alreadyClaimed: boolean;
  walletAddress: string;
  walletType: string;
  setIsClaimed: (value: boolean | null) => void;
  setIsClaiming: (value: boolean) => void;
  setIsQuizCorrect: (value: boolean) => void;
  setIsTasksComplete: (value: boolean) => void;
  setIsAnswered: (value: boolean) => void;
  setSharingUrl: (url: string) => void;
  setLeaderboardUrl: (url: string) => void;
  setReward: (reward: string) => void;
  setClaimStatus: (status: string) => void;
  setAlreadyClaimed: (status: boolean) => void;
  setWalletAddress: (address: string) => void;
  setWalletType: (type: string) => void;
}

export const useWidgetAppStore = create<WidgetAppState>((set) => ({
  isClaiming: false,
  isQuizCorrect: false,
  isTasksComplete: false,
  isAnswered: false,
  isClaimed: null,
  sharingUrl: "",
  leaderboardUrl: "",
  reward: "",
  claimStatus: "",
  alreadyClaimed: false,
  walletAddress: "",
  walletType: "",
  setIsClaimed: (value) => set({ isClaimed: value }),
  setIsClaiming: (value) => set({ isClaiming: value }),
  setIsQuizCorrect: (value) => set({ isQuizCorrect: value }),
  setIsTasksComplete: (value) => set({ isTasksComplete: value }),
  setIsAnswered: (value) => set({ isAnswered: value }),
  setSharingUrl: (url) => set({ sharingUrl: url }),
  setLeaderboardUrl: (url) => set({ leaderboardUrl: url }),
  setReward: (reward) => set({ reward }),
  setClaimStatus: (status) => set({ claimStatus: status }),
  setAlreadyClaimed: (status) => set({alreadyClaimed: status}),
  setWalletAddress: (address) => set({ walletAddress: address }),
  setWalletType: (type) => set({ walletType: type }),
}));

