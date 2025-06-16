import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
            const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/me`, {
                withCredentials: true,
            });
            return data.data;
        },
    });
};
