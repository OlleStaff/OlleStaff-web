import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/apis/axios";

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

export const useCreateComment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ accompanyId, content }: CreateCommentParams) => {
            const res = await api.post(
                `/accompanies/${accompanyId}/comments`,
                { content },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return res.data;
        },
        onSuccess: (_, { accompanyId }) => {
            queryClient.invalidateQueries({ queryKey: ["comments", accompanyId] });
        },
    });
};

export const useDeleteComment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ accompanyId, commentId }: DeleteCommentParams) => {
            const res = await api.delete(
                `/accompanies/${accompanyId}/comments/${commentId}`,
            );
            return res.data;
        },
        onSuccess: (_, { accompanyId }) => {
            queryClient.invalidateQueries({ queryKey: ["comments", accompanyId] });
        },
        onError: err => {
            console.error("댓글 삭제 실패", err);
        },
    });
};

export const useCreateReply = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ accompanyId, commentId, content }: CreateReplyParams) => {
            const res = await api.post(
                `/accompanies/${accompanyId}/comments/${commentId}/replies`,
                { content },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return res.data;
        },
        onSuccess: (_, { accompanyId, commentId }) => {
            queryClient.invalidateQueries({ queryKey: ["replies", accompanyId, commentId] });
            queryClient.invalidateQueries({ queryKey: ["comments", accompanyId] });
        },
        onError: err => {
            console.error("답글 작성 실패", err);
        },
    });
};

export const useDeleteReply = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ accompanyId, commentId, replyId }: DeleteReplyParams) => {
            const res = await api.delete(
                `/accompanies/${accompanyId}/comments/${commentId}/replies/${replyId}`,
            );
            return res.data;
        },
        onSuccess: (_, { accompanyId, commentId }) => {
            queryClient.invalidateQueries({ queryKey: ["replies", accompanyId, commentId] });
            queryClient.invalidateQueries({ queryKey: ["comments", accompanyId] });
        },
        onError: err => {
            console.error("답글 삭제 실패", err);
        },
    });
};
