import api from "@/apis/axios";
export type ChatRoomsFilter = "ALL" | "APPLIED" | "ACCEPTED";
export const ChatRoomApi = {
    // GET: 채팅방 목록 조회
    getChatRoomsALL: async (filter: ChatRoomsFilter = "ALL") => {
        try {
            const res = await api.get(`/chat-rooms/all`, { params: { filter } });
            return res.data.data.chatRooms ?? [];
        } catch (error) {
            throw error;
        }
    },

    // GET: 특정 채팅방 세부 정보 조회
    getChatRoomDetail: async (chatRoomId: number) => {
        try {
            const res = await api.get(`/chat-rooms/${chatRoomId}`);
            return res.data.data;
        } catch (error) {
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
            return roomId;
        } catch (error) {
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
            return roomId;
        } catch (error) {
            throw error;
        }
    },

    //  DELETE: 채팅방 삭제
    deleteChatRooms: async (chatRoomIds: number[]) => {
        try {
            const res = await api.delete(`/chat-rooms`, {
                params: { chatRoomIds },
                paramsSerializer: { indexes: null },
            });

            return res.data;
        } catch (error) {
            throw error;
        }
    },
};
