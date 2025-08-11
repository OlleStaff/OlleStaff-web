import { ReceiveMessagePayload } from "../types/websocket";
import { stompClient } from "./connectStomp";

// 메세지 수신 처리 (res: 받은 메세지)
export const receiveChatMessage = (callback: (message: ReceiveMessagePayload) => void) => {
    stompClient.subscribe("/user/queue/chat", message => {
        const parsed = JSON.parse(message.body);
        callback(parsed);
    });
};
