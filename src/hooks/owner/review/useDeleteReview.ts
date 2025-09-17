import { ReviewApi } from "@/apis/owner/review";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (reviewId: number) => ReviewApi.deleteReviewForGuesthouse(reviewId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["guesthouseReviews"], exact: false });
        },
        // onError: () => showToast("후기 삭제를 실패했습니다. 다시 시도해주세요."),
    });
};
