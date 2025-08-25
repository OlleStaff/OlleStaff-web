import { StompSubscription, IFrame } from "@stomp/stompjs";
import { ReceiveMessagePayload } from "../types/websocket";
import { stompClient } from "./connectStomp";

type Unsubscribe = () => void;

// 메세지 수신 처리 (res: 받은 메세지)
export const receiveChatMessage = (callback: (message: ReceiveMessagePayload) => void): Unsubscribe => {
    const subscribe = (): StompSubscription =>
        stompClient.subscribe("/user/queue/chat", message => {
            const parsed = JSON.parse(message.body) as ReceiveMessagePayload;
            callback(parsed);
        });

    let sub: StompSubscription | null = null;

    if (stompClient.connected) {
        sub = subscribe();
        return () => sub?.unsubscribe();
    }

    if (!stompClient.active) {
        stompClient.activate();
    }

    const prevOnConnect = stompClient.onConnect;
    const handler = (frame: IFrame) => {
        if (!sub) sub = subscribe();

        stompClient.onConnect = prevOnConnect;
        prevOnConnect?.(frame);
    };
    stompClient.onConnect = handler;

    return () => {
        if (stompClient.onConnect === handler) {
            stompClient.onConnect = prevOnConnect;
        }
        sub?.unsubscribe();
    };
};
