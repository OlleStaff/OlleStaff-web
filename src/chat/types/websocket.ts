import { BaseMessage, MessageType } from "./common";

export type MessageContent =
    | { text: string }
    | { images: string[] }
    | { name: string; link: string }
    | { applicantId: number; employmentId: number; title: string; detail: string }
    | { employmentId: number; title: string; detail: string };

export interface SendMessagePayload {
    chatRoomId: number;
    messageType: MessageType;
    content: MessageContent;
}

export interface ReceiveMessagePayload extends BaseMessage<MessageContent> {}
export interface ReadMessagePayload extends BaseMessage<MessageContent> {}
