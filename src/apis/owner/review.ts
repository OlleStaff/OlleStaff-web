import axios from "axios";

export const ReviewApi = {
    // GET: 게스트하우스의 모든 리뷰 조회
    getAllReviewsForGuesthouse: async (reviewType: "ALL" | "COMMENTED") =>
        await axios
            .get(`${import.meta.env.VITE_API_BASE_URL}/reviews/host`, {
                withCredentials: true,
                params: {
                    reviewType,
                    pageSize: 10,
                },
            })
            .then(res => res.data.data),

    // DELETE: 게스트하우스 리뷰 삭제
    deleteReviewForGuesthouse: async (reviewId: number) =>
        await axios
            .delete(`${import.meta.env.VITE_API_BASE_URL}/reviews/${reviewId}`, {
                withCredentials: true,
            })
            .then(res => res.data),

    // POST: 게스트하우스 리뷰에 대한 답 댓글 달기
    postReCommentForGuesthouseReview: async (reviewId: number, reviewComment: string) => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/reviews/${reviewId}/comments`,
                { reviewComment },
                {
                    withCredentials: true,
                }
            );

            console.log("답 댓글 등록 완료", res.data);
            return res.data;
        } catch (error) {
            console.error("답 댓글 등록 실패", error);
            throw error;
        }
    },

    // DELETE: 게스트하우스 리뷰에 대한 답 댓글 삭제
    deleteReCommentForGuesthouseReview: async (reviewId: number) =>
        await axios
            .delete(`${import.meta.env.VITE_API_BASE_URL}/reviews/comments/${reviewId}`, {
                withCredentials: true,
            })
            .then(res => res.data),
};
