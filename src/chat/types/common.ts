import { ChatRoomBase } from "./rest";
import { ChatRoomLive } from "./stomp";

// 채팅방 리스트
export interface ChatRoomPreview extends ChatRoomLive {
    id: number;
    title: string;
    image: string;
}

// 채팅방 상세 페이지
export interface ChatRoomDetail extends ChatRoomBase {}

export type MessageType = "TEXT" | "PHOTO" | "FILE" | "APPLICANT" | "ACCEPTED";

export interface BaseMessage {
    id: string;
    chatroomId: number;
    senderId: number;
    timestamp: number;
    messageType: MessageType;
}
