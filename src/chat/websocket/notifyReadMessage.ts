import { ReadMessagePayload } from "../types/websocket";
import { stompClient } from "./connectStomp";

// 메시지 읽음 처리 (메세지 최초 조회, 새로운 메세지 받아 렌더링 할 때 마다 -> 맨 마지막 메세지 읽음 처리하기)
export const notifyReadMessage = (message: ReadMessagePayload) => {
    if (!stompClient.connected) {
        console.warn("websocket 읽음 처리 실패");
        return;
    }
    stompClient.publish({
        destination: "/app/chat/read",
        body: JSON.stringify(message),
    });
    console.log("websocket 읽음 처리 :", message);
};
