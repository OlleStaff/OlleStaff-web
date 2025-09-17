import { useMutation } from "@tanstack/react-query";
import { ChatApi } from "../api/chat";

export const usePostChatImages = () => {
    return useMutation({
        mutationFn: (formData: FormData) => ChatApi.postChatImages(formData),
        // onError: () => showToast("채팅 이미지 업로드를 실패했습니다. 다시 시도해주세요."),
    });
};

export const usePostChatFiles = () => {
    return useMutation({
        mutationFn: (formData: FormData) => ChatApi.postChatFiles(formData),
        // onError: () => showToast("채팅 파일 업로드를 실패했습니다. 다시 시도해주세요."),
    });
};
