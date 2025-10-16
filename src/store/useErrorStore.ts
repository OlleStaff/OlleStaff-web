import { create } from "zustand";

interface ErrorState {
    isOpen: boolean;
    message: string;
    showError: (message: string) => void;
    clearError: () => void;
}

export const useErrorStore = create<ErrorState>(set => ({
    isOpen: false,
    message: "",
    showError: message =>
        set(state => {
            if (state.isOpen && state.message === message) {
                return state;
            }
            return {
                isOpen: true,
                message,
            };
        }),
    clearError: () =>
        set({
            isOpen: false,
            message: "",
        }),
}));
