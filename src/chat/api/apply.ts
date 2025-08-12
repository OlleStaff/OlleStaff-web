import axios from "axios";

export const ApplyApi = {
    // 채팅 내에서 특정 지원자의 지원서 보기
    getUserApplication: async (applicantUserId: number) => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/apply`, {
            withCredentials: true,
            params: { applicantUserId },
        });

        return data?.data;
    },
};
