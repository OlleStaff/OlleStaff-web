import api from "@/apis/axios";

export const useAccompanyLike = () => {
    const postAccompanyLike = async (accompanyId: number) => {
        const res = await api.post(
            `${import.meta.env.VITE_API_BASE_URL}/accompanies/${accompanyId}/likes`,
            {},
            {
                withCredentials: true,
            }
        );
        return res.data;
    };

    const deleteAccompanyLike = async (accompanyId: number) => {
        const res = await api.delete(`${import.meta.env.VITE_API_BASE_URL}/accompanies/${accompanyId}/likes`, {
            withCredentials: true,
        });
        return res.data;
    };

    return { postAccompanyLike, deleteAccompanyLike };
};
