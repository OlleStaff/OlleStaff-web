export type Gender = "남자" | "여자";

export interface UserInfo {
    id: number;
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
