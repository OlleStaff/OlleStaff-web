import { QueryCache, MutationCache, QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { errorMessages } from "@/constants/errorMessages";

function getErrorMessage(error: unknown): string {
    if (error instanceof AxiosError) {
        const status = error.response?.status;
        const bodyStatus = error.response?.data?.status;

        if (status && bodyStatus && errorMessages[bodyStatus]) {
            return errorMessages[bodyStatus];
        }

        if (status && errorMessages[status]) {
            return errorMessages[status];
        }
    }
    return "알 수 없는 오류가 발생했어요. 잠시 후 다시 시도해주세요.";
}

export const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: error => {
            // TODO: 모달 컴포넌트
            console.error("에러상위통합처리", getErrorMessage(error));
        },
    }),
    mutationCache: new MutationCache({
        onError: error => {
            // TODO: 모달 컴포넌트
            console.error("에러상위통합처리", getErrorMessage(error));
        },
    }),
});
