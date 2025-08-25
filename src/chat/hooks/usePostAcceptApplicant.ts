import { useMutation } from "@tanstack/react-query";
import { ChatApi } from "../api/chat";

type AcceptProps = {
    applicantId: number;
    employmentId: number;
};

export const usePostAcceptApplicant = () => {
    return useMutation({
        mutationFn: ({ applicantId, employmentId }: AcceptProps) =>
            ChatApi.postAcceptApplicant(applicantId, employmentId),

        onSuccess: (_data, { applicantId }) => {
            console.log(`${applicantId} 합격`);
        },

        onError: (error, { applicantId }) => {
            console.error(`${applicantId} 합격 처리 실패`, error);
        },
    });
};
