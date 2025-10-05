import styled from "@emotion/styled";
import { Text } from "@/styles/Text";
import theme from "@/styles/theme";
import { Wrapper } from "@/styles/Wrapper";
import { ReviewInfo } from "@/types/reviews";
import { useState } from "react";
import { timeAgo } from "@/utils/date";
import Input from "../Input";
import ExpandableText from "../ExpandableText";
import { usePostReComment } from "@/hooks/owner/review/usePostReComment";
import ImageViewer from "../ImageViewer";
import OptionButton from "../OptionButton";
import { useDeleteReview, useDeleteReviewComment } from "@/hooks/owner/review";
import Modal from "../Modal";

type ModalType = "confirm" | "success" | null;
type ModalPurpose = "deleteReview" | "deleteComment" | "postRecomment" | null;

interface ReviewListItemProps {
    data: ReviewInfo;
    openedReviewId: number | null;
    setOpenedReviewId: (id: number | null) => void;
}

export default function ReviewListItem({ data, openedReviewId, setOpenedReviewId }: ReviewListItemProps) {
    const {
        reviewId,
        title,
        nickName,
        rating,
        images,
        review,
        disclosure,
        reviewDate,
        reviewComment,
        reviewCommentDate,
        hostNickName,
    } = data;

    const [text, setText] = useState<string>("");
    const [isViewerOpen, setViewerOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [modalType, setModalType] = useState<ModalType>(null);
    const [modalPurpose, setModalPurpose] = useState<ModalPurpose>(null);

    const { mutate: submitReComment } = usePostReComment();
    const { mutate: deleteReview } = useDeleteReview();
    const { mutate: deleteReviewComment } = useDeleteReviewComment();

    const openModal = (type: ModalType, purpose: ModalPurpose) => {
        setModalType(type);
        setModalPurpose(purpose);
    };

    const closeModal = () => {
        setModalType(null);
        setModalPurpose(null);
    };

    const handleReCommentSubmit = () => {
        if (!text.trim()) return alert("댓글을 입력해주세요!");
        submitReComment(
            { reviewId, reviewComment: text },
            {
                onSuccess: () => {
                    setText("");
                    setOpenedReviewId(null);
                    setModalType("success");
                    setModalPurpose("postRecomment");
                },
            }
        );
    };
    const handleDeleteReview = () => {
        deleteReview(reviewId, {
            onSuccess: () => {
                openModal("success", "deleteReview");
            },
            // onError: () => showToast("후기 삭제를 실패했습니다. 다시 시도해주세요."),
        });
    };

    const handleDeleteReviewComment = () => {
        deleteReviewComment(reviewId, {
            onSuccess: () => {
                openModal("success", "deleteComment");
            },
            // onError: () => showToast("후기 답글 삭제를 실패했습니다. 다시 시도해주세요."),
        });
    };

    const handleImageClick = (idx: number) => {
        setCurrentImageIndex(idx);
        setViewerOpen(true);
    };

    const handleOpenComment = () => {
        setOpenedReviewId(openedReviewId === reviewId ? null : reviewId);
    };

    return (
        <>
            {modalType === "confirm" && modalPurpose && (
                <Modal
                    variant="confirm"
                    title={
                        modalPurpose === "deleteReview" ? "등록된 후기를 삭제하시겠습니까?" : "답글을 삭제하시겠습니까?"
                    }
                    message={
                        modalPurpose === "deleteReview" ? (
                            <>
                                삭제 버튼 클릭 시
                                <br />
                                등록된 후기가 영구히 삭제됩니다.
                            </>
                        ) : (
                            "삭제 버튼 클릭 시 답글이 영구히 삭제됩니다."
                        )
                    }
                    cancelText="취소"
                    confirmText="삭제"
                    handleModalClose={closeModal}
                    onConfirm={() => {
                        if (modalPurpose === "deleteReview") handleDeleteReview();
                        if (modalPurpose === "deleteComment") handleDeleteReviewComment();
                    }}
                />
            )}

            {modalType === "success" && modalPurpose && (
                <Modal
                    variant="default"
                    title={
                        modalPurpose === "deleteReview"
                            ? "후기 삭제 완료"
                            : modalPurpose === "deleteComment"
                              ? "답글 삭제 완료"
                              : "답글이 등록되었습니다!"
                    }
                    confirmText="확인"
                    handleModalClose={closeModal}
                    onConfirm={() => {
                        if (modalPurpose === "postRecomment") {
                            closeModal();
                        } else {
                            closeModal();
                            window.location.reload();
                        }
                    }}
                />
            )}

            <Card>
                <Wrapper.FlexBox justifyContent="space-between" alignItems="center" gap="20px">
                    <Text.Title4>{title}</Text.Title4>
                    <OptionButton
                        placement="bottom"
                        menus={[{ label: "후기 삭제", onClick: () => openModal("confirm", "deleteReview") }]}
                    />
                </Wrapper.FlexBox>

                <ContentWrapper>
                    <UserWrapper>
                        <Text.Body1_1>{nickName}님</Text.Body1_1>
                        <img src="/icons/fullStar.svg" alt="별" style={{ width: "15px" }} />
                        <Text.Body2_1>{rating}</Text.Body2_1>
                    </UserWrapper>

                    {images.length > 0 && (
                        <ImageList>
                            {images.map((imgUrl, idx) => (
                                <div key={idx} onClick={() => handleImageClick(idx)}>
                                    <img src={imgUrl} alt={`리뷰이미지${idx + 1}`} />
                                </div>
                            ))}
                        </ImageList>
                    )}
                    {isViewerOpen && (
                        <ImageViewer
                            images={images}
                            startIndex={currentImageIndex}
                            onClose={() => setViewerOpen(false)}
                        />
                    )}

                    <Text.Body1>
                        <Wrapper.FlexBox
                            style={{
                                overflow: "auto",
                                whiteSpace: "pre-wrap",
                                wordBreak: "break-word",
                            }}
                        >
                            <ExpandableText text={review} maxWidth={500} />
                        </Wrapper.FlexBox>
                    </Text.Body1>

                    <Wrapper.FlexBox direction="column" gap="8px">
                        <Wrapper.FlexBox justifyContent="space-between" alignItems="center">
                            <Text.Body3_1 color="Gray3">
                                {disclosure
                                    ? `게스트하우스에게만 공개 | ${timeAgo(reviewDate)}`
                                    : `${timeAgo(reviewDate)}`}
                            </Text.Body3_1>

                            {!reviewComment && openedReviewId !== reviewId && (
                                <img
                                    src="/icons/comment_gray.svg"
                                    alt="댓글 버튼"
                                    onClick={handleOpenComment}
                                    style={{ cursor: "pointer" }}
                                />
                            )}
                        </Wrapper.FlexBox>

                        {!reviewComment && openedReviewId === reviewId && (
                            <Input
                                variant="comment"
                                value={text}
                                onChange={e => setText(e.target.value)}
                                placeholder="댓글을 입력하세요."
                                rightIcon={<img src="/icons/arrow_top.svg" alt="화살표 아이콘" />}
                                onRightIconClick={handleReCommentSubmit}
                            />
                        )}
                    </Wrapper.FlexBox>
                </ContentWrapper>

                {reviewComment && (
                    <CommentWrapper>
                        <Wrapper.FlexBox justifyContent="space-between" alignItems="center">
                            <Text.Body1_1>{hostNickName}</Text.Body1_1>
                            <OptionButton
                                placement="bottom"
                                menus={[{ label: "답글 삭제", onClick: () => openModal("confirm", "deleteComment") }]}
                            />
                        </Wrapper.FlexBox>
                        <Text.Body2_1>
                            <ExpandableText text={reviewComment} maxWidth={500} />
                        </Text.Body2_1>
                        <Wrapper.FlexBox justifyContent="flex-end">
                            <Text.Body3 color="Gray4">{timeAgo(reviewCommentDate)}</Text.Body3>
                        </Wrapper.FlexBox>
                    </CommentWrapper>
                )}
            </Card>
        </>
    );
}

const Card = styled.div`
    border: 1px solid ${theme.color.Gray1};
    border-radius: 12px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    background: ${theme.color.White};
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    border-top: 1px solid #e4e4e4;
    padding-top: 10px;
`;

const CommentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 12px;
    padding: 12px;
    background: #f8f8f8;
    border-radius: 8px;
    gap: 5px;
`;

const UserWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
`;

const ImageList = styled.div`
    display: flex;
    gap: 6px;
    img {
        width: 80px;
        height: 80px;
        border-radius: 8px;
        object-fit: cover;
    }
`;
