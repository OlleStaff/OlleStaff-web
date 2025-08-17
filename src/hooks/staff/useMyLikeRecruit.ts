import { useInfiniteQuery } from "@tanstack/react-query";
import api from "@/apis/axios";

// 진행중 공고
export const useMyLikeRecruitOpen = () =>
    useInfiniteQuery({
        queryKey: ["myLikeRecruit", "open"],
        initialPageParam: null as number | null,
        queryFn: async ({ pageParam }) => {
            const { data } = await api.get("/employments/all-like-employment", {
                params: {
                    type: "IN_PROGRESS",
                    cursor: pageParam,
                    pageSize: 6,
                },
            });
            const { employmentPreviewDTOS, cursor, hasNext } = data.data;
            return { items: employmentPreviewDTOS, cursor, hasNext };
        },
        getNextPageParam: last => (last.hasNext ? last.cursor : null),
        staleTime: 180_000,
        enabled: false,
    });

// 마감 공고
export const useMyLikeRecruitClosed = () =>
    useInfiniteQuery({
        queryKey: ["myLikeRecruit", "closed"],
        initialPageParam: null as number | null,
        queryFn: async ({ pageParam }) => {
            const { data } = await api.get("/employments/all-like-employment", {
                params: {
                    type: "END",
                    cursor: pageParam,
                    pageSize: 6,
                },
            });
            const { employmentPreviewDTOS, cursor, hasNext } = data.data;
            return { items: employmentPreviewDTOS, cursor, hasNext };
        },
        getNextPageParam: last => (last.hasNext ? last.cursor : null),
        staleTime: 180_000,
        enabled: false,
    });
