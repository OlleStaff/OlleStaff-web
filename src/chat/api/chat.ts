import api from "@/apis/axios";

export const ChatApi = {
    // GET: 채팅 메시지 조회
    getChatMessages: async (chatRoomId: number, cursor?: string, size = 20) => {
        const { data } = await api.get(`/chat/messages`, {
            params: { chatRoomId, cursor: cursor ?? undefined, size },
        });
        return data?.data ?? { messages: [], cursor: null, hasNext: false };
    },

    // POST: 채팅 내 이미지 업로드
    postChatImages: async (formData: FormData): Promise<string[]> => {
        try {
            const res = await api.post(`/chat/images`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log("채팅 내 images 업로드 성공", res.data.data.images);
            return res.data.data.images;
        } catch (error) {
            console.error("채팅 내 images 업로드 실패", error);
            throw error;
        }
    },

    // POST: 채팅 내 파일 업로드
    postChatFiles: async (formData: FormData): Promise<{ name: string; link: string }> => {
        try {
            const res = await api.post(`/chat/files`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("채팅 내 files 업로드 성공", res.data);
            return res.data.data;
        } catch (error) {
            console.error("채팅 내 files 업로드 실패", error);
            throw error;
        }
    },

    // POST: 채팅 내 합격 처리
    postAcceptApplicant: async (applicantId: number, employmentId: number) => {
        try {
            const res = await api.post(`/apply/accept`, null, {
                params: { applicantId, employmentId },
            });

            console.log(applicantId, "님 합격 처리 :: ", res);
            return res.data;
        } catch (error) {
            console.error("합격 처리 실패", error);
            throw error;
        }
    },
};
