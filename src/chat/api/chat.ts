import axios from "axios";

export const ChatApi = {
    // GET: 채팅 메시지 조회
    getChatMessages: async (chatRoomId: number) => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/chat/messages`, {
                withCredentials: true,
                params: { chatRoomId },
            });

            console.log(`채팅방(${chatRoomId}) 메시지 조회 성공`, res.data);
            return res.data;
        } catch (error) {
            console.error(`채팅방(${chatRoomId}) 메시지 조회 실패`, error);
            throw error;
        }
    },

    // POST: 채팅 내 이미지 업로드
    postChatImages: async (formData: FormData): Promise<string[]> => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/chat/images`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
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
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/chat/files`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });
            console.log("채팅 내 files 업로드 성공", res.data);
            return res.data.data;
        } catch (error) {
            console.error("채팅 내 files 업로드 실패", error);
            throw error;
        }
    },
};
