import PageWrapper from "@/components/PageWrapper";
import Header from "@/components/Header";
import { Button } from "@/components/Button";
import { Text } from "@/styles/Text";
import styled from "@emotion/styled";
import ProfileAdd from "@/components/ProfileAdd";
import Input, { RequiredStar } from "@/components/Input";
import Textarea from "@/components/Textarea";
import { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import ImageUploader from "@/components/ImageUploader";
import { useNavigate } from "react-router-dom";
import { usePostApplication } from "@/hooks/applicant/usePostApplication";
import { Wrapper } from "@/styles/Wrapper";
import { formatProfileMeta } from "@/utils/formatProfileMeta";
import Modal from "@/components/Modal";

export default function ApplicationWritePage() {
    const navigate = useNavigate();
    const { mutate: postApplication } = usePostApplication();

    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [images, setImages] = useState<File[]>([]);
    const nickname = useUserStore(s => s.nickname);
    const gender = useUserStore(s => s.gender);
    const birthDate = useUserStore(s => s.birthDate);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isCompleteOpen, setIsCompleteOpen] = useState(false);

    const [formData, setFormData] = useState({
        mbti: "",
        link: "",
        introduction: "",
        appeal: "",
    });

    const REQUIRED_FIELDS = ["mbti", "introduction", "appeal"];

    const isAllFilled = REQUIRED_FIELDS.every(key => formData[key as keyof typeof formData].trim() !== "");

    const handleSkip = () => {
        sessionStorage.setItem("applicationSkipped", "true");
        navigate("/staff/");
    };

    const handleOpenConfirm = () => {
        if (!isAllFilled || !profileImage) {
            alert("필수 필드와 사진을 입력해주세요.");
            return;
        }
        setIsConfirmOpen(true);
    };

    const handleSubmit = () => {
        const fd = new FormData();
        Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
        fd.append("profileImage", profileImage!);
        images.forEach(img => fd.append("images", img));

        postApplication(fd, {
            onSuccess: () => {
                setIsConfirmOpen(false);
                setIsCompleteOpen(true);
            },
            // onError: () => showToast("제출을 실패했습니다. 다시 시도해주세요."),
        });
    };

    return (
        <>
            <Header showBackButton title="지원서 작성" rightText="건너뛰기" onRightClick={handleSkip} />
            <PageWrapper hasHeader>
                <FormWrapper>
                    <ProfileSection>
                        <ProfileAdd onImageChange={setProfileImage} />
                        <Wrapper.FlexBox direction="column" alignItems="center" gap="4px">
                            <Text.Title3_1>{nickname}</Text.Title3_1>
                            <Text.Body2_1 color="Gray3">{formatProfileMeta(birthDate, gender)}</Text.Body2_1>
                        </Wrapper.FlexBox>
                    </ProfileSection>

                    <FieldGroup>
                        <Input
                            inputTitle="MBTI"
                            value={formData.mbti}
                            onChange={e => setFormData(prev => ({ ...prev, mbti: e.target.value }))}
                            placeholder="MBTI를 입력하세요."
                            variant="default"
                            required
                        />
                    </FieldGroup>

                    <Textarea
                        textareaTitle="자기소개 및 지원 동기 작성"
                        value={formData.introduction}
                        onChange={e => setFormData(prev => ({ ...prev, introduction: e.target.value }))}
                        placeholder="나를 소개할 수 있는 자기소개를 작성하세요."
                        required
                    />
                    <Textarea
                        textareaTitle="어필사항 및 경력사항"
                        value={formData.appeal}
                        onChange={e => setFormData(prev => ({ ...prev, appeal: e.target.value }))}
                        placeholder="이전 스텝 경험, 언어 능력 등 나를 어필할 수 있는 어필사항이나 경력을 소개해주세요."
                        required
                    />

                    <FieldGroup>
                        <Input
                            inputTitle="링크 첨부"
                            value={formData.link}
                            onChange={e => setFormData(prev => ({ ...prev, link: e.target.value }))}
                            placeholder="링크를 첨부해주세요."
                            variant="default"
                        />
                    </FieldGroup>

                    <FieldGroup>
                        <Text.Body1_1>
                            사진 첨부<RequiredStar>*</RequiredStar>
                        </Text.Body1_1>
                        <ImageUploader maxImages={6} onChange={({ files }) => setImages(files)} />
                    </FieldGroup>
                </FormWrapper>

                <ButtonWrapper>
                    <Button
                        width="large"
                        label="작성완료"
                        backgroundColor="Main"
                        isActive={isAllFilled}
                        disabled={!isAllFilled}
                        onClick={handleOpenConfirm}
                    >
                        작성완료
                    </Button>
                </ButtonWrapper>

                {isConfirmOpen && (
                    <Modal
                        variant="confirm"
                        title="지원서 작성을 완료하시겠습니까?"
                        message="확인 버튼 클릭 시 지원서 작성이 완료됩니다."
                        cancelText="취소"
                        confirmText="확인"
                        handleModalClose={() => setIsConfirmOpen(false)}
                        onConfirm={handleSubmit}
                    />
                )}

                {isCompleteOpen && (
                    <Modal
                        variant="default"
                        title="지원서 작성 완료!"
                        confirmText="확인"
                        handleModalClose={() => {
                            setIsCompleteOpen(false);
                            navigate("/staff/");
                        }}
                        onConfirm={() => {
                            setIsCompleteOpen(false);
                            navigate("/staff/");
                        }}
                    />
                )}
            </PageWrapper>
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
