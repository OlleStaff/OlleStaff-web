import { useCallback } from "react";
import { usePostChatFiles, usePostChatImages } from "./usePostImagesAndFiles";
import { useChatMessenger } from "./useChatMessenger";

type ContentType = "image" | "file";

export function useChatPickAndSend(roomId: number) {
    const { mutateAsync: uploadImages } = usePostChatImages();
    const { mutateAsync: uploadFile } = usePostChatFiles();
    const { sendImages, sendFile } = useChatMessenger(roomId);

    const pickAndSend = useCallback(
        (type: ContentType) => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = type === "image" ? "image/*" : "*/*";
            input.multiple = true;

            input.onchange = async () => {
                const files = Array.from(input.files ?? []);
                if (!files.length) return;

                try {
                    if (type === "image") {
                        const fd = new FormData();
                        files.forEach(f => fd.append("images", f));
                        const urls = await uploadImages(fd);
                        if (urls?.length) await sendImages(urls);
                    } else {
                        for (const f of files) {
                            const fd = new FormData();
                            fd.append("file", f);
                            const meta = await uploadFile(fd);
                            await sendFile(meta);
                        }
                    }
                } finally {
                    input.value = "";
                }
            };

            input.click();
        },
        [uploadImages, uploadFile, sendImages, sendFile]
    );

    return { pickAndSend };
}
