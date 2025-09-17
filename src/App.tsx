import { useEffect, useState } from "react";

function App() {
    const [permission, setPermission] = useState(Notification.permission);

    // 알림 권한 요청
    useEffect(() => {
        if ("Notification" in window) {
            Notification.requestPermission().then(perm => {
                setPermission(perm);
            });
        }
    }, []);

    // pushManager 구독 (권한 granted인 경우만)
    useEffect(() => {
        if (permission !== "granted") return;

        if ("serviceWorker" in navigator && "PushManager" in window) {
            navigator.serviceWorker.ready.then(registration => {
                registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(
                        "BPLuUCuJZ3O0Kxrg2VD7Mk80a_xxsdKByb68ceH-p3JZZ5xHGKjlyAyKz09xGoB-vnIXG8ddGJfAcxkQo3j8VGw"
                    ),
                });
            });
        }
    }, [permission]);

    function urlBase64ToUint8Array(base64String: string) {
        const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
        const rawData = window.atob(base64);
        return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
    }

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>올래스텝 프로젝트 🚀</h1>
            <p>프론트엔드 기본 화면입니다.</p>
            <p>현재 알림 권한: {permission}</p>
        </div>
    );
}

export default App;
