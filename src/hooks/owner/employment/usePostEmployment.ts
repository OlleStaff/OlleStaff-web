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

export const usePostLikeRecruit = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (employmentId: number) => EmploymentApi.postLikeRecruit(employmentId),

        onSuccess: employmentId => {
            queryClient.invalidateQueries({ queryKey: ["employmentList"] });
            queryClient.invalidateQueries({ queryKey: ["employmentDetail", employmentId] });
            queryClient.invalidateQueries({ queryKey: ["myLikeRecruit"] });
        },

        onError: err => {
            console.error("좋아요 등록 실패", err);
        },
    });
};
