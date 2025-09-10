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
            const { data } = await api.get(`/applicants/my`);
            return data.data;
        },
        retry: (failureCount, error: any) => {
            // 404시에는 재호출 x
            if (error?.response?.status === 404) return false;
            // 나머지는 최대 3번까지만 재시도
            return failureCount < 3;
        },
    });
};
