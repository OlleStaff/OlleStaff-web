import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface UpdateProfileForm {
    nickname: string;
    phone: string;
    phoneVerificationCode?: string;
    image?: File | null;
    deleteImage: boolean;
}

export function useUpdateUserProfile() {
    return useMutation({
        mutationFn: async (form: UpdateProfileForm) => {
            const formData = new FormData();
            formData.append("nickname", form.nickname);
            formData.append("phone", form.phone);
            if (form.phoneVerificationCode) {
                formData.append("phoneVerificationCode", form.phoneVerificationCode);
            }

            // deleteImage 가 false인 경우만 image를 첨부
            if (!form.deleteImage && form.image) {
                formData.append("image", form.image);
            }

            formData.append("deleteImage", String(form.deleteImage));

            const { data } = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/users`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });

            return data;
        },
    });
}
