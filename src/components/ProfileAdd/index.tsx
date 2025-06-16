import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import theme from "@/styles/theme";

type ProfileAddProps = {
    onImageChange?: (file: File) => void;
    previewImageUrl?: string | null;
    disabled?: boolean;
};

export default function ProfileAdd({ onImageChange, previewImageUrl, disabled }: ProfileAddProps) {
    const [preview, setPreview] = useState<string | null>(previewImageUrl ?? null);

    useEffect(() => {
        if (previewImageUrl) {
            setPreview(previewImageUrl);
        }
    }, [previewImageUrl]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        setPreview(url);
        onImageChange?.(file);
    };

    return (
        <Wrapper>
            <Frame>
                {preview ? (
                    <ProfileImage src={preview} alt="프로필 이미지" />
                ) : (
                    <DefaultIcon src="/icons/user.svg" alt="기본 프로필" />
                )}
            </Frame>
            <UploadButton htmlFor="profile-upload" disabled={disabled}>
                <CameraIcon src="/icons/cameraIcon.svg" alt="업로드 아이콘" />
            </UploadButton>
            <HiddenInput
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={disabled}
            />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    position: relative;
    width: 130px;
    height: 126px;
    cursor: pointer;
`;

const Frame = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 116px;
    height: 116px;
    border-radius: 12px;
    border: 1px solid ${theme.color.Gray2};
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ProfileImage = styled.img`
    width: 100%;
    height: 100%;
`;

const DefaultIcon = styled.img`
    width: 118px;
    height: 118px;
`;

const UploadButton = styled.label<{ disabled?: boolean }>`
    position: absolute;
    bottom: 0px;
    right: 0px;
    background-color: ${theme.color.White};
    border: 1px solid ${theme.color.Gray2};
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
    opacity: ${({ disabled }) => (disabled ? 0 : 1)};
    pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`;

const CameraIcon = styled.img`
    width: 24px;
    height: 24px;
`;

const HiddenInput = styled.input`
    display: none;
`;
