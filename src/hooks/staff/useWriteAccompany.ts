import api from "@/apis/axios";

export const useWriteAccompany = () => {
    const postAccompany = async ({ title, content, images }: { title: string; content: string; images: File[] }) => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);

        images.forEach(image => {
            formData.append("images", image);
        });

        const res = await api.post(`${import.meta.env.VITE_API_BASE_URL}/accompanies`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
        });

        return res.data;
    };

    return { postAccompany };
};
