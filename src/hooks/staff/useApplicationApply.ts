import { useMutation } from "@tanstack/react-query";
import api from "@/apis/axios";

export const useApplicationApply = () => {
    return useMutation({
        mutationFn: async (employmentId: string) => {
            const { data } = await api.post("/apply", {}, { params: { employmentId } });
            return data;
        },
    });
};
