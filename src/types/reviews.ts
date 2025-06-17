export interface ReviewListItemProps {
    allReviewInfoDTOS: ReviewInfo[];
    hasNext: boolean;
    countReview: number;
    averageRating: number;
}

export interface ReviewInfo {
    reviewId: number;
    rating: number;
    title: string;
    nickName: string;
    images: string[];
    review: string;
    disclosure: boolean; // true이면 전체공개, false이면 게스트하우스에만 공개
    reviewComment: string | null;
    reviewDate: number;
    reviewCommentDate: number;
    hostNickName: string;
}
