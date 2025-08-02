import { EmploymentPostProps } from "@/types/employment";
import axios from "axios";

export const EmploymentApi = {
    // GET: 공고 상세 조회
    getEmploymentDetail: async (employmentId: number) =>
        await axios
            .get(`${import.meta.env.VITE_API_BASE_URL}/employments/${employmentId}`, {
                withCredentials: true,
            })
            .then(res => res.data),

    // POST: 나의 공고 등록
    postEmployment: async (employment: EmploymentPostProps, imageFiles: File[]) => {
        try {
            const formData = new FormData();

            // employment 객체를 JSON string으로 변환하여 append
            const employmentBlob = new Blob([JSON.stringify(employment)], { type: "application/json" });
            formData.append("employment", employmentBlob);

            // 이미지 파일 (없더라도 images 필드는 보내야 안전함)
            if (imageFiles.length > 0) {
                imageFiles.forEach(file => {
                    formData.append("images", file); // 동일 key로 여러 개 전송
                });
            } else {
                formData.append("images", new Blob([]), "empty.jpg");
            }

            // 디버깅용 코드
            for (const pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }

            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/employments`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });

            console.log("등록 완료", res.data);
            return res.data;
        } catch (error) {
            console.error("공고 등록 실패", error);
            throw error; // 필요 시 상위 컴포넌트에서 에러 처리 가능하도록
        }
    },
    // PUT: 나의 공고 수정
    putEmployment: async (formData: FormData) =>
        await axios.put(`${import.meta.env.VITE_API_BASE_URL}/employments`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
        }),

    deleteEmployment: async (employmentIds: number[]) =>
        await axios
            .delete(`${import.meta.env.VITE_API_BASE_URL}/employments`, {
                withCredentials: true,
                data: employmentIds,
            })
            .then(res => res.data),
};
