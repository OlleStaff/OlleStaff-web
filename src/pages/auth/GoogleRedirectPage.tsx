import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/apis/axios";
import LoadingSpinner from "@/components/LoadingSpinner";
// import { fetchMinimumUserInfo } from "@/hooks/user/useFetchMinumumUserInfo";

export default function GoogleRedirectPage() {
    const navigate = useNavigate();

    useEffect(() => {
        api.post(`/login/dev`, {
            pid: "hoon123",
            authority: "NEED_SIGNUP",
        })
            .then(async res => {
                const { status } = res.data;
                if (status === "USER_NEED_SIGNUP") {
                    navigate("/staff");
                } else if (status === "SUCCESS") {
                    navigate("/staff/");
                    // const userInfo = await fetchMinimumUserInfo();
                    // if (userInfo.userType === "STAFF") {
                    //     navigate("/staff/");
                    // } else if (userInfo.userType === "GUESTHOUSE") {
                    //     navigate("/owner/");
                    // } else if (userInfo.userType === "UNDECIDED") {
                    //     navigate("/type-select");
                    // } else {
                    //     navigate("/");
                    // }
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
