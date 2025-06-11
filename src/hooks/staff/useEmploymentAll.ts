import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GuesthouseListItemProps } from "@/types/guesthouse";
import { isClosed } from "@/utils/date";

interface UseEmploymentAllProps {
    type: "ALL" | "IN_PROGRESS" | "END";
    search?: string;
    pageSize?: number;
    cursorId?: number;
    category?: string;
    enabled?: boolean;
}

export const useEmploymentAll = ({
    type,
    search = "",
    pageSize = 10,
    cursorId,
    category,
    enabled = true,
}: UseEmploymentAllProps) => {
    return useQuery<GuesthouseListItemProps[]>({
        queryKey: ["employmentAll", type, search, pageSize, cursorId, category],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/employments/all`, {
                params: {
                    ...(cursorId !== undefined && { cursorId }),
                    pageSize,
                    type,
                    category,
                    search,
                },
                withCredentials: true,
            });

            const list = data.data.employmentPreviewDTOS;

            return list.map((item: GuesthouseListItemProps) => ({
                ...item,
                closed: isClosed(item.recruitmentEnd),
            }));
        },
        enabled,
        staleTime: 1000 * 60,
    });
};
