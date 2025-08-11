import api from "@/apis/axios";

export const useAccompanyLike = () => {
    const postAccompanyLike = async (accompanyId: number) => {
        const res = await api.post(`/accompanies/${accompanyId}/likes`);
        return res.data;
    };

    const deleteAccompanyLike = async (accompanyId: number) => {
        const res = await api.delete(`/accompanies/${accompanyId}/likes`);
        return res.data;
    };

    return { postAccompanyLike, deleteAccompanyLike };
};
