import { useQuery } from "@tanstack/react-query";
import api from "@/apis/axios";

export interface MyApplicationResponse {
    userId: string;
    nickname: string;
    profileImage?: string;
    mbti: string;
    link: string;
    introduction: string;
    appeal: string;
    images: string[];
}

export const useFetchMyApplication = () => {
    return useQuery<MyApplicationResponse>({
        queryKey: ["myApplication"],
        queryFn: async () => {
            const { data } = await api.get(`${import.meta.env.VITE_API_BASE_URL}/applicants/my`, {
                withCredentials: true,
            });
            return data.data;
        },
    });
};
