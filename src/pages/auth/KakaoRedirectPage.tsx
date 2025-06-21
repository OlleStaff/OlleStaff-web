import { useEffect } from "react";
import { useSocialLogin } from "@/hooks/auth/useSocialLogin";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function KakaoRedirectPage() {
    const { mutate: kakaoLogin } = useSocialLogin("kakao");

    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get("code");
        if (code) {
            kakaoLogin({ code });
        } else {
            console.error("카카오 로그인 코드가 없습니다.");
        }
    }, []);

    return <LoadingSpinner />;
}
