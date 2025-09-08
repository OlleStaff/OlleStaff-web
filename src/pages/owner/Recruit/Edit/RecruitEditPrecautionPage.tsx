import { Button } from "@/components/Button";
import Header from "@/components/Header";
import PageWrapper from "@/components/PageWrapper";
import { Text } from "@/styles/Text";
import { Wrapper } from "@/styles/Wrapper";
import Modal from "@/components/Modal";
import PrecautionListItem from "../../components/PrecautionListItem";
import { EmploymentPutProps } from "@/types/employment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

interface RecruitEditPrecautionPageProps {
    formData: EmploymentPutProps;
    setFormData: React.Dispatch<React.SetStateAction<EmploymentPutProps>>;
    errorMessage: string;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: () => void;
}

export default function RecruitEditPrecautionPage({
    formData,
    setFormData,
    errorMessage,
    setErrorMessage,
    handleSubmit,
}: RecruitEditPrecautionPageProps) {
    const isFormValid =
        formData.precautions.length >= 2 &&
        formData.precautions.every(
            item => item.precautionsTitle.trim() !== "" && item.precautionsContent.trim() !== ""
        );

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleOpenModal = () => {
        if (isFormValid) setIsConfirmModalOpen(true);
    };

    const handleConfirm = async () => {
        try {
            await handleSubmit();
            setIsConfirmModalOpen(false);
            setIsCompleteModalOpen(true);
        } catch (error) {
            const e = error as AxiosError<{ message?: string }>;
            setIsConfirmModalOpen(false);
            setIsErrorModalOpen(true);
            setIsCompleteModalOpen(false);

            const status = e.response?.status;
            const serverMsg = e.response?.data?.message;
            if (status === 500) {
                setErrorMessage("일시적인 서버 오류입니다");
            } else if (!status) {
                setErrorMessage("네트워크 오류가 발생했습니다");
            } else {
                setErrorMessage(serverMsg ?? "요청 처리에 실패했습니다");
            }
        }
    };

    return (
        <>
            <Header title="주의사항 작성" showBackButton />
            <PageWrapper hasHeader>
                <Wrapper.FlexBox direction="column" gap="20px">
                    <Wrapper.FlexBox height="50px" direction="column" alignItems="center">
                        <Text.Body3_1 color="Gray4">스탭에게 전달하고 싶은 주의사항을 작성해주세요.</Text.Body3_1>
                        <Text.Body3_1 color="Gray4">스탭 합격시 메세지를 통하여 보여지게 됩니다.</Text.Body3_1>
                    </Wrapper.FlexBox>

                    <PrecautionListItem
                        values={formData.precautions}
                        onChange={updated => setFormData(prev => ({ ...prev, precautions: updated }))}
                    />

                    <Button
                        label="수정 완료"
                        width="large"
                        onClick={handleOpenModal}
                        disabled={!isFormValid}
                        isActive={isFormValid}
                    >
                        수정 완료
                    </Button>
                </Wrapper.FlexBox>
            </PageWrapper>

            {isConfirmModalOpen && (
                <Modal
                    variant="confirm"
                    title="게시글 수정을 완료하시겠습니까?"
                    message={
                        <>
                            수정 버튼을 누를 시 게시글이 업로드 됩니다.
                            <br />
                            업로드 게시글 수정은 나의 공고 &gt; 더보기
                        </>
                    }
                    cancelText="취소"
                    confirmText="수정"
                    handleModalClose={() => setIsConfirmModalOpen(false)}
                    onConfirm={handleConfirm}
                />
            )}

            {isCompleteModalOpen && (
                <Modal
                    variant="default"
                    title="게시글 수정 완료"
                    confirmText="확인"
                    handleModalClose={() => {
                        setIsCompleteModalOpen(false);
                        navigate("/owner");
                    }}
                    onConfirm={() => {
                        setIsCompleteModalOpen(false);
                        navigate("/owner");
                    }}
                />
            )}

            {isErrorModalOpen && (
                <Modal
                    variant="error"
                    title={errorMessage}
                    confirmText="확인"
                    handleModalClose={() => {
                        setIsErrorModalOpen(false);
                        setErrorMessage("");
                    }}
                    onConfirm={() => {
                        setIsErrorModalOpen(false);
                        setErrorMessage("");
                    }}
                />
            )}
        </>
    );
}
