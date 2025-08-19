import { useQuery } from "@tanstack/react-query";
import { ChatRoomPreview } from "../types/chatRooms";
import { ChatRoomApi, ChatRoomsFilter } from "../api/chatroom";

export const useGetChatList = (filter: ChatRoomsFilter) => {
    return useQuery<ChatRoomPreview[]>({
        queryKey: ["chatList", filter],
        queryFn: () => ChatRoomApi.getChatRoomsALL(filter),
    });
};
