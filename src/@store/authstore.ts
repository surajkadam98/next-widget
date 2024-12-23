import {create} from 'zustand';

interface AuthState {
  email: string;
  authorized: boolean;
  firstName?: string;
  lastName?: string;
  accessToken: string;
  setUserData: (data: Partial<AuthState>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  email: "",
  authorized: false,
  firstName: "",
  lastName: "",
  accessToken: "",

  setUserData: (data) => set((state) => ({ ...state, ...data })),
}));


