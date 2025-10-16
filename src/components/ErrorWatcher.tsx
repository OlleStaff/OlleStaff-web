import Modal from "@/components/Modal";
import { useErrorStore } from "@/store/useErrorStore";

export default function ErrorWatcher() {
    const isOpen = useErrorStore(state => state.isOpen);
    const message = useErrorStore(state => state.message);
    const clearError = useErrorStore(state => state.clearError);

    if (!isOpen) {
        return null;
    }

    return (
        <Modal
            variant="error"
            title="오류가 발생했어요"
            message={message}
            confirmText="확인"
            handleModalClose={clearError}
            onConfirm={clearError}
        />
    );
}
