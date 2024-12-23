import { create } from "zustand";

interface NftMintDataStoreState {
  transactionId: string;
  nftTokenId: string;
  nftAddress: `0x${string}`;
  nftWalletAddress: `0x${string}`;
  nftWalletType: string;
  setTransactionId: (id: string) => void;
  setNftTokenId: (id: string) => void;
  setNftAddress: (address: `0x${string}`) => void;
  setNftWalletAddress: (address: `0x${string}`) => void;
  setNftWalletType: (type: string) => void;
}

const useNftMintDataStore = create<NftMintDataStoreState>((set) => ({
  transactionId: "",
  nftTokenId: "",
  nftAddress: "0x",
  nftWalletAddress: "0x",
  nftWalletType: "",
  setTransactionId: (id) => set({ transactionId: id }),
  setNftTokenId: (id) => set({ nftTokenId: id }),
  setNftAddress: (address) => set({ nftAddress: address }),
  setNftWalletAddress: (address) => set({ nftWalletAddress: address }),
  setNftWalletType: (type) => set({ nftWalletType: type }),
}));

export default useNftMintDataStore;
