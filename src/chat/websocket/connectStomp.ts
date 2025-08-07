import { Client } from "@stomp/stompjs";
import { receiveChatMessage } from "./receiveChatMessage";
import { ReceiveMessagePayload } from "../types/websocket";

export const stompClient = new Client({
    brokerURL: import.meta.env.VITE_WEBSOCKET_URL,
    reconnectDelay: 5000,
    debug: str => console.log("[STOMP] :::", str),
});

// 웹소켓 연결과 동시에 메세지 구독 설정
export const connectStomp = (onMessageReceived: (message: ReceiveMessagePayload) => void) => {
    if (stompClient.active) {
        console.log("STOMP 클라이언트 이미 연결됨");
        return;
    }

    stompClient.onConnect = () => {
        console.log("✅ STOMP 연결 성공");
        receiveChatMessage(onMessageReceived);
    };

    stompClient.onStompError = frame => {
        console.error("❌ STOMP 연결 실패", frame);
    };

    stompClient.activate();
};
