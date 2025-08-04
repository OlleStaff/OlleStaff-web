import { ReviewApi } from "@/apis/owner/review";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (reviewId: number) => ReviewApi.deleteReviewForGuesthouse(reviewId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["guesthouseReviews"], exact: false });
        },
        onError: error => {
            console.error("후기 삭제 실패", error);
        },
    });
};
