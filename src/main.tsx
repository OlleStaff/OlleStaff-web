import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router/index.tsx";
import theme from "./styles/theme.ts";
import { ThemeProvider } from "@emotion/react";
import { Global } from "@emotion/react";
import { GlobalStyle } from "./styles/GlobalStyle.ts";
import { Capacitor } from "@capacitor/core";
import { StatusBar, Style } from "@capacitor/status-bar";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./apis/queryClient.ts";

if (Capacitor.isNativePlatform()) {
    StatusBar.setOverlaysWebView({ overlay: true }); // 웹뷰가 상태바 밑으로 확장
    StatusBar.setStyle({ style: Style.Dark }); // 상태바 텍스트 색상
}

createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
            <Global styles={GlobalStyle} />
        </ThemeProvider>
    </QueryClientProvider>
);
