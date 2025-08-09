import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatRoomApi } from "../api/chatroom";
import { useGetChatList } from "./useGetChatList";

export function useStartOrGetChat() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { refetch } = useGetChatList();

    const startOrGet = async (targetUserId: number) => {
        setIsLoading(true);
        try {
            try {
                const foundRoomId = await ChatRoomApi.getChatRoomByTargetUser(targetUserId);
                if (foundRoomId) {
                    navigate(`/chat/${foundRoomId}`);
                    return;
                }
            } catch (e) {
                console.error(e);
            }

            const createdRoomId = await ChatRoomApi.postCreateChatRoom(targetUserId);

            if (!createdRoomId) throw new Error("roomId가 없습니다.");
            await refetch();
            navigate(`/chat/${createdRoomId}`);
        } catch (e) {
            console.error("채팅 시작 실패", e);
        } finally {
            setIsLoading(false);
        }
    };

    return { startOrGet, isLoading };
}
