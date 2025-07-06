import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export const useMyAccompanyList = () => {
    return useInfiniteQuery({
        queryKey: ["myAccompanyList"],
        queryFn: async ({ pageParam = null }) => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/accompanies/my`, {
                params: { cursor: pageParam, size: 7 },
                withCredentials: true,
            });
            return data.data;
        },
        initialPageParam: null,
        getNextPageParam: lastPage => (lastPage.hasNext ? lastPage.cursor : null),
    });
};
