import { useMutation, useQueryClient, InfiniteData } from "@tanstack/react-query";
import api from "@/apis/axios";
import { AccompanyListItemProps } from "@/types/accompany";

interface CreateCommentParams {
    accompanyId: number;
    content: string;
}

interface DeleteCommentParams {
    accompanyId: number;
    commentId: number;
}

interface CreateReplyParams {
    accompanyId: number;
    commentId: number;
    content: string;
}

interface DeleteReplyParams {
    accompanyId: number;
    commentId: number;
    replyId: number;
}

// 페이지 래퍼 타입만 여기서 최소 정의
type AccompanyListPage = {
    accompanies: AccompanyListItemProps[];
    cursor: number | null;
    hasNext: boolean;
};

export const useCreateComment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ accompanyId, content }: CreateCommentParams) => {
            const res = await api.post(
                `/accompanies/${accompanyId}/comments`,
                { content },
                { headers: { "Content-Type": "application/json" } }
            );
            return res.data;
        },
        onSuccess: (_, { accompanyId }) => {
            // 기존 댓글 리스트 invalidate로 다시 불러옴
            queryClient.invalidateQueries({ queryKey: ["comments", accompanyId] });

            // accompanies 캐시 낙관적 업데이트
            const lists = queryClient.getQueriesData<InfiniteData<AccompanyListPage>>({
                queryKey: ["accompanyList"],
            });

            for (const [key, data] of lists) {
                if (!data) continue;
                queryClient.setQueryData<InfiniteData<AccompanyListPage>>(key, {
                    ...data,
                    pages: data.pages.map(p => ({
                        ...p,
                        accompanies: p.accompanies.map(a =>
                            a.id === accompanyId ? { ...a, commentCount: a.commentCount + 1 } : a
                        ),
                    })),
                });
            }
        },
    });
};

export const useDeleteComment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ accompanyId, commentId }: DeleteCommentParams) => {
            const res = await api.delete(`/accompanies/${accompanyId}/comments/${commentId}`);
            return res.data;
        },
        onSuccess: (_, { accompanyId }) => {
            queryClient.invalidateQueries({ queryKey: ["comments", accompanyId] });

            // accompanies 캐시 낙관적 업데이트
            const lists = queryClient.getQueriesData<InfiniteData<AccompanyListPage>>({
                queryKey: ["accompanyList"],
            });

            for (const [key, data] of lists) {
                if (!data) continue;
                queryClient.setQueryData<InfiniteData<AccompanyListPage>>(key, {
                    ...data,
                    pages: data.pages.map(p => ({
                        ...p,
                        accompanies: p.accompanies.map(a =>
                            a.id === accompanyId ? { ...a, commentCount: Math.max(0, a.commentCount - 1) } : a
                        ),
                    })),
                });
            }
        },
        // onError: () => showToast("댓글 삭제를 실패했습니다. 다시 시도해주세요."),
    });
};

export const useCreateReply = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ accompanyId, commentId, content }: CreateReplyParams) => {
            const res = await api.post(
                `/accompanies/${accompanyId}/comments/${commentId}/replies`,
                { content },
                { headers: { "Content-Type": "application/json" } }
            );
            return res.data;
        },
        onSuccess: (_, { accompanyId, commentId }) => {
            queryClient.invalidateQueries({ queryKey: ["replies", accompanyId, commentId] });
            queryClient.invalidateQueries({ queryKey: ["comments", accompanyId] });
        },
        // onError: () => showToast("답글 작성을 실패했습니다. 다시 시도해주세요."),
    });
};

export const useDeleteReply = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ accompanyId, commentId, replyId }: DeleteReplyParams) => {
            const res = await api.delete(`/accompanies/${accompanyId}/comments/${commentId}/replies/${replyId}`);
            return res.data;
        },
        onSuccess: (_, { accompanyId, commentId }) => {
            queryClient.invalidateQueries({ queryKey: ["replies", accompanyId, commentId] });
            queryClient.invalidateQueries({ queryKey: ["comments", accompanyId] });
        },
        // onError: () => showToast("답글 삭제를 실패했습니다. 다시 시도해주세요."),
    });
};
