import { GuesthouseListItemProps } from "@/types/guesthouse";
import { isClosed } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import api from "@/apis/axios";

// owner 관점에서 사용하는 내 공고 조회 (전체 | 진행중 | 마감)
export const useGetMyEmploymentList = () => {
    return useQuery<GuesthouseListItemProps[]>({
        queryKey: ["employmentList"],
        queryFn: async () => {
            const { data } = await api.get(`/employments`, {
                params: {
                    cursor: null,
                    pageSize: 20,
                    type: "ALL",
                },
            });

            const list = data.data.employmentPreviewDTOS;

            return list.map((item: GuesthouseListItemProps) => ({
                ...item,
                closed: isClosed(item.recruitmentEnd),
            }));
        },
    });
};
