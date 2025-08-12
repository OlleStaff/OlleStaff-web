import { useMutation } from "@tanstack/react-query";
import api from "@/apis/axios";

export const usePostApplication = () => {
    return useMutation({
        mutationFn: async (formData: FormData) => {
            const response = await api.post(`/applicants`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            return response.data;
        },
    });
};
