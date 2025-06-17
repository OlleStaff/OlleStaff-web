import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            includeAssets: ["favicon.svg", "images/apple-touch-icon.png", "images/logo_192.png", "images/logo_512.png"],
            manifest: {
                name: "olleStaff",
                short_name: "olle",
                start_url: "/",
                scope: "/",
                display: "standalone",
                background_color: "#ffffff",
                theme_color: "#00C6BE",
                icons: [
                    {
                        src: "images/logo_192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "images/logo_512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
            },
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
});
