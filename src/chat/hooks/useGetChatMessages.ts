import { useInfiniteQuery } from "@tanstack/react-query";

import { ChatApi } from "../api/chat";

export function useGetChatMessages(chatRoomId: number, size = 20) {
    return useInfiniteQuery({
        queryKey: ["chatMessages", chatRoomId],
        queryFn: ({ pageParam }) => ChatApi.getChatMessages(chatRoomId, pageParam, size),
        initialPageParam: undefined,
        getNextPageParam: lastPage => (lastPage.hasNext ? (lastPage.cursor ?? undefined) : undefined),
        enabled: Number.isFinite(chatRoomId), // chatRoomId가 유효할때만
    });
}
