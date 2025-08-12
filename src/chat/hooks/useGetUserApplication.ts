import { useQuery } from "@tanstack/react-query";
import { ApplyApi } from "../api/apply";

export const useGetUserApplication = (applicantUserId: number) => {
    return useQuery({
        queryKey: ["userApplication", applicantUserId],
        queryFn: () => ApplyApi.getUserApplication(applicantUserId),
        enabled: Number.isFinite(applicantUserId) && applicantUserId > 0,
    });
};
