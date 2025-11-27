import Modal from "@/components/Modal";
import { useErrorStore } from "@/store/useErrorStore";
import { useNavigate } from "react-router-dom";

export default function ErrorWatcher() {
    const isOpen = useErrorStore(state => state.isOpen);
    const message = useErrorStore(state => state.message);
    const clearError = useErrorStore(state => state.clearError);
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleClose = () => {
        if (
            message.includes("요청한 데이터를 찾을 수 없습니다") ||
            message.includes("서버 오류") ||
            message.includes("찾을 수 없")
        ) {
            navigate("/", { replace: true });
        }
        clearError();
    };

    return (
        <Modal
            variant="error"
            title="오류가 발생했어요"
            message={message}
            confirmText="확인"
            handleModalClose={handleClose}
            onConfirm={handleClose}
        />
    );
}
