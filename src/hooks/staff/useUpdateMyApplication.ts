import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useUpdateMyApplication = () => {
    return useMutation({
        mutationFn: async (formData: FormData) => {
            const { data } = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/applicants/my`, formData, {
                withCredentials: true,
            });
            return data;
        },
    });
};
