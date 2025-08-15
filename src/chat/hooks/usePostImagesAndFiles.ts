import { useMutation } from "@tanstack/react-query";
import { ChatApi } from "../api/chat";

export const usePostChatImages = () => {
    return useMutation({
        mutationFn: (formData: FormData) => ChatApi.postChatImages(formData),
        onError: e => console.error("채팅 이미지 업로드 실패", e),
    });
};

export const usePostChatFiles = () => {
    return useMutation({
        mutationFn: (formData: FormData) => ChatApi.postChatFiles(formData),
        onError: e => console.error("채팅 파일 업로드 실패", e),
    });
};
