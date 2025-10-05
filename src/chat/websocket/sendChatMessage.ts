import { SendMessagePayload } from "../types/websocket";
import { stompClient, activateStomp } from "./connectStomp";

const delay = (ms: number) => new Promise<void>(res => setTimeout(res, ms));

export async function waitForConnect(connectTimeoutMs = 3000, connectionCheckMs = 100) {
    const deadlineTime = Date.now() + connectTimeoutMs;
    while (!stompClient.connected) {
        if (Date.now() > deadlineTime) throw new Error("‼️‼️‼️ WS 연결 끊김");
        await delay(connectionCheckMs);
    }
}

// 채팅 메세지 웹소켓으로 전송
export const sendChatMessage = async (payload: SendMessagePayload) => {
    try {
        activateStomp();
        await waitForConnect();
        if (stompClient.connected) {
            stompClient.publish({
                destination: "/app/chat/send",
                body: JSON.stringify(payload),
            });
        }
    } catch (error) {
        // showToast("메시지 전송을 실패했습니다. 다시 시도해주세요."),
    }
};
