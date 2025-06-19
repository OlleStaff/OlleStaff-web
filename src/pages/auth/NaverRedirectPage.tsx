import { useEffect } from "react";
import { useSocialLogin } from "@/hooks/auth/useSocialLogin";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function NaverRedirectPage() {
    const { mutate: naverLogin } = useSocialLogin("naver");

    useEffect(() => {
        const url = new URL(window.location.href);
        const code = url.searchParams.get("code");
        const state = url.searchParams.get("state");
        const savedState = sessionStorage.getItem("naver_auth_state");

        if (!code) {
            console.error("네이버 로그인 코드가 없습니다.");
            return;
        }

        if (state !== savedState) {
            console.error("CSRF 의심 요청입니다.");
            return;
        }

        naverLogin({ code, state: state ?? undefined });
    }, []);

    return <LoadingSpinner />;
}
