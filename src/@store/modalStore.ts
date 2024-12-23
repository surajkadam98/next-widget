import { create } from "zustand";

interface ModalState {
  isModalOpen: boolean;
  modalHistory: string[];
  setModalOpen: (initialRoute: string) => void;
  setModalClose: (history: string[]) => void;
  setModalHistory: (history: string[]) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isModalOpen: false,
  modalHistory: ["/"],
  setModalOpen: (initialRoute) =>
    set(() => ({
      isModalOpen: true,
      modalHistory: [initialRoute],
    })),
  setModalClose: (history) =>
    set({ isModalOpen: false, modalHistory: history }),
  setModalHistory: (history) => set({ modalHistory: history }),
}));
