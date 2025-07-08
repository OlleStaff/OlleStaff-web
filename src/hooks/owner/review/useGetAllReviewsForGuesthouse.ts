import { ReviewApi } from "@/apis/owner/review";
import { ReviewListItemProps } from "@/types/reviews";
import { useQuery } from "@tanstack/react-query";

export const useGetAllReviewsForGuesthouse = (reviewType: "ALL" | "COMMENTED") =>
    useQuery<ReviewListItemProps>({
        queryKey: ["guesthouseReviews", reviewType],
        queryFn: () => ReviewApi.getAllReviewsForGuesthouse(reviewType),
    });
