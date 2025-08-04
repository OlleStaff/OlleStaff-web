import { ReceiveMessagePayload } from "../types/websocket";
import { stompClient } from "./socketClient";

export const subscribeChatMessage = (callback: (message: ReceiveMessagePayload) => void) => {
    stompClient.onConnect = () => {
        stompClient.subscribe("/user/queue/chat", message => {
            const parsed = JSON.parse(message.body);
            callback(parsed);
        });
    };
};
