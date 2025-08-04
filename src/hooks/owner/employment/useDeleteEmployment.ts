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
