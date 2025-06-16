import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import ImageUploader from ".";

const meta: Meta<typeof ImageUploader> = {
    title: "Components/ImageUploader",
    component: ImageUploader,
};

export default meta;

export const Default: StoryObj<typeof ImageUploader> = {
    render: () => {
        return (
            <div style={{ maxWidth: 360 }}>
                <ImageUploader maxImages={6} />
            </div>
        );
    },
};

export const ThreeLimit: StoryObj<typeof ImageUploader> = {
    render: () => {
        const [files, setFiles] = useState<File[]>([]);

        return (
            <div style={{ maxWidth: 360 }}>
                <ImageUploader maxImages={3} onChange={({ files }) => setFiles(files)} />
                <p style={{ marginTop: 12 }}>최대 3장 제한, 현재: {files.length}개</p>
            </div>
        );
    },
};
