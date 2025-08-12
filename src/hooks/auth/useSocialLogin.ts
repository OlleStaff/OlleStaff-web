import { useUserStore } from "@/store/useUserStore";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "@/apis/axios";
import { fetchMinimumUserInfo } from "../user/useFetchMinumumUserInfo";
import { isApp, saveAppToken, getAppToken } from "@/utils/authToken";

type SocialLoginParams = {
    code?: string;
    state?: string;
    accessToken?: string;
};

export const useSocialLogin = (provider: "kakao" | "naver" | "dev") => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async ({ code, accessToken, state }: SocialLoginParams) => {
            const payload: Record<string, any> = {};
            if (code) payload.code = code;
            if (accessToken) payload.accessToken = accessToken;
            if (state) payload.state = state;

            const { data } = await api.post(`/login/${provider}`, payload);

            if (data.status === "USER_NEED_SIGNUP") {
                return { status: "USER_NEED_SIGNUP" as const };
            }

            // 앱 플로우
            if (isApp) {
                const jwt = data?.data?.accessToken;
                if (!jwt) {
                    console.warn("[login] isApp인데 accessToken 없음:", data);
                    throw new Error("앱 로그인 응답에 accessToken이 없음.");
                }

                // 1) 우선 헤더에 직접 실어 me 호출 (인터셉터 타이밍 이슈 회피)
                const me = await api.get("/users/me/minimum", {
                    headers: { Authorization: `Bearer ${jwt}` },
                });

                // 2) 저장(메모리 캐시+Preferences)해 이후 요청은 인터셉터가 자동 부착
                await saveAppToken(jwt);
                const stored = await getAppToken();
                console.log("[login] saved token:", stored);

                return {
                    status: "SUCCESS" as const,
                    nickname: me.data.data.nickname,
                    userType: me.data.data.type,
                    profileImage: me.data.data.profileImage,
                };
            }

            // 웹 플로우
            const userInfo = await fetchMinimumUserInfo();
            return {
                status: "SUCCESS" as const,
                nickname: userInfo.nickname,
                userType: userInfo.userType,
                profileImage: userInfo.profileImage,
            };
        },

        onSuccess: res => {
            if (res.status === "USER_NEED_SIGNUP") {
                navigate("/agreements");
                return;
            }
            useUserStore.getState().setUser({
                nickname: res.nickname,
                type: res.userType,
                profileImage: res.profileImage,
            });
            if (res.userType === "UNDECIDED") navigate("/type-select");
            else if (res.userType === "STAFF") navigate("/staff/");
            else if (res.userType === "GUESTHOUSE") navigate("/owner/");
            else navigate("/");
        },

        onError: err => {
            console.error(`${provider} 로그인 실패`, err);
        },
    });
};
