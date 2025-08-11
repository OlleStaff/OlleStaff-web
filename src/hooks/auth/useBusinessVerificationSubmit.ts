import { useMutation } from "@tanstack/react-query";
import api from "@/apis/axios";

export interface BusinessVerificationRequest {
    businessName: string;
    businessRegistrationCertificate: File;
    agreement: string;
}

export const useBusinessVerificationSubmit = () => {
    return useMutation({
        mutationFn: async (data: BusinessVerificationRequest) => {
            const formData = new FormData();
            formData.append("businessName", data.businessName);
            formData.append("businessRegistrationCertificate", data.businessRegistrationCertificate);
            formData.append("agreement", data.agreement);

            const response = await api.post(`/users/guesthouse/business-registration`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            return response.data;
        },
    });
};
