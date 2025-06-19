import { Button } from "@/components/Button";
import Header from "@/components/Header";
import ImageUploader from "@/components/ImageUploader";
import Input from "@/components/Input";
import PageWrapper from "@/components/PageWrapper";
import Textarea from "@/components/Textarea";
import { useState } from "react";
import styled from "@emotion/styled";
import Modal from "@/components/Modal";
import { useWriteAccompany } from "@/hooks/staff/useWriteAccompany";
import { useNavigate } from "react-router-dom";
import { Text } from "@/styles/Text";

export default function AccompanyWritePage() {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
    });
    const [images, setImages] = useState<File[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
    const { postAccompany } = useWriteAccompany();
    const navigate = useNavigate();

    const isAllFilled = Object.values(formData).every(value => value.trim() !== "");

    const handleSubmit = () => {
        if (!isAllFilled) {
            alert("모든 필드를 입력해주세요.");
            return;
        }
        setIsModalOpen(true);
    };

    const handleConfirm = async () => {
        try {
            await postAccompany({
                title: formData.title,
                content: formData.content,
                images: images,
            });

            setIsModalOpen(false);
            setIsCompleteModalOpen(true);

            setTimeout(() => {
                setIsCompleteModalOpen(false);
                navigate("/staff/accompany");
            }, 1500);
        } catch (err) {
            console.error("작성 실패", err);
            alert("작성에 실패했습니다.");
        }
    };

    return (
        <>
            <Header showBackButton title="동행 게시글 작성" />
            <PageWrapper hasHeader>
                <FormWrapper>
                    <Input
                        value={formData.title}
                        inputTitle="제목"
                        placeholder="제목을 작성해주세요."
                        onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    ></Input>
                    <Textarea
                        textareaTitle="내용"
                        placeholder="동행글의 내용을 입력해 주세요."
                        value={formData.content}
                        variant="flat-lg"
                        onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    />
                    <ImageUploader maxImages={4} onChange={({ files }) => setImages(files)} />
                </FormWrapper>
                <ButtonWrapper>
                    <Button
                        width="large"
                        label="작성 완료 버튼"
                        backgroundColor="Main"
                        isActive={isAllFilled}
                        disabled={!isAllFilled}
                        onClick={handleSubmit}
                    >
                        작성 완료
                    </Button>
                </ButtonWrapper>
            </PageWrapper>
            {isModalOpen && (
                <Modal
                    variant="confirm"
                    title="동행 게시글 작성을 완료하시겠습니까?"
                    message={
                        <>
                            등록버튼을 누를 시 입력한 정보가 업로드 됩니다. <br />
                            게시글 관리는 내 정보 &gt; 내가 작성한 글
                        </>
                    }
                    confirmText="등록"
                    cancelText="취소"
                    handleModalClose={() => setIsModalOpen(false)}
                    onConfirm={handleConfirm}
                />
            )}
            {isCompleteModalOpen && (
                <Modal variant="page" handleModalClose={() => setIsCompleteModalOpen(false)}>
                    <CompleteWrapper>
                        <img src="/icons/checked.svg" alt="완료 아이콘" />
                        <Text.Title3_1>동행 게시글 등록 완료</Text.Title3_1>
                    </CompleteWrapper>
                </Modal>
            )}
        </>
    );
}

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    justify-content: space-between;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 35px;
`;

const CompleteWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
`;
