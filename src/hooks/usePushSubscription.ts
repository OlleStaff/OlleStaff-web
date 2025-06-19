import axios from "axios";

export const usePushSubscription = () => {
    const postSubscription = async () => {
        if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;

        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
            console.warn("알림 권한이 허용되지 않았습니다.");
            return;
        }

        const registration = await navigator.serviceWorker.ready;

        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(""),
        });

        const res = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/push/subscribe`,
            { subscription },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        return res.data;
    };

    return { postSubscription };
};

// Base64 Uint8Array 변환 함수
function urlBase64ToUint8Array(base64String: string) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}
