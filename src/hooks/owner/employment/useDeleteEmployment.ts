import { EmploymentApi } from "@/apis/employment/employment";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteEmployment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (employmentIds: number[]) => EmploymentApi.deleteEmployment(employmentIds),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["employmentList"] });
        },
        onError: error => {
            console.error("공고 삭제 실패", error);
        },
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
        onError: err => {
            console.error("좋아요 취소 실패", err);
        },
    });
};
