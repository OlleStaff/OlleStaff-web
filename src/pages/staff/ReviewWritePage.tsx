import { Button } from "@/components/Button";
import Header from "@/components/Header";
import ImageUploader from "@/components/ImageUploader";
import Modal from "@/components/Modal";
import PageWrapper from "@/components/PageWrapper";
import RadioButton from "@/components/RadioButton";
import Star from "@/components/Star";
import Textarea from "@/components/Textarea";
import { useWriteReview } from "@/hooks/staff/useWriteReview";
import { Text } from "@/styles/Text";
import theme from "@/styles/theme";
import { Wrapper } from "@/styles/Wrapper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ReviewWritePage() {
    const writeReview = useWriteReview();

    const labelList = ["전체공개", "게스트하우스에게만 공개"];
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const navigate = useNavigate();

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

    const [rating, setRating] = useState<number>(0);
    const [review, setReview] = useState<string>("");
    const [disclosure, setDisclosure] = useState<boolean>(false);
    const [images, setImages] = useState<File[]>([]);
    const employmentId = 1; // 추후 useParams으로 대체 예정

    useEffect(() => {
        setDisclosure(selectedIndex === 1);
    }, [selectedIndex]);

    const handleSubmit = () => {
        setIsConfirmModalOpen(true);
    };

    const confirmWriteReview = () => {
        writeReview.mutate(
            {
                rating,
                review,
                disclosure,
                images,
                employmentId,
            },
            {
                onSuccess: () => {
                    setIsConfirmModalOpen(false);
                    setIsCompleteModalOpen(true);
                    setTimeout(() => {
                        setIsCompleteModalOpen(false);
                        navigate("/staff/");
                    }, 1500);
                },
            }
        );
    };

    const isFormFilled = rating > 0 && review.trim().length > 0 && employmentId !== undefined;

    return (
        <>
            <Header showBackButton title="후기 작성" />
            <PageWrapper hasHeader>
                <Wrapper.FlexBox
                    direction="column"
                    justifyContent="space-between"
                    height={`calc(100vh - ${theme.size.HeaderHeight})`}
                >
                    <Wrapper.FlexBox direction="column" gap="24px">
                        <Text.Body3_1 color="Gray4">“필게스트 하우스"의 생생한 후기를 작성해주세요!</Text.Body3_1>
                        <Wrapper.FlexBox direction="column" alignItems="center" gap="12px">
                            <Text.Body1_1>게스트하우스 평점</Text.Body1_1>
                            <Star onChange={setRating} />
                        </Wrapper.FlexBox>
                        <ImageUploader maxImages={3} onChange={({ files }) => setImages(files)} />
                        <Textarea
                            value={review}
                            placeholder="게스트 하우스의 솔직후기를 남겨주세요!"
                            onChange={e => setReview(e.target.value)}
                        />
                        <RadioButton
                            labelList={labelList}
                            selectedIndex={selectedIndex}
                            onSelect={index => setSelectedIndex(index)}
                        />
                    </Wrapper.FlexBox>
                    <Wrapper.FlexBox padding="0px 0px 40px 0px" justifyContent="center">
                        <Button
                            label="작성 완료"
                            width="large"
                            onClick={handleSubmit}
                            isActive={isFormFilled}
                            disabled={!isFormFilled}
                        >
                            작성 완료
                        </Button>
                    </Wrapper.FlexBox>
                </Wrapper.FlexBox>

                {isConfirmModalOpen && (
                    <Modal
                        variant="confirm"
                        title="후기 작성을 완료 하시겠습니까?"
                        message="확인버튼을 누를시 게시글이 업로드 됩니다. 업로드 게시글 수정은 나의 공고 > 더보기"
                        cancelText="취소"
                        confirmText="등록"
                        handleModalClose={() => setIsConfirmModalOpen(false)}
                        onConfirm={confirmWriteReview}
                    />
                )}
                {isCompleteModalOpen && (
                    <Modal variant="page" handleModalClose={() => setIsCompleteModalOpen(false)}>
                        <Wrapper.FlexBox direction="column" justifyContent="center" alignItems="center" gap="12px">
                            <img src="/icons/checked.svg" alt="완료 아이콘" />
                            <Text.Title3_1>후기 등록 완료</Text.Title3_1>
                        </Wrapper.FlexBox>
                    </Modal>
                )}
            </PageWrapper>
        </>
    );
}
