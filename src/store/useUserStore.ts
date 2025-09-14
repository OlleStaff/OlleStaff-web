// /store/useUserStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserType = "STAFF" | "GUESTHOUSE" | null;

interface UserState {
    id: number;
    nickname: string;
    type: UserType;
    profileImage: string;
    gender: string;
    birthDate: string;
    setUser: (
        payload: Partial<Pick<UserState, "id" | "nickname" | "type" | "profileImage" | "gender" | "birthDate">>
    ) => void;
    mode: UserType;
    setMode: (mode: Exclude<UserType, null>) => void;
    resetUser: () => void;
}

export const useUserStore = create<UserState>()(
    persist(
        set => ({
            id: 0,
            nickname: "",
            type: null,
            profileImage: "",
            gender: "",
            birthDate: "",
            mode: null,
            setMode: mode => set({ mode }),
            setUser: payload => set(state => ({ ...state, ...payload })),
            resetUser: () => set({ id: 0, nickname: "", type: null, profileImage: "", gender: "", birthDate: "" }),
        }),
        {
            name: "user-store",
        }
    )
);
