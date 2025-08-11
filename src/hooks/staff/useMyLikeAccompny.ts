import { useInfiniteQuery } from "@tanstack/react-query";
import api from "@/apis/axios";

export const useMyLikeAccompany = () => {
    return useInfiniteQuery({
        queryKey: ["myLikeAccompany"],
        queryFn: async ({ pageParam = null }) => {
            const { data } = await api.get(`${import.meta.env.VITE_API_BASE_URL}/accompanies/like`, {
                params: { cursor: pageParam, size: 6 },
                withCredentials: true,
            });
            return data.data;
        },
        initialPageParam: null,
        getNextPageParam: lastPage => (lastPage.hasNext ? lastPage.cursor : null),
    });
};
