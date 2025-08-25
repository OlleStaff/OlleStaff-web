import { useQuery } from "@tanstack/react-query";
import { ApplyApi } from "../api/apply";

export const useGetMyRecruitmentsAppliedByUser = (applicantUserId: number) => {
    return useQuery({
        queryKey: ["myRecruitmentsAppliedByUser", applicantUserId],
        queryFn: async () => {
            const res = await ApplyApi.getMyRecruitmentsAppliedByUser(applicantUserId!);
            return res ?? [];
        },
        enabled: typeof applicantUserId === "number",
    });
};
