import axios from "axios";
import { Capacitor } from "@capacitor/core";
import { getAppToken } from "@/utils/authToken";
import { useUserStore } from "@/store/useUserStore";
import { useSessionStore } from "@/store/useSessionStore";

const isApp = Capacitor.isNativePlatform();

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});

// 요청 인터셉터 - 앱이면 Authorization 붙이기
api.interceptors.request.use(async config => {
    if (isApp) {
        const token = await getAppToken();
        config.headers = config.headers || {};
        (config.headers as any)["X-Platform"] = "Mobile";
        if (token) {
            (config.headers as any).Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

api.interceptors.response.use(
    res => res,
    error => {
        const status = error.response?.status;
        if (status === 401 || status === 419) {
            // 사용자 정보 리셋
            useUserStore.getState().resetUser();
            // 세션 만료 flag
            useSessionStore.getState().setExpired(true);
        }
        return Promise.reject(error);
    }
);

export default api;
