import { useInfiniteQuery } from "@tanstack/react-query";
import api from "@/apis/axios";

export const useAccompanyList = () => {
    return useInfiniteQuery({
        queryKey: ["accompanyList"],
        queryFn: async ({ pageParam = null }) => {
            const { data } = await api.get(`/accompanies`, {
                params: {
                    cursor: pageParam,
                    size: 6,
                },
            });
            return data.data;
        },
        initialPageParam: null,
        getNextPageParam: lastPage => (lastPage.hasNext ? lastPage.cursor : null),
    });
};
