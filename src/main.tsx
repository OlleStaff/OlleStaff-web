// main.tsx
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router/index.tsx";
import theme from "./styles/theme.ts";
import { ThemeProvider } from "@emotion/react";
import { Global } from "@emotion/react";
import { GlobalStyle } from "./styles/GlobalStyle.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
            <Global styles={GlobalStyle} />
        </ThemeProvider>
    </QueryClientProvider>
);

if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission().then(perm => {
        console.log("🔔 알림 권한 요청 결과:", perm);

        if (perm === "granted" && "serviceWorker" in navigator && "PushManager" in window) {
            navigator.serviceWorker.ready.then(registration => {
                registration.pushManager
                    .subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array(
                            "BPLuUCuJZ3O0Kxrg2VD7Mk80a_xxsdKByb68ceH-p3JZZ5xHGKjlyAyKz09xGoB-vnIXG8ddGJfAcxkQo3j8VGw"
                        ),
                    })
                    .then(sub => {
                        console.log("✅ 푸시 구독 성공:", sub);
                    })
                    .catch(err => {
                        console.warn("❌ 푸시 구독 실패:", err);
                    });
            });
        }
    });
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}
