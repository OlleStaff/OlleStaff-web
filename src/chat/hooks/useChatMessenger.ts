import { useCallback } from "react";
import { useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { sendChatMessage } from "../websocket/sendChatMessage";
import { BaseMessage, ChatMessage, MessageContentMap, MessageType } from "../types/messages";
import { useUserStore } from "@/store/useUserStore";

type ChatPage = { messages: ChatMessage[] };
type opts = { applicantId?: number };

export function useChatMessenger(roomId: number, opts?: opts) {
    const queryClient = useQueryClient();
    const userId = useUserStore(u => u.id);
    const userType = useUserStore(u => u.type);
    const senderId = userType === "GUESTHOUSE" ? opts?.applicantId : userId;

    const patch = useCallback(
        (func: (pages: ChatPage[]) => ChatPage[]) => {
            queryClient.setQueryData<InfiniteData<ChatPage>>(["chatMessages", roomId], curr => {
                const base: InfiniteData<ChatPage> = curr ?? { pages: [], pageParams: [] };
                return { ...base, pages: func(base.pages) };
            });
        },
        [queryClient, roomId]
    );

    const send = useCallback(
        async <K extends MessageType>(type: K, content: MessageContentMap[K]) => {
            const id = uuidv4();
            const optimistic: BaseMessage<K, MessageContentMap[K]> = {
                id,
                chatRoomId: roomId,
                senderId: Number(senderId),
                messageType: type,
                content,
                timestamp: Date.now(),
            };

            patch(pages => {
                if (pages.length === 0) return [{ messages: [optimistic as ChatMessage] }];
                const last = pages[pages.length - 1];
                const nextLast: ChatPage = { ...last, messages: [...last.messages, optimistic as ChatMessage] };
                return [...pages.slice(0, -1), nextLast];
            });

            try {
                await sendChatMessage({ chatRoomId: roomId, messageType: type, content });
            } catch (e) {
                patch(pages => pages.map(p => ({ ...p, messages: p.messages.filter(m => m.id !== id) })));
                throw e;
            }
        },
        [patch, roomId, senderId]
    );

    return {
        sendText: (text: string) => send("TEXT", { text }),
        sendImages: (images: string[]) => send("IMAGE", { images }),
        sendFile: (file: MessageContentMap["FILE"]) => send("FILE", file),
        sendApplicant: (payload: MessageContentMap["APPLICANT"]) => send("APPLICANT", payload),
        sendAccepted: (payload: MessageContentMap["ACCEPTED"]) => send("ACCEPTED", payload),
        send,
    };
}
