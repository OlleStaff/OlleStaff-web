import { useQuery } from "@tanstack/react-query";
import { EmploymentApi } from "@/apis/employment";
import { EmploymentGetProps } from "@/types/employment";

export const useEmploymentDetail = (employmentId: number) =>
    useQuery<{ data: EmploymentGetProps }>({
        queryKey: ["employment", employmentId],
        queryFn: () => EmploymentApi.getEmploymentDetail(employmentId!),
        enabled: !!employmentId, // undefined일 때 요청 막기
    });
