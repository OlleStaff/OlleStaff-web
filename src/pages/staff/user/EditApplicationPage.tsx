import { useState, useEffect } from "react";
import PageWrapper from "@/components/PageWrapper";
import Header from "@/components/Header";
import { Button } from "@/components/Button";
import { Text } from "@/styles/Text";
import styled from "@emotion/styled";
import ProfileAdd from "@/components/ProfileAdd";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import ImageUploader from "@/components/ImageUploader";
import { useNavigate } from "react-router-dom";
import { useFetchMyApplication } from "@/hooks/staff/useFetchMyApplication";
import { useUserStore } from "@/store/useUserStore";
import Modal from "@/components/Modal";
import { Wrapper } from "@/styles/Wrapper";
import { useUpdateMyApplication } from "@/hooks/staff/useUpdateMyApplication";

export default function EditApplicationPage() {
    const navigate = useNavigate();
    const { data } = useFetchMyApplication();
    const { mutate: updateApplication } = useUpdateMyApplication();

    const nickname = useUserStore(state => state.nickname);

    const [isEditMode, setIsEditMode] = useState(false);
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [imageNames, setImageNames] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        mbti: "",
        link: "",
        introduction: "",
        appeal: "",
    });
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

    useEffect(() => {
        if (data) {
            setFormData({
                mbti: data.mbti,
                link: data.link,
                introduction: data.introduction,
                appeal: data.appeal,
            });

            setProfileImage(null);
            setProfileImageUrl(data.profileImage ?? null);

            setImageUrls(data.images || []);
            setImageFiles([]); // 새 파일 없음
            setImageNames(data.images || []); // 초기에는 전체 images가 기존 URL
        }
    }, [data]);

    const handleUpdate = () => {
        const fd = new FormData();

        Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
        if (profileImage) {
            fd.append("newProfileImage", profileImage);
        }
        imageNames.forEach(name => {
            fd.append("images", name);
        });
        imageFiles.forEach(file => {
            fd.append("newImages", file);
        });

        updateApplication(fd, {
            onSuccess: () => {
                setIsCompleteModalOpen(true);
                setTimeout(() => {
                    setIsCompleteModalOpen(false);
                    navigate("/staff/userinfo");
                }, 1500);
            },
            onError: err => {
                console.error(err);
                alert("수정에 실패했습니다.");
            },
        });

        setIsCompleteModalOpen(true);
    };

    const isFormModified =
        profileImage !== null ||
        formData.mbti !== data?.mbti ||
        formData.link !== data?.link ||
        formData.introduction !== data?.introduction ||
        formData.appeal !== data?.appeal ||
        imageFiles.length > 0 ||
        JSON.stringify(imageNames) !== JSON.stringify(data?.images || []);

    return (
        <>
            <Header
                showBackButton
                title="지원서 수정"
                rightIconSrc={isEditMode ? undefined : "/icons/pencil.svg"}
                onRightClick={() => setIsEditMode(true)}
            />
            <PageWrapper hasHeader>
                <FormWrapper>
                    <ProfileSection>
                        <ProfileAdd
                            onImageChange={setProfileImage}
                            previewImageUrl={profileImageUrl}
                            disabled={!isEditMode}
                        />
                        <Text.Title3_1>{nickname}</Text.Title3_1>
                    </ProfileSection>

                    <FieldGroup>
                        <Text.Body1_1>MBTI</Text.Body1_1>
                        <Input
                            value={formData.mbti}
                            onChange={e => setFormData(prev => ({ ...prev, mbti: e.target.value }))}
                            readOnly={!isEditMode}
                        />
                    </FieldGroup>

                    <Textarea
                        textareaTitle="자기소개 및 지원동기"
                        value={formData.introduction}
                        onChange={e => setFormData(prev => ({ ...prev, introduction: e.target.value }))}
                        disabled={!isEditMode}
                    />
                    <Textarea
                        textareaTitle="어필사항 및 경력사항"
                        value={formData.appeal}
                        onChange={e => setFormData(prev => ({ ...prev, appeal: e.target.value }))}
                        disabled={!isEditMode}
                    />

                    <FieldGroup>
                        <Text.Body1_1>링크 첨부</Text.Body1_1>
                        <Input
                            value={formData.link}
                            onChange={e => setFormData(prev => ({ ...prev, link: e.target.value }))}
                            readOnly={!isEditMode}
                        />
                    </FieldGroup>

                    <FieldGroup>
                        <Text.Body1_1>사진 첨부</Text.Body1_1>
                        <ImageUploader
                            previewImageUrls={imageUrls}
                            onChange={({ urls, files, names }) => {
                                setImageUrls(urls); // 서버 전송용 images (기존url + 새이미지는 파일명)
                                setImageFiles(files); // 서버 전송용 newImages (파일형태)
                                setImageNames(names); // 전체 순서
                            }}
                        />
                    </FieldGroup>
                </FormWrapper>

                {isEditMode && (
                    <ButtonWrapper>
                        <Button
                            width="large"
                            label="수정완료"
                            backgroundColor="Main"
                            isActive={isFormModified}
                            disabled={!isFormModified}
                            onClick={() => setIsConfirmModalOpen(true)}
                        >
                            수정완료
                        </Button>
                    </ButtonWrapper>
                )}
            </PageWrapper>
            {isConfirmModalOpen && (
                <Modal
                    variant="confirm"
                    title="지원서 수정을 완료하시겠습니까?"
                    message="확인시 작성된 지원서가 수정됩니다."
                    cancelText="취소"
                    confirmText="확인"
                    handleModalClose={() => setIsConfirmModalOpen(false)}
                    onConfirm={() => {
                        setIsConfirmModalOpen(false);
                        handleUpdate();
                    }}
                />
            )}

            {isCompleteModalOpen && (
                <Modal variant="page" handleModalClose={() => setIsCompleteModalOpen(false)}>
                    <Wrapper.FlexBox direction="column" justifyContent="center" alignItems="center" gap="12px">
                        <img src="/icons/checked.svg" alt="완료 아이콘" />
                        <Text.Title3_1>지원서 수정 완료</Text.Title3_1>
                    </Wrapper.FlexBox>
                </Modal>
            )}
        </>
    );
}

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const ProfileSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
`;

const FieldGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const ButtonWrapper = styled.div`
    margin-top: 40px;
    display: flex;
    justify-content: center;
`;
