import { useSessionStore } from "@/store/useSessionStore";
import Modal from "@/components/Modal";
import { useNavigate } from "react-router-dom";

export default function SessionWatcher() {
    const expired = useSessionStore(state => state.expired);
    const setExpired = useSessionStore(state => state.setExpired);
    const navigate = useNavigate();

    if (!expired) return null;

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
            onConfirm={() => {
                setExpired(false);
                navigate("/");
            }}
            handleModalClose={() => {
                setExpired(false);
                navigate("/");
            }}
        />
    );
}
