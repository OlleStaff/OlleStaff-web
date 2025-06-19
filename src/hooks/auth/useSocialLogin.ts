import { useUserStore } from "@/store/useUserStore";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchMinimumUserInfo } from "../user/useFetchMinumumUserInfo";

type SocialLoginParams = {
    code: string;
    state?: string;
};

export const useSocialLogin = (provider: "kakao" | "naver" | "dev") => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async ({ code, state }: SocialLoginParams) => {
            const loginRes = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/login/${provider}`,
                { code, state },
                { withCredentials: true }
            );

            if (loginRes.data.status === "USER_NEED_SIGNUP") {
                return { status: "USER_NEED_SIGNUP" };
            }

            const userInfo = await fetchMinimumUserInfo();

            return {
                status: "SUCCESS",
                nickname: userInfo.nickname,
                userType: userInfo.userType,
                profileImage: userInfo.profileImage,
            };
        },

        onSuccess: res => {
            if (res.status === "USER_NEED_SIGNUP") {
                navigate("/agreements");
            } else {
                useUserStore.getState().setUser({
                    nickname: res.nickname,
                    type: res.userType,
                    profileImage: res.profileImage,
                });
                if (res.userType === "UNDECIDED") {
                    navigate("/type-select");
                } else if (res.userType === "STAFF") {
                    navigate("/staff/");
                } else if (res.userType === "GUESTHOUSE") {
                    navigate("/owner/");
                } else {
                    console.warn("알 수 없는 사용자 유형입니다.");
                    navigate("/");
                }
            }
        },

        onError: err => {
            console.error(`${provider} 로그인 실패`, err);
        },
    });
};
