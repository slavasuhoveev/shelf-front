import { create } from "zustand";

export type AuthUIStatus = "checking" | "authenticated" | "guest";

type AuthUIState = {
  status: AuthUIStatus;
  setChecking: () => void;
  setAuthenticated: () => void;
  setGuest: () => void;
};

export const useAuthUIStore = create<AuthUIState>((set) => ({
  status: "checking",
  setChecking: () => set({ status: "checking" }),
  setAuthenticated: () => set({ status: "authenticated" }),
  setGuest: () => set({ status: "guest" }),
}));
