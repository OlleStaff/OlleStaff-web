import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            includeAssets: ["favicon.svg", "icon-192.png", "icon-512.png", "apple-touch-icon.png"],
            manifest: {
                name: "olle-step-web",
                short_name: "Olle",
                start_url: "/",
                scope: "/",
                display: "standalone",
                background_color: "#ffffff",
                theme_color: "#317EFB",
                icons: [
                    {
                        src: "icon-192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "icon-512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
            },
            workbox: {
                globPatterns: ["**/*.{js,css,html,ico,png,svg,json}"], // precache 자산 명시
            },
        }),
    ],
    server: {
        host: true,
        allowedHosts: true, // ngrok 등 외부 도메인 허용
    },
});
