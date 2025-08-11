import { ChatMessage, MessageContentMap, MessageType } from "./messages";

export type SendMessagePayload<K extends MessageType = MessageType> = {
    chatRoomId: number;
    messageType: K;
    content: MessageContentMap[K];
};

export type ReceiveMessagePayload = ChatMessage;
export type ReadMessagePayload = ChatMessage;
