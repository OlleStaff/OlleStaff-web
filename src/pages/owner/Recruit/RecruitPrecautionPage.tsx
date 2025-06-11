import { Button } from "@/components/Button";
import Header from "@/components/Header";
import PageWrapper from "@/components/PageWrapper";
import { Text } from "@/styles/Text";
import { Wrapper } from "@/styles/Wrapper";
import PrecautionListItem from "../components/PrecautionListItem";
import { EmploymentPostProps, EmploymentPutProps } from "@/types/employment";
import { useState } from "react";
import Modal from "@/components/Modal";
import { useNavigate } from "react-router-dom";

export type Mode = "create" | "edit";

export type FormDataType<T extends Mode> = T extends "create" ? EmploymentPostProps : EmploymentPutProps;

export interface RecruitPrecautionPageProps<T extends Mode> {
    mode: T;
    formData: FormDataType<T>;
    setFormData: React.Dispatch<React.SetStateAction<FormDataType<T>>>;
    handleSubmit: () => void;
}

export default function RecruitPrecautionPage<T extends Mode>({
    mode,
    formData,
    setFormData,
    handleSubmit,
}: RecruitPrecautionPageProps<T>) {
    const isFormValid =
        formData.precautions.length >= 2 &&
        formData.precautions.every(
            item => item.precautionsTitle.trim() !== "" && item.precautionsContent.trim() !== ""
        );

    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleOpenModal = () => {
        if (isFormValid) setIsModalOpen(true);
    };

    const handleConfirm = () => {
        handleSubmit();
        navigate("/owner");
        setIsModalOpen(false);
    };

    return (
        <>
            <Header title="주의사항 작성" showBackButton />
            <PageWrapper hasHeader>
                <Wrapper.FlexBox direction="column" padding="30px" gap="20px">
                    <Wrapper.FlexBox height="50px" direction="column" alignItems="center">
                        <Text.Body3_1 color="Gray4">스탭에게 전달하고 싶은 주의사항을 작성해주세요.</Text.Body3_1>
                        <Text.Body3_1 color="Gray4">스탭 합격시 메세지를 통하여 보여지게 됩니다.</Text.Body3_1>
                    </Wrapper.FlexBox>

                    <PrecautionListItem
                        values={formData.precautions}
                        onChange={updated => setFormData(prev => ({ ...prev, precautions: updated }))}
                    />

                    <Button
                        label={mode === "edit" ? "수정 완료" : "작성 완료"}
                        width="large"
                        onClick={handleOpenModal}
                        disabled={!isFormValid}
                        isActive={isFormValid}
                    >
                        {mode === "edit" ? "수정 완료" : "작성 완료"}
                    </Button>
                </Wrapper.FlexBox>
            </PageWrapper>

            {isModalOpen && (
                <Modal
                    variant="confirm"
                    title={mode === "edit" ? "게시글 수정을 완료하시겠습니까?" : "게시글 등록을 완료하시겠습니까?"}
                    message={`${
                        mode === "edit" ? "수정" : "등록"
                    } 버튼을 누를 시 게시글이 업로드 됩니다.\n업로드 게시글 수정은 나의 공고 > 더보기`}
                    cancelText="취소"
                    confirmText={mode === "edit" ? "수정" : "등록"}
                    handleModalClose={() => setIsModalOpen(false)}
                    onConfirm={handleConfirm}
                />
            )}
        </>
    );
}
