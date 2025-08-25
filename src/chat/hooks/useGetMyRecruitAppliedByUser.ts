import { useQuery } from "@tanstack/react-query";
import { ApplyApi } from "../api/apply";

export const useGetMyRecruitmentsAppliedByUser = (applicantUserId: number) => {
    return useQuery({
        queryKey: ["myRecruitmentsAppliedByUser", applicantUserId],
        queryFn: () => ApplyApi.getMyRecruitmentsAppliedByUser(applicantUserId!),
        enabled: Number.isFinite(applicantUserId),
    });
};
