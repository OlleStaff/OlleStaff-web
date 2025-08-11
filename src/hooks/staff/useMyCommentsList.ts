import { useInfiniteQuery } from "@tanstack/react-query";
import api from "@/apis/axios";

export const useMyCommentsList = () => {
    return useInfiniteQuery({
        queryKey: ["myCommentsList"],
        queryFn: async ({ pageParam = null }) => {
            const { data } = await api.get(`${import.meta.env.VITE_API_BASE_URL}/accompanies/comment-reply`, {
                params: { cursor: pageParam, size: 6 },
                withCredentials: true,
            });
            return data.data;
        },
        initialPageParam: null,
        getNextPageParam: lastPage => (lastPage.hasNext ? lastPage.cursor : null),
    });
};
