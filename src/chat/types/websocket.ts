import { BaseMessage, MessageType } from "./common";

export interface MessageContent {
    textContent?: { text: string };
    imageContent?: { images: string[] };
    fileContent?: { name: string; link: string };
    applicantContent?: {
        applicantId: number;
        employmentId: number;
        title: string;
        detail: string;
    };
    acceptedContent?: {
        employmentId: number;
        title: string;
        detail: string;
    };
}

export interface SendMessagePayload {
    chatRoomId: number;
    messageType: MessageType;
    content: MessageContent;
}

export interface ReceiveMessagePayload extends BaseMessage<MessageContent> {}
export interface ReadMessagePayload extends BaseMessage<MessageContent> {}
