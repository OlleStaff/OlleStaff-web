import { SendMessagePayload } from "../types/websocket";
import { stompClient } from "./connectStomp";

// 채팅 메세지 웹소켓으로 전송
export const sendChatMessage = (payload: SendMessagePayload) => {
    try {
        if (stompClient.connected) {
            stompClient.publish({
                destination: "/app/chat/send",
                body: JSON.stringify(payload),
            });
        } else {
            console.warn("websocket 메세지 전송 실패");
        }
    } catch (error) {
        console.error("메세지 전송 중 에러 발생", error);
    }
};
