import { useQuery } from "@tanstack/react-query";
import { ChatRoomPreview } from "../types/chatRooms";
import { ChatRoomApi } from "../api/chatroom";

export const useGetChatList = () => {
    return useQuery<ChatRoomPreview[]>({
        queryKey: ["chatList"],
        queryFn: ChatRoomApi.getChatRoomsALL,
    });
};
