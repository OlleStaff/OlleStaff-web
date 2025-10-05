import api from "@/apis/axios";

export const patchUserType = async (type: "STAFF" | "GUESTHOUSE") => {
    try {
        const formattedType = type;

        const response = await api.patch(`/users/type`, { type: formattedType });

        if (response.data.status !== "SUCCESS") {
            throw new Error("타입 업데이트 실패");
        }
    } catch (error) {
        throw error;
    }
};
