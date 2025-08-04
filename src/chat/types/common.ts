export type MessageType = "TEXT" | "PHOTO" | "FILE" | "APPLICANT" | "ACCEPTED";

export interface BaseMessage<T> {
    id: string;
    chatRoomId: number;
    senderId: number;
    timestamp: number;
    messageType: MessageType;
    content: T;
}
