export type Gender = "MALE" | "FEMALE";

export interface UserInfo {
    nickname: string;
    phone: string;
    verificationCode: string;
    birthDate: string;
    gender: Gender | "";
}

export interface ErrorState {
    nickname?: string;
    phone?: string;
    verificationCode?: string;
    birthDate?: string;
    gender?: string;
}
