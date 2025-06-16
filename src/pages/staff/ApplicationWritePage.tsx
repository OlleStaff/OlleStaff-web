import PageWrapper from "@/components/PageWrapper";
import Header from "@/components/Header";
import { Button } from "@/components/Button";
import { Text } from "@/styles/Text";
import styled from "@emotion/styled";
import ProfileAdd from "@/components/ProfileAdd";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import ImageUploader from "@/components/ImageUploader";
import { useNavigate } from "react-router-dom";
import { usePostApplication } from "@/hooks/applicant/usePostApplication";

export default function ApplicationWritePage() {
    const navigate = useNavigate();
    const { mutate: postApplication } = usePostApplication();

    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [images, setImages] = useState<File[]>([]);
    const nickname = useUserStore(state => state.nickname);

    const [formData, setFormData] = useState({
        mbti: "",
        link: "",
        introduction: "",
        motivation: "",
        appeal: "",
    });

    const isAllFilled = Object.values(formData).every(value => value.trim() !== "");

    const handleSkip = () => {
        sessionStorage.setItem("applicationSkipped", "true");
        navigate("/staff/");
    };

    const handleSubmit = () => {
        if (!isAllFilled || !profileImage) {
            alert("모든 필드와 프로필 사진을 입력해주세요.");
            return;
        }

        const fd = new FormData();
        Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
        fd.append("profileImage", profileImage);
        images.forEach(img => fd.append("images", img));

        postApplication(fd, {
            onSuccess: () => navigate("/staff/"),
            onError: err => {
                console.error("지원서 제출 실패", err);
                alert("제출에 실패했습니다.");
            },
        });
    };

    return (
        <>
            <Header showBackButton title="지원서 작성" rightText="건너뛰기" onRightClick={handleSkip} />
            <PageWrapper hasHeader>
                <FormWrapper>
                    <ProfileSection>
                        <ProfileAdd onImageChange={setProfileImage} />
                        <Text.Title3_1>{nickname}</Text.Title3_1>
                    </ProfileSection>

                    <FieldGroup>
                        <Text.Body1_1>MBTI</Text.Body1_1>
                        <Input
                            value={formData.mbti}
                            onChange={e => setFormData(prev => ({ ...prev, mbti: e.target.value }))}
                            placeholder="MBTI를 입력하세요."
                        />
                    </FieldGroup>

                    <FieldGroup>
                        <Text.Body1_1>링크 첨부</Text.Body1_1>
                        <Input
                            value={formData.link}
                            onChange={e => setFormData(prev => ({ ...prev, link: e.target.value }))}
                            placeholder="인스타 링크 및 링크 1개를 첨부해주세요."
                        />
                    </FieldGroup>

                    <Textarea
                        textareaTitle="자기소개 작성"
                        value={formData.introduction}
                        onChange={e => setFormData(prev => ({ ...prev, introduction: e.target.value }))}
                        placeholder="나를 소개할 수 있는 자기소개를 작성하세요."
                    />
                    <Textarea
                        textareaTitle="지원 동기 작성"
                        value={formData.motivation}
                        onChange={e => setFormData(prev => ({ ...prev, motivation: e.target.value }))}
                        placeholder="지원 동기를 작성하세요."
                    />
                    <Textarea
                        textareaTitle="어필 사항"
                        value={formData.appeal}
                        onChange={e => setFormData(prev => ({ ...prev, appeal: e.target.value }))}
                        placeholder="ex) 이전 스텝 경험, 언어 능력 등"
                    />

                    <FieldGroup>
                        <Text.Body1_1>사진 첨부</Text.Body1_1>
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
                        onClick={handleSubmit}
                    >
                        작성완료
                    </Button>
                </ButtonWrapper>
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
