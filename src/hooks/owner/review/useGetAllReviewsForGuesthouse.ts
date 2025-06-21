import { ReviewApi } from "@/apis/owner/review";
import { ReviewListItemProps } from "@/types/reviews";
import { useQuery } from "@tanstack/react-query";

export const useAllReviewsForGuesthouse = (reviewType: "전체" | "완료됨") =>
    useQuery<ReviewListItemProps>({
        queryKey: ["guesthouseReviews", reviewType],
        queryFn: () => ReviewApi.getAllReviewsForGuesthouse(reviewType),
    });
