import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserType = "STAFF" | "GUESTHOUSE" | null;

interface UserState {
    nickname: string;
    type: UserType;
    profileImage: string;
    gender: string;
    birthDate: string;
    setUser: (payload: Partial<Pick<UserState, "nickname" | "type" | "profileImage" | "gender" | "birthDate">>) => void;
    resetUser: () => void;
}

export const useUserStore = create<UserState>()(
    persist(
        set => ({
            nickname: "",
            type: null,
            profileImage: "",
            gender: "",
            birthDate: "",
            setUser: payload => set(state => ({ ...state, ...payload })),
            resetUser: () => set({ nickname: "", type: null, profileImage: "", gender: "", birthDate: "" }),
        }),
        {
            name: "user-store",
        }
    )
);
