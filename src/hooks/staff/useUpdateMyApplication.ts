import { useMutation } from "@tanstack/react-query";
import api from "@/apis/axios";

export const useUpdateMyApplication = () => {
    return useMutation({
        mutationFn: async (formData: FormData) => {
            const { data } = await api.put(`/applicants/my`, formData);
            return data;
        },
    });
};
