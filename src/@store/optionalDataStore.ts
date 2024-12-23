import {create} from 'zustand';

interface OptionalDataState {
  optionalData1: string;
  optionalData2: string;
  optionalData3: string;
  setOptionalData: (data: Partial<OptionalDataState>) => void;
}

export const useOptionalDataStore = create<OptionalDataState>((set) => ({
  optionalData1: "",
  optionalData2: "",
  optionalData3: "",

  setOptionalData: (data) => set((state) => ({ ...state, ...data })),
}));


