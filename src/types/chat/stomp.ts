import { BaseMessage } from "./common";

// 채팅방 동적 정보
export interface ChatRoomLive {
    lastMessage: string; // 가장 최근 메시지
    timestamp: number; // 최근 메시지 시간
    unreadCount: number; // 안 읽은 메시지 수
}

// 메시지 세부 타입
export interface TextMessage extends BaseMessage {
    messageType: "TEXT";
    content: string;
}

export interface PhotoMessage extends BaseMessage {
    messageType: "PHOTO";
    content: string[]; // 이미지 URL 배열
}

export interface FileMessage extends BaseMessage {
    messageType: "FILE";
    content: {
        name: string;
        link: string;
    };
}

export interface ApplicantMessage extends BaseMessage {
    messageType: "APPLICANT";
    content: {
        title: string;
        detail: string;
        ApplicantId: number;
    };
}

export interface AcceptedMessage extends BaseMessage {
    messageType: "ACCEPTED";
    content: {
        title: string;
        detail: string;
        EmploymentId: number;
    };
}

export type ChatMessage = TextMessage | PhotoMessage | FileMessage | ApplicantMessage | AcceptedMessage;
