import { useQuery } from "@tanstack/react-query";
import api from "@/apis/axios";

export interface UserProfileResponse {
    nickname: string;
    phone: string;
    birthDate: string;
    profileImage?: string;
}

export const useFetchUserProfile = () => {
    return useQuery<UserProfileResponse>({
        queryKey: ["userProfile"],
        queryFn: async () => {
            const { data } = await api.get(`/users/me`);
            return data.data;
        },
    });
};
