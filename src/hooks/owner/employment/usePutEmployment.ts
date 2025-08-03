import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EmploymentApi } from "@/apis/employment/employment";

export const usePutEmployment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (formData: FormData) => EmploymentApi.putEmployment(formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["employmentList"] });
        },
        onError: error => {
            console.error("공고 수정 실패", error);
        },
    });
};
