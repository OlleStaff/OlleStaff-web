import { useMutation } from "@tanstack/react-query";
import { ChatApi } from "../api/chat";

type AcceptProps = {
    applicantUserId: number;
    employmentId: number;
};

export const usePostAcceptApplicant = () => {
    return useMutation({
        mutationFn: ({ applicantUserId, employmentId }: AcceptProps) =>
            ChatApi.postAcceptApplicant(applicantUserId, employmentId),
        // onError: () => showToast("합격 처리에 실패했습니다. 다시 시도해주세요."),
    });
};
