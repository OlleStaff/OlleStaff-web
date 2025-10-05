import { useCallback } from "react";

export const useClipboard = () => {
    const copy = useCallback(async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            // TODO: 복사됨 토스트 메시지
            //  showToast("복사 성공!"),
        } catch (err) {
            // showToast("복사를 실패했습니다. 다시 시도해주세요."),
        }
    }, []);

    return { copy };
};
