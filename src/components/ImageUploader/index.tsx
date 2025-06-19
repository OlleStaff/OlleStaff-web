import { useRef, useState, useEffect } from "react";
import styled from "@emotion/styled";
import theme from "@/styles/theme";
import { Text } from "@/styles/Text";

interface ImageUploaderProps {
    maxImages?: number;
    previewImageUrls?: string[];
    onChange?: (data: {
        urls: string[]; // 기존 이미지 URL
        files: File[]; // 새 이미지 파일들
        names: string[]; // 전체 순서 (URL or 파일명)
    }) => void;
}

export default function ImageUploader({ maxImages = 6, previewImageUrls = [], onChange }: ImageUploaderProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [imageFiles, setImageFiles] = useState<File[]>([]);

    const totalCount = imageUrls.length + imageFiles.length;

    useEffect(() => {
        if (previewImageUrls.length > 0) {
            setImageUrls(previewImageUrls);
        }
    }, [previewImageUrls]);

    const triggerChange = (urls: string[], files: File[]) => {
        onChange?.({
            urls,
            files,
            names: [...urls, ...files.map(file => file.name)],
        });
    };

    const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || !files[0]) return;

        const newFile = files[0];
        const total = imageUrls.length + imageFiles.length + 1;
        if (total > maxImages) return;

        const updatedFiles = [...imageFiles, newFile];
        setImageFiles(updatedFiles);
        triggerChange(imageUrls, updatedFiles);
    };

    const handleRemoveUrlImage = (index: number) => {
        const updatedUrls = imageUrls.filter((_, i) => i !== index);
        setImageUrls(updatedUrls);
        triggerChange(updatedUrls, imageFiles);
    };

    const handleRemoveFileImage = (index: number) => {
        const updatedFiles = imageFiles.filter((_, i) => i !== index);
        setImageFiles(updatedFiles);
        triggerChange(imageUrls, updatedFiles);
    };

    return (
        <div>
            <Description>
                <Text.Body3_1 style={{ color: theme.color.Gray4 }}>
                    * 최대 {maxImages}개의 사진을 첨부할 수 있습니다.
                </Text.Body3_1>
                <Text.Body3_1 style={{ color: theme.color.Gray4 }}>
                    {totalCount} / {maxImages}
                </Text.Body3_1>
            </Description>
            <Grid maxCount={maxImages}>
                {imageUrls.map((url, index) => (
                    <ImageItem key={`url-${index}`}>
                        <ImagePreview>
                            <img src={url} alt={`image-url-${index}`} />
                        </ImagePreview>
                        <RemoveButton onClick={() => handleRemoveUrlImage(index)} />
                    </ImageItem>
                ))}

                {imageFiles.map((file, index) => (
                    <ImageItem key={`${file.name}-${file.lastModified}`}>
                        <ImagePreview>
                            <img src={URL.createObjectURL(file)} alt={`image-file-${index}`} />
                        </ImagePreview>
                        <RemoveButton onClick={() => handleRemoveFileImage(index)} />
                    </ImageItem>
                ))}

                {totalCount < maxImages && (
                    <AddButton onClick={() => fileInputRef.current?.click()}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleAddImage}
                            ref={fileInputRef}
                            style={{ display: "none" }}
                        />
                    </AddButton>
                )}
            </Grid>
        </div>
    );
}

const Description = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
`;

const Grid = styled.div<{ maxCount: number }>`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
`;

const ImageItem = styled.div`
    position: relative;
`;

const ImagePreview = styled.div`
    width: 100%;
    padding-top: 100%;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid ${theme.color.Main};

    position: relative;

    img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const RemoveButton = styled.button`
    position: absolute;
    top: -4px;
    right: -4px;
    width: 16px;
    height: 16px;
    border: none;
    background-color: transparent;
    background-image: url("/icons/removeButton.svg");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    z-index: 1;
`;

const AddButton = styled.div`
    position: relative;
    padding-top: 100%;
    border: 1px dashed ${theme.color.Gray2};
    border-radius: 8px;
    background-color: ${theme.color.White};
    cursor: pointer;
    background-image: url("/icons/cameraGroup.svg");
    background-size: 40%;
    background-repeat: no-repeat;
    background-position: center;
`;
