import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EmploymentApi } from "@/apis/employment/employment";
import { EmploymentPostProps } from "@/types/employment";

export const usePostEmployment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ employment, imageFiles }: { employment: EmploymentPostProps; imageFiles: File[] }) =>
            EmploymentApi.postEmployment(employment, imageFiles),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["employmentList"] });
        },
        onError: error => {
            console.error("공고 등록 실패", error);
        },
    });
};
