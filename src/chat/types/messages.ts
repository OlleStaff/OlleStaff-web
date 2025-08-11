export type MessageType = "TEXT" | "IMAGE" | "FILE" | "APPLICANT" | "ACCEPTED";

export type MessageContentMap = {
    TEXT: { text: string };
    IMAGE: { images: string[] };
    FILE: { name: string; link: string };
    APPLICANT: { applicantId: number; employmentId: number; title: string; detail: string };
    ACCEPTED: { employmentId: number; title: string; detail: string };
};

export interface BaseMessage<K extends MessageType, T> {
    id: string;
    chatRoomId: number;
    senderId: number;
    timestamp: number;
    messageType: K;
    content: T;
}
export type ChatMessage = { [K in MessageType]: BaseMessage<K, MessageContentMap[K]> }[MessageType];
