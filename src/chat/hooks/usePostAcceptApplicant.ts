import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChatApi } from "../api/chat";

type Vars = {
    applicantId: number;
    employmentId: number;
};

type UseAcceptOptions = {
    /** 현재 채팅방 아이디가 있으면 메시지 목록 갱신 */
    chatRoomId?: number;
    onSuccess?: () => void;
    onError?: (e: unknown) => void;
};

export function useAcceptApplicant(opts?: UseAcceptOptions) {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: ({ applicantId, employmentId }: Vars) => ChatApi.postAcceptApplicant(applicantId, employmentId),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["chatList"] });
            if (opts?.chatRoomId) {
                qc.invalidateQueries({ queryKey: ["chatMessages", opts.chatRoomId] });
            }
            opts?.onSuccess?.();
        },
        onError: err => {
            console.error("합격 처리 실패", err);
            opts?.onError?.(err);
        },
    });
}
