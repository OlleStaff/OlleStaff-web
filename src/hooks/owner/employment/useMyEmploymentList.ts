import { GuesthouseListItemProps } from "@/types/guesthouse";
import { isClosed } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// owner 관점에서 사용하는 내 공고 조회 (전체 | 진행중 | 마감)
export const useMyEmploymentList = () => {
    return useQuery<GuesthouseListItemProps[]>({
        queryKey: ["guesthouseList"],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/employments`, {
                params: {
                    cursor: null,
                    pageSize: 20,
                    type: "ALL",
                },
                withCredentials: true,
            });

            const list = data.data.employmentPreviewDTOS;

            return list.map((item: GuesthouseListItemProps) => ({
                ...item,
                closed: isClosed(item.recruitmentEnd),
            }));
        },
    });
};
