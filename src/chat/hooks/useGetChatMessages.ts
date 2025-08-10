import { useQuery } from "@tanstack/react-query";
import { ChatApi } from "../api/chat";
import { ChatMessage } from "../types/messages";

export const useGetChatMessages = (chatRoomId: number) => {
    return useQuery<ChatMessage[]>({
        queryKey: ["chatMessages", chatRoomId],
        queryFn: () => ChatApi.getChatMessages(chatRoomId),
        enabled: typeof chatRoomId === "number", // id 없거나 0이면 호출 막기
    });
};
