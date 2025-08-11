import { useMutation } from "@tanstack/react-query";
import api from "@/apis/axios";

export const useUpdateMyApplication = () => {
    return useMutation({
        mutationFn: async (formData: FormData) => {
            const { data } = await api.put(`${import.meta.env.VITE_API_BASE_URL}/applicants/my`, formData, {
                withCredentials: true,
            });
            return data;
        },
    });
};
