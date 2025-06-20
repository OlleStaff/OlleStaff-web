import { ReviewApi } from "@/apis/owner/review";
import { ReviewListItemProps } from "@/types/reviews";
import { useQuery } from "@tanstack/react-query";

export const useAllReviewsForGuesthouse = (reviewType: "ALL" | "COMMENTED") =>
    useQuery<ReviewListItemProps>({
        queryKey: ["guesthouseReviews"],
        queryFn: () => ReviewApi.getAllReviewsForGuesthouse(reviewType),
    });
