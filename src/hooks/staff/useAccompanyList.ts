import { useInfiniteQuery } from "@tanstack/react-query";
import api from "@/apis/axios";

export const useAccompanyList = (sort?: "HOT") => {
    return useInfiniteQuery({
        queryKey: ["accompanyList", sort],
        queryFn: async ({ pageParam = null }) => {
            const { data } = await api.get(`/accompanies`, {
                params: {
                    cursor: pageParam,
                    size: 6,
                    ...(sort ? { sort } : {}),
                },
            });
            return data.data;
        },
        initialPageParam: null,
        getNextPageParam: lastPage => (lastPage.hasNext ? lastPage.cursor : null),
        staleTime: 1000 * 60,
    });
};
