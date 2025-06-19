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
            .then(res => res.data),
};
