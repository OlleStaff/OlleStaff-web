import api from "@/apis/axios";

export const ReviewApi = {
    // GET: 게스트하우스의 모든 리뷰 조회
    getAllReviewsForGuesthouse: async (reviewType: "ALL" | "COMMENTED") =>
        await api
            .get(`/reviews/host`, {
                params: {
                    reviewType,
                    pageSize: 10,
                },
            })
            .then(res => res.data.data),

    // DELETE: 게스트하우스 리뷰 삭제
    deleteReviewForGuesthouse: async (reviewId: number) =>
        await api.delete(`/reviews/${reviewId}`).then(res => res.data),

    // POST: 게스트하우스 리뷰에 대한 답 댓글 달기
    postReCommentForGuesthouseReview: async (reviewId: number, reviewComment: string) => {
        try {
            const res = await api.post(`/reviews/${reviewId}/comments`, { reviewComment });

            return res.data;
        } catch (error) {
            throw error;
        }
    },

    // DELETE: 게스트하우스 리뷰에 대한 답 댓글 삭제
    deleteReCommentForGuesthouseReview: async (reviewId: number) =>
        await api.delete(`/reviews/${reviewId}/comments`).then(res => res.data),
};
