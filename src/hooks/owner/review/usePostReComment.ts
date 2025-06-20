import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReviewApi } from "@/apis/owner/review";

export const usePostReComment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ reviewId, reviewComment }: { reviewId: number; reviewComment: string }) =>
            ReviewApi.postReCommentForGuesthouseReview(reviewId, reviewComment),

        onSuccess: () => {
            alert("댓글이 등록되었습니다!");
            queryClient.invalidateQueries({ queryKey: ["guesthouseReviews"] });
        },

        onError: (error: unknown) => {
            console.error("댓글 등록 실패:", error);
            alert("댓글 등록에 실패했습니다.");
        },
    });
};
