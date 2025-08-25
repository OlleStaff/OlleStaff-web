import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChatRoomApi } from "../api/chatroom";

export const useDeleteChatRooms = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (chatRoomIds: number[]) => ChatRoomApi.deleteChatRooms(chatRoomIds),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["chatList"] });
        },
        onError: e => {
            console.error("채팅방 삭제 실패", e);
        },
    });
};
