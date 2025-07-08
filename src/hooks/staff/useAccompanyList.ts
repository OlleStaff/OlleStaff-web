import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export const useAccompanyList = () => {
    return useInfiniteQuery({
        queryKey: ["accompanyList"],
        queryFn: async ({ pageParam = null }) => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/accompanies`, {
                params: {
                    cursor: pageParam,
                    size: 6,
                },
                withCredentials: true,
            });
            return data.data;
        },
        initialPageParam: null,
        getNextPageParam: lastPage => (lastPage.hasNext ? lastPage.cursor : null),
    });
};
