import { Client } from "@stomp/stompjs";
import { receiveChatMessage } from "./receiveChatMessage";
import { ReceiveMessagePayload } from "../types/websocket";

export const stompClient = new Client({
    brokerURL: import.meta.env.VITE_WEBSOCKET_URL,
    reconnectDelay: 5000,
    heartbeatIncoming: 10000,
    heartbeatOutgoing: 10000,
    debug: str => console.log("[STOMP] :::", str),
});

// 웹소켓 연결과 동시에 메세지 구독 설정
export const connectStomp = (onMessageReceived: (message: ReceiveMessagePayload) => void) => {
    if (stompClient.active) {
        return;
    }

    stompClient.onConnect = () => {
        receiveChatMessage(onMessageReceived);
    };

    stompClient.onStompError = frame => {
        console.error("❌ STOMP 연결 실패", frame);
    };

    stompClient.onWebSocketClose = evt => {
        console.warn("연결 끊김", evt.code, evt.reason);
        stompClient.reconnectDelay = Math.min((stompClient.reconnectDelay || 5000) * 1.5, 15000);
    };

    stompClient.activate();
};

export function activateStomp() {
    if (!stompClient.active) stompClient.activate();
}
