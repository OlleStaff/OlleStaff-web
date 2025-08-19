import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ChatRoomPreview } from "@/chat/types/chatRooms";
import { notifyReadMessage } from "@/chat/websocket/notifyReadMessage";
import { ReadMessagePayload } from "@/chat/types/websocket";

export function useMarkLatestMessageRead() {
    const queryClient = useQueryClient();

    const markLatestMessageRead = useCallback(
        (roomId: number, lastMsg: ReadMessagePayload) => {
            if (lastMsg) notifyReadMessage(lastMsg);

            const targets = queryClient.getQueryCache().findAll({ queryKey: ["chatList"] });
            for (const target of targets) {
                const key = target.queryKey;
                queryClient.setQueryData<ChatRoomPreview[]>(key, prev =>
                    prev?.map(room => (room.id === roomId ? { ...room, unreadMessageCount: 0 } : room))
                );
            }

            queryClient.invalidateQueries({ queryKey: ["chatList"] });
        },
        [queryClient]
    );

    return { markLatestMessageRead };
}
