import { useQuery } from "@tanstack/react-query";
import { ApplyApi } from "../api/apply";

export const useGetOtherUserApplication = (applicantUserId: number) => {
    return useQuery({
        queryKey: ["userApplication", applicantUserId],
        queryFn: () => ApplyApi.getOtherUserApplication(applicantUserId),
        enabled: Number.isFinite(applicantUserId) && applicantUserId > 0,
    });
};
