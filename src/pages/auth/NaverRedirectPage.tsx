import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function NaverRedirectPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get("code");
        const state = new URL(window.location.href).searchParams.get("state");

        console.log(code);

        if (code) {
            axios
                .get(`${import.meta.env.VITE_API_BASE_URL}/login/oauth/naver?code=${code}&state=${state}`, {
                    withCredentials: true,
                })
                .then((res) => {
                    console.log(res);

                    const { status } = res.data;

                    if (status === "USER_NEED_SIGNUP") {
                        navigate("/signup");
                    } else {
                        navigate("/");
                    }
                })
                .catch((err) => {
                    console.error("네이버 로그인 실패", err);
                });
        }
    }, []);

    return <div>로그인 처리 중입니다...</div>;
}
