import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReviewApi } from "@/apis/owner/review";

export const usePostReComment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ reviewId, reviewComment }: { reviewId: number; reviewComment: string }) =>
            ReviewApi.postReCommentForGuesthouseReview(reviewId, reviewComment),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["guesthouseReviews"], exact: false });
        },

        // onError: () => showToast("댓글 작성을 실패했습니다. 다시 시도해주세요."),
    });
};
