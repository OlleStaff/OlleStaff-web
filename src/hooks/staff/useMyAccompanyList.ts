import { useInfiniteQuery } from "@tanstack/react-query";
import api from "@/apis/axios";

export const useMyAccompanyList = () => {
    return useInfiniteQuery({
        queryKey: ["myAccompanyList"],
        queryFn: async ({ pageParam = null }) => {
            const { data } = await api.get(`/accompanies/my`, {
                params: { cursor: pageParam, size: 7 },
            });
            return data.data;
        },
        initialPageParam: null,
        getNextPageParam: lastPage => (lastPage.hasNext ? lastPage.cursor : null),
    });
};
