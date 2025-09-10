import { create } from "zustand";

interface SessionState {
    expired: boolean;
    setExpired: (val: boolean) => void;
}

export const useSessionStore = create<SessionState>(set => ({
    expired: false,
    setExpired: val => set({ expired: val }),
}));
