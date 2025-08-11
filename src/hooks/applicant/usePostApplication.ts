import { useMutation } from "@tanstack/react-query";
import api from "@/apis/axios";

export const usePostApplication = () => {
    return useMutation({
        mutationFn: async (formData: FormData) => {
            const response = await api.post(`${import.meta.env.VITE_API_BASE_URL}/applicants`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });

            return response.data;
        },
    });
};
