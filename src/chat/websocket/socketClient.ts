import { Client } from "@stomp/stompjs";

export const stompClient = new Client({
    brokerURL: import.meta.env.VITE_WEBSOCKET_URL,
    reconnectDelay: 5000,
    debug: str => console.log("[STOMP] :::", str),
});
