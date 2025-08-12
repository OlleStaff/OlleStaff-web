import { useInfiniteQuery } from "@tanstack/react-query";
import api from "@/apis/axios";

export const useMyLikeAccompany = () => {
    return useInfiniteQuery({
        queryKey: ["myLikeAccompany"],
        queryFn: async ({ pageParam = null }) => {
            const { data } = await api.get(`/accompanies/like`, {
                params: { cursor: pageParam, size: 6 },
            });
            return data.data;
        },
        initialPageParam: null,
        getNextPageParam: lastPage => (lastPage.hasNext ? lastPage.cursor : null),
    });
};
