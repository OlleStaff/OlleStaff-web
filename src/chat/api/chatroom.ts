import api from "@/apis/axios";

export const ChatRoomApi = {
    // GET: 채팅방 목록 조회
    getChatRoomsALL: async () => {
        try {
            const res = await api.get(`/chat-rooms/all`);
            return res.data?.data?.chatRoomPreviewDTOS ?? [];
        } catch (error) {
            console.error("채팅방 목록 조회 실패", error);
            throw error;
        }
    },

    // GET: 특정 채팅방 세부 정보 조회
    getChatRoomDetail: async (chatRoomId: number) => {
        try {
            const res = await api.get(`/chat-rooms/${chatRoomId}`);
            return res.data.data;
        } catch (error) {
            console.error(`채팅방(${chatRoomId}) 상세 조회 실패`, error);
            throw error;
        }
    },

    // GET: 특정 유저와의 채팅방 조회
    getChatRoomByTargetUser: async (targetUserId: number) => {
        try {
            const res = await api.get(`/chat-rooms`, {
                params: { target: targetUserId },
            });
            const roomId = res.data?.data;
            console.log(targetUserId, "와의 채팅방 조회 성공, 채팅방 id :: ", roomId);
            return roomId;
        } catch (error) {
            console.error(targetUserId, "와의 채팅방 조회 실패", error);
            throw error;
        }
    },

    // POST: target user와의 채팅방 생성
    postCreateChatRoom: async (targetUserId: number) => {
        try {
            const res = await api.post(`/chat-rooms`, null, {
                params: { target: targetUserId },
            });
            const roomId = res.data?.data;
            console.log("새로운 채팅방 생성 성공, 채팅방 id :: ", roomId);
            return roomId;
        } catch (error) {
            console.error("채팅방 생성 실패", error);
            throw error;
        }
    },
};
