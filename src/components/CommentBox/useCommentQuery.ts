import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import api from "@/apis/axios";
import { CommentType, ReplyType } from "@/types/comment";

interface LastPage {
    items: CommentType[];
    nextCursor: number | null;
    hasNext: boolean;
}

export const useCommentList = (accompanyId: number) => {
    return useInfiniteQuery<LastPage>({
        queryKey: ["comments", accompanyId],
        queryFn: async ({ pageParam = null }) => {
            const res = await api.get(`/accompanies/${accompanyId}/comments`, {
                params: { cursor: pageParam, size: 5 },
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
            const res = await api.get(`/accompanies/${accompanyId}/comments/${commentId}/replies`, {
                params: { cursor: null, size: 20 },
            });
            return res.data.data.replies;
        },
        enabled,
    });
};
