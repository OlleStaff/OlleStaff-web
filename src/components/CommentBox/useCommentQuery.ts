import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CommentType, ReplyType } from "@/types/comment";

const API = import.meta.env.VITE_API_BASE_URL;

interface LastPage {
    items: CommentType[];
    nextCursor: number | null;
    hasNext: boolean;
}

export const useCommentList = (accompanyId: number) => {
    return useInfiniteQuery<LastPage>({
        queryKey: ["comments", accompanyId],
        queryFn: async ({ pageParam = null }) => {
            const res = await axios.get(`${API}/accompanies/${accompanyId}/comments`, {
                params: { cursor: pageParam, size: 5 },
                withCredentials: true,
            });

            const list = res.data.data.comments;
            const nextCursor = res.data.data.cursor;
            const hasNext = res.data.data.hasNext;

            return {
                items: list,
                nextCursor,
                hasNext,
            };
        },
        initialPageParam: null,
        getNextPageParam: lastPage => (lastPage.hasNext ? lastPage.nextCursor : null),
        enabled: !!accompanyId,
    });
};

export const useReplyList = (accompanyId: number, commentId: number, enabled: boolean) => {
    return useQuery<ReplyType[]>({
        queryKey: ["replies", accompanyId, commentId],
        queryFn: async () => {
            const res = await axios.get(`${API}/accompanies/${accompanyId}/comments/${commentId}/replies`, {
                params: { cursor: null, size: 20 },
                withCredentials: true,
            });
            return res.data.data.replies;
        },
        enabled,
    });
};
