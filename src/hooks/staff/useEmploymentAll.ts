import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { GuesthouseListItemProps } from "@/types/guesthouse";
import { isClosed } from "@/utils/date";

interface UseEmploymentAllProps {
    type: "ALL" | "IN_PROGRESS" | "END";
    search?: string;
    pageSize?: number;
    category?: string;
    enabled?: boolean;
}

interface LastPage {
    items: GuesthouseListItemProps[];
    nextCursor: number | null;
    hasNext: boolean;
}

export const useEmploymentAll = ({
    type,
    search = "",
    pageSize = 10,
    category,
    enabled = true,
}: UseEmploymentAllProps) => {
    return useInfiniteQuery<LastPage>({
        queryKey: ["employmentAll", type, search, pageSize, category],
        queryFn: async ({ pageParam = null }) => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/employments/all`, {
                params: {
                    cursorId: pageParam,
                    pageSize,
                    type,
                    category,
                    search,
                },
                withCredentials: true,
            });

            const list = data.data.employmentPreviewDTOS;
            const nextCursor = list.length > 0 ? list[list.length - 1].employmentId : null;
            const hasNext = data.data.hasNext ?? list.length === pageSize;

            return {
                items: list.map((item: GuesthouseListItemProps) => ({
                    ...item,
                    closed: isClosed(item.recruitmentEnd),
                })),
                nextCursor,
                hasNext,
            };
        },
        initialPageParam: null,
        getNextPageParam: lastPage => (lastPage.hasNext ? lastPage.nextCursor : null),
        enabled,
        staleTime: 1000 * 60,
    });
};
