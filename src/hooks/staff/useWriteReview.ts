import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface CreateReviewForm {
    rating: number;
    review: string;
    disclosure: boolean;
    images: File[];
    employmentId: number;
}

export function useWriteReview() {
    return useMutation({
        mutationFn: async (form: CreateReviewForm) => {
            const formData = new FormData();
            formData.append("rating", String(form.rating));
            formData.append("review", form.review);
            formData.append("disclosure", String(form.disclosure));
            formData.append("employmentId", String(form.employmentId));
            form.images.forEach(file => {
                formData.append("images", file);
            });

            const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/reviews`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });
            return data;
        },
    });
}
