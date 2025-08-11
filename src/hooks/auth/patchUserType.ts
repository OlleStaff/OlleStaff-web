import api from "@/apis/axios";

export const patchUserType = async (type: "STAFF" | "GUESTHOUSE") => {
    try {
        const formattedType = type;

        const response = await api.patch(
            `${import.meta.env.VITE_API_BASE_URL}/users/type`,
            { type: formattedType },
            { withCredentials: true }
        );

        if (response.data.status !== "SUCCESS") {
            throw new Error("타입 업데이트 실패");
        }
    } catch (error) {
        console.error("patchUserType 에러:", error);
        throw error;
    }
};
