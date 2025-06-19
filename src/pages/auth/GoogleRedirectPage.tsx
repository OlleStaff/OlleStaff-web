import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function GoogleRedirectPage() {
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .post(
                `${import.meta.env.VITE_API_BASE_URL}/login/dev`,
                {
                    pid: "hoon123",
                    authority: "NEED_SIGNUP",
                },
                { withCredentials: true }
            )
            .then(res => {
                const { status } = res.data;
                console.log("개발용 구글 로그인 응답:", res.data);

                if (status === "USER_NEED_SIGNUP") {
                    navigate("/signup");
                } else {
                    navigate("/");
                }
            })
            .catch(err => {
                console.error("개발용 구글 로그인 실패", err);
            });
    }, []);

    return <LoadingSpinner />;
}
