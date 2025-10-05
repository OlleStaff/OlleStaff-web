import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatRoomApi } from "../api/chatroom";
import { useGetChatList } from "./useGetChatList";

export function useStartOrGetChat() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { refetch } = useGetChatList("ALL");

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
                // showToast("다시 시도해주세요."),
            }

            const createdRoomId = await ChatRoomApi.postCreateChatRoom(targetUserId);

            if (!createdRoomId) throw new Error("roomId가 없습니다.");
            await refetch();
            navigate(`/chat/${createdRoomId}`);
        } catch (e) {
            // showToast("다시 시도해주세요."),
        } finally {
            setIsLoading(false);
        }
    };

    return { startOrGet, isLoading };
}
