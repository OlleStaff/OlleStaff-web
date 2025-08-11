import { useQuery } from "@tanstack/react-query";
import api from "@/apis/axios";

export const useMyReviewList = (reviewType: string) => {
    return useQuery({
        queryKey: ["myReviewList", reviewType],
        queryFn: async () => {
            const res = await api.get(`/reviews/staff`, {
                params: {
                    pageSize: 20,
                    reviewType: reviewType,
                },
            });
            return res.data.data;
        },
        staleTime: 1000 * 60 * 3,
        enabled: !!reviewType,
    });
};
