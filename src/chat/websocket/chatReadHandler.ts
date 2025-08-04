import { ReadMessagePayload } from "../types/websocket";
import { stompClient } from "./socketClient";

export const sendReadMessage = (message: ReadMessagePayload) => {
    if (stompClient.connected) {
        stompClient.publish({
            destination: "/app/chat/read",
            body: JSON.stringify(message),
        });
        console.log("websocket 읽음 처리 :", message);
    } else {
        console.warn("websocket 읽음 처리 실패");
    }
};
