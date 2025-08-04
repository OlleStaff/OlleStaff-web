import { SendMessagePayload } from "../types/websocket";
import { stompClient } from "./socketClient";

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
