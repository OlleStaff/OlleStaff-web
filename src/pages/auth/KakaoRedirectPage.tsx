import { useEffect } from "react";
import { useSocialLogin } from "@/hooks/auth/useSocialLogin";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function KakaoRedirectPage() {
    const { mutate: kakaoLogin } = useSocialLogin("kakao");

    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get("code");
        if (code) {
            kakaoLogin({ code });
        }
    }, []);

    return <LoadingSpinner />;
}
