import { useEffect, useState } from "react";

const App = () => {
    const [permission, setPermission] = useState<NotificationPermission>("default");
    const [ready, setReady] = useState(false);

    // 초기 권한 상태 확인만 (요청은 X)
    useEffect(() => {
        if ("Notification" in window) {
            setPermission(Notification.permission);
            console.log("초기 알림 권한 상태:", Notification.permission);
        }
    }, []);

    // 푸시 구독: granted 상태일 때만
    useEffect(() => {
        if ("serviceWorker" in navigator && "PushManager" in window && permission === "granted") {
            navigator.serviceWorker.ready.then(async (registration) => {
                try {
                    await registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array(
                            "BPLuUCuJZ3O0Kxrg2VD7Mk80a_xxsdKByb68ceH-p3JZZ5xHGKjlyAyKz09xGoB-vnIXG8ddGJfAcxkQo3j8VGw"
                        ),
                    });
                    console.log("Push 구독 성공");
                } catch (err) {
                    console.warn("Push 구독 실패:", err);
                }
            });
        } else {
            console.log("⏭️ 푸시 구독 생략 (권한 없음)");
        }

        // 최소 로딩 시간 확보 → 화면 뜬 후 홈화면 추가 유도
        setTimeout(() => setReady(true), 1500);
    }, [permission]);

    // base64 → Uint8Array 변환
    function urlBase64ToUint8Array(base64String: string) {
        const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
        const rawData = window.atob(base64);
        return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
    }

    // 알림 권한 요청 버튼 (default일 때만 의미 있음)
    const handleRequestPermission = () => {
        if ("Notification" in window && permission === "default") {
            Notification.requestPermission().then((perm) => {
                console.log("알림 권한 요청 결과:", perm);
                setPermission(perm);
            });
        } else {
            alert("이미 알림 권한 상태가 결정된 상태입니다: " + permission);
        }
    };

    // 알림 테스트
    const handleSendNotification = () => {
        if (permission === "granted") {
            new Notification("알림 테스트", {
                body: "설치형 PWA 알림 성공!",
            });
        } else {
            alert("알림 권한이 허용되지 않았습니다.");
        }
    };

    // 초기 로딩 중
    if (!ready)
        return (
            <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
                <p>앱 초기화 중입니다... 잠시만 기다려주세요.</p>
            </main>
        );

    // 렌더링 완료 후
    return (
        <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
            <h1>PWA 알림 테스트</h1>
            <p>
                현재 알림 권한: <strong>{permission}</strong>
            </p>
            <button onClick={handleRequestPermission} style={{ marginRight: "1rem", padding: "0.5rem 1rem" }}>
                알림 권한 요청하기
            </button>
            <button onClick={handleSendNotification} style={{ padding: "0.5rem 1rem" }}>
                알림 보내기
            </button>
        </main>
    );
};

export default App;
