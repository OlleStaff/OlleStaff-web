import { useSessionStore } from "@/store/useSessionStore";
import { useUserStore } from "@/store/useUserStore";
import Modal from "@/components/Modal";
import { useLocation, useNavigate } from "react-router-dom";
import { isPublicPath } from "@/router/isPublicPath";

export default function SessionWatcher() {
    const expired = useSessionStore(state => state.expired);
    const setExpired = useSessionStore(state => state.setExpired);
    const resetUser = useUserStore(state => state.resetUser);
    const location = useLocation();
    const navigate = useNavigate();

    if (!expired) return null;

    const handleClose = () => {
        setExpired(false);
        resetUser();
        if (!isPublicPath(location.pathname)) {
            navigate("/", { replace: true, state: { from: location } });
        }
    };

    return (
        <Modal
            variant="default"
            title="세션 만료"
            message={
                <>
                    로그인 세션이 만료되었습니다.
                    <br />
                    다시 로그인해주세요.
                </>
            }
            confirmText="확인"
            onConfirm={handleClose}
            handleModalClose={handleClose}
        />
    );
}
