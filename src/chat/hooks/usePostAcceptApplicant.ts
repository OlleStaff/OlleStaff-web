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

        onSuccess: (_data, { applicantUserId, employmentId }) => {
            console.log(`${applicantUserId} 공고 ${employmentId}에 합격`);
        },

        onError: (error, { applicantUserId, employmentId }) => {
            console.error(`${applicantUserId} 공고 ${employmentId}에 합격 처리 실패`, error);
        },
    });
};
