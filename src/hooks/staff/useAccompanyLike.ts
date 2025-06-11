import axios from "axios";

export const useAccompanyLike = () => {
    const postAccompanyLike = async (accompanyId: number) => {
        const res = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/accompanies/${accompanyId}/likes`,
            {},
            {
                withCredentials: true,
            }
        );
        return res.data;
    };

    const deleteAccompanyLike = async (accompanyId: number) => {
        const res = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/accompanies/${accompanyId}/likes`, {
            withCredentials: true,
        });
        return res.data;
    };

    return { postAccompanyLike, deleteAccompanyLike };
};
