import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChatRoomApi } from "../api/chatroom";

export const useDeleteChatRooms = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (chatRoomIds: number[]) => ChatRoomApi.deleteChatRooms(chatRoomIds),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["chatList"] });
        },
        // onError: () => showToast("채팅방 삭제를 실패했습니다. 다시 시도해주세요."),
    });
};
