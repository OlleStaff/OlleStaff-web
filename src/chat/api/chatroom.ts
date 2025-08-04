import axios from "axios";

export const ChatRoomApi = {
    // GET: 채팅방 목록 조회
    getChatRoomsALL: async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/chat-room/all`, {
                withCredentials: true,
            });
            return res.data;
        } catch (error) {
            console.error("채팅방 목록 조회 실패", error);
            throw error;
        }
    },

    // GET: 특정 채팅방 세부 정보 조회
    getChatRoomDetail: async (chatRoomId: number) => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/chat-room/${chatRoomId}`, {
                withCredentials: true,
            });
            return res.data;
        } catch (error) {
            console.error(`채팅방(${chatRoomId}) 상세 조회 실패`, error);
            throw error;
        }
    },

    // GET: 특정 유저와의 채팅방 조회
    getChatRoomByTargetUser: async (targetUserId: number) => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/chat/images`,

                {
                    withCredentials: true,
                    params: { target: targetUserId },
                }
            );

            console.log(targetUserId, "와의 채팅방 조회 성공, 채팅방 id :: ", res.data);
            return res.data;
        } catch (error) {
            console.error(targetUserId, "와의 채팅방 조회 실패", error);
            throw error;
        }
    },

    // POST: target user와의 채팅방 생성
    postCreateChatRoom: async (targetUserId: number) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/chat-rooms`, {
                withCredentials: true,
                params: { target: targetUserId },
            });

            console.log("새로운 채팅방 생성 성공, 채팅방 id :: ", res.data);
            return res.data;
        } catch (error) {
            console.error("채팅방 생성 실패", error);
            throw error;
        }
    },
};
