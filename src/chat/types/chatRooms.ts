import { ChatMessage } from "./messages";

export interface ChatRoomBase {
    id: number;
    title: string;
    image: string;
}

export interface ChatRoomLive {
    lastMessage: ChatMessage;
    unreadMessageCount: number;
}

export interface ChatRoomPreview extends ChatRoomBase, ChatRoomLive {}
