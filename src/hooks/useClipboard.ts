import { useCallback } from "react";

export const useClipboard = () => {
    const copy = useCallback(async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            // TODO: 복사됨 토스트 메시지
            console.log("복사 완료");
        } catch (err) {
            console.error("클립보드 복사 실패", err);
        }
    }, []);

    return { copy };
};
