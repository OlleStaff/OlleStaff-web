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
        // onError: () => showToast("공고 등록을 실패했습니다. 다시 시도해주세요."),
    });
};

export const usePostLikeRecruit = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (employmentId: number) => EmploymentApi.postLikeRecruit(employmentId),

        onSuccess: employmentId => {
            queryClient.invalidateQueries({ queryKey: ["employmentList"] });
            queryClient.invalidateQueries({ queryKey: ["employmentDetail", employmentId] });
            queryClient.invalidateQueries({ queryKey: ["myLikeRecruit"] });
        },
    });
};
