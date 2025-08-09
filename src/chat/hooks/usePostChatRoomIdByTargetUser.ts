import { useMutation } from "@tanstack/react-query";
import { ChatRoomApi } from "../api/chatroom";

export const usePostCreateChatRoom = () => {
    return useMutation({
        mutationFn: (targetUserId: number) => ChatRoomApi.postCreateChatRoom(targetUserId),
    });
};
