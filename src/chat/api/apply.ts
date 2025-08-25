import api from "@/apis/axios";

export const ApplyApi = {
    // 특정 지원자가 지원한 내 공고 목록 가져오기
    getMyRecruitmentsAppliedByUser: async (applicantUserId: number) => {
        const res = await api.get(`/apply`, {
            params: { applicantUserId },
        });

        return res.data.data ?? [];
    },

    // 채팅 내에서 특정 지원자의 지원서 보기
    getOtherUserApplication: async (applicantUserId: number) => {
        try {
            const { data } = await api.get(`/applicants/${applicantUserId}`);
            return data?.data;
        } catch (err: any) {
            const code = err?.response?.data?.status || err?.response?.status;
            if (code === "APPLICANT_NOT_FOUND" || code === 404) {
                return null;
            }
            throw err;
        }
    },
};
