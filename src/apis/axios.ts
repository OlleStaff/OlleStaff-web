import axios from "axios";
import { Capacitor } from "@capacitor/core";
import { getAppToken } from "@/utils/authToken";

const isApp = Capacitor.isNativePlatform();

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});

// 요청 인터셉터 - 앱이면 Authorization 붙이기
api.interceptors.request.use(async config => {
    if (isApp) {
        const token = await getAppToken();
        if (token) {
            config.headers = config.headers || {};
            (config.headers as any).Authorization = `Bearer ${token}`;
            (config.headers as any)["X-Platform"] = "Mobile";
        } else {
            config.headers = config.headers || {};
            (config.headers as any)["X-Platform"] = "Mobile";
        }
    }
    console.log("[req]", config.method, config.url, JSON.stringify(config.headers));

    return config;
});

export default api;
