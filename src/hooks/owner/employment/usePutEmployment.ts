import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EmploymentApi } from "@/apis/employment/employment";

export const usePutEmployment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (formData: FormData) => EmploymentApi.putEmployment(formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["employmentList"] });
        },
        // onError: () => showToast("공고 수정을 실패했습니다. 다시 시도해주세요."),
    });
};
