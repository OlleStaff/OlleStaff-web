import { useMutation } from "@tanstack/react-query";
import api from "@/apis/axios";

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

            const { data } = await api.post(`/reviews`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return data;
        },
    });
}
