import { ReviewApi } from "@/apis/owner/review";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteReviewComment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (reviewId: number) => ReviewApi.deleteReCommentForGuesthouseReview(reviewId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["guesthouseReviews"], exact: false });
        },
        onError: error => {
            console.error("리뷰 답 댓글 삭제 실패", error);
        },
    });
};
