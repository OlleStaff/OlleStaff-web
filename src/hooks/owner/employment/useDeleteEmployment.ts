import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteEmployment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (employmentIds: number[]) =>
            axios.delete(`${import.meta.env.VITE_API_BASE_URL}/employments`, {
                withCredentials: true,
                data: employmentIds,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["employmentList"] });
        },
    });
};
