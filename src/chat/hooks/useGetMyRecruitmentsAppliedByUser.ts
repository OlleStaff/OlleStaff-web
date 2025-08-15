import { useQuery } from "@tanstack/react-query";
import { ApplyApi } from "../api/apply";

export const useGetMyRecruitmentsAppliedByUser = (applicantUserId: number) => {
    return useQuery({
        queryKey: ["myRecruitmentsAppliedByUser", applicantUserId],
        queryFn: async () => {
            const list = await ApplyApi.getMyRecruitmentsAppliedByUser(applicantUserId!);
            console.log("hook hook 해당 지원자가 우리 게하에 지원한 게하 공고 보기");
            return Array.isArray(list) ? list : [];
        },
        enabled: typeof applicantUserId === "number",
    });
};
