import { useQuery } from "@tanstack/react-query";
import { ChatRoomApi } from "../api/chatroom";

export const useGetChatRoomDetail = (chatRoomId: number) => {
    return useQuery({
        queryKey: ["chatRoomDetail", chatRoomId],
        queryFn: () => ChatRoomApi.getChatRoomDetail(chatRoomId),
        enabled: typeof chatRoomId === "number", // id 없으면 요청 x
    });
};
