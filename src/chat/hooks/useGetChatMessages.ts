import { useQuery } from "@tanstack/react-query";
import { ChatApi } from "../api/chat";

export const useGetChatMessages = (chatRoomId: number) => {
    return useQuery({
        queryKey: ["chatMessages", chatRoomId],
        queryFn: () => ChatApi.getChatMessages(chatRoomId),
        enabled: typeof chatRoomId === "number", // id 없거나 0이면 호출 막기
    });
};
