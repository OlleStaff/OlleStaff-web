import { EmploymentApi } from "@/apis/employment/employment";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteEmployment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (employmentIds: number[]) => EmploymentApi.deleteEmployment(employmentIds),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["employmentList"] });
        },
        // onError: () => showToast("공고 삭제를 실패했습니다. 다시 시도해주세요."),
    });
};

export const useDeleteLikeRecruit = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (employmentId: number) => EmploymentApi.deleteLikeRecruit(employmentId),
        onSuccess: (_data, employmentId) => {
            queryClient.invalidateQueries({ queryKey: ["employmentList"] });
            queryClient.invalidateQueries({ queryKey: ["employmentDetail", employmentId] });
            queryClient.invalidateQueries({ queryKey: ["myLikeRecruit"] });
        },
        // onError: () => showToast("좋아요 취소를 실패했습니다. 다시 시도해주세요."),
    });
};
