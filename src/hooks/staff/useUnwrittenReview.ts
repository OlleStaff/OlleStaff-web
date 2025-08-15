import api from "@/apis/axios";
import { useQuery } from "@tanstack/react-query";

export type UnwrittenReviewProps = {
    employmentId: number;
    startedAt: string;
    endedAt: string;
    title: string;
};

export const useUnwrittenReview = (options?: { enabled?: boolean }) => {
    return useQuery({
        queryKey: ["unwrittenReview"],
        queryFn: async (): Promise<UnwrittenReviewProps[]> => {
            const res = await api.get("/employments/un-write-review");
            return res.data?.data ?? [];
        },
        staleTime: 1000 * 60 * 5,
        enabled: options?.enabled ?? true,
    });
};
