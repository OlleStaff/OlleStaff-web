import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EmploymentApi } from "@/apis/employment";
import { EmploymentPutProps } from "@/types/employment";

export const usePutEmployment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ formData, imageFiles }: { formData: EmploymentPutProps; imageFiles: File[] }) =>
            EmploymentApi.putEmployment(formData, imageFiles),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["employmentList"] });
        },
        onError: error => {
            console.error("공고 수정 실패", error);
        },
    });
};
