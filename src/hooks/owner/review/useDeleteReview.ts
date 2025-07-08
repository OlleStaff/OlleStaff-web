import { ReviewApi } from "@/apis/owner/review";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (reviewId: number) => ReviewApi.deleteReviewForGuesthouse(reviewId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["guesthouseReview"] });
        },
        onError: error => {
            console.error("리뷰 삭제 실패", error);
        },
    });
};
