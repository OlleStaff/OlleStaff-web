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

    const handleOpenComment = () => {
        setOpenedReviewId(openedReviewId === reviewId ? null : reviewId);
    };

    const [text, setText] = useState<string>("");

    const { mutate: submitReComment } = usePostReComment();

    const handleReCommentSubmit = () => {
        if (!text.trim()) return alert("댓글을 입력해주세요!");
        submitReComment({ reviewId, reviewComment: text });
        setOpenedReviewId(null);
    };

    const [isViewerOpen, setViewerOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const handleImageClick = (idx: number) => {
        setCurrentImageIndex(idx);
        setViewerOpen(true);
    };

    const { mutate: deleteReview } = useDeleteReview();
    const handleDeleteReview = () => {
        console.log("삭제 요청 URL:", `${import.meta.env.VITE_API_BASE_URL}/reviews/${reviewId}`);
        if (!reviewId) {
            console.error("reviewId가 없습니다!");
            return;
        }
        deleteReview(reviewId);
    };

    const { mutate: deleteReviewComment } = useDeleteReviewComment();
    const handleDeleteReviewComment = () => {
        deleteReviewComment(reviewId);
    };

    return (
        <Card>
            <Wrapper.FlexBox justifyContent="space-between" alignItems="center">
                <Text.Body1_1>{title}</Text.Body1_1>
                <OptionButton items={[{ label: "후기 삭제", onClick: handleDeleteReview }]} />
            </Wrapper.FlexBox>

            <ContentWrapper>
                <UserWrapper>
                    <Text.Body2_1>{nickName}님</Text.Body2_1>
                    <img src="/icons/fullStar.svg" alt="별" style={{ width: "15px" }} />
                    <Text.Body2_1>{rating}</Text.Body2_1>
                </UserWrapper>

                {images.length > 0 && (
                    <>
                        <ImageList>
                            {images.map((imgUrl, idx) => (
                                <div key={idx} onClick={() => handleImageClick(idx)}>
                                    <img src={imgUrl} alt={`리뷰이미지${idx + 1}`} />
                                </div>
                            ))}
                        </ImageList>
                    </>
                )}
                {isViewerOpen && (
                    <ImageViewer images={images} startIndex={currentImageIndex} onClose={() => setViewerOpen(false)} />
                )}
                <Text.Body2_1>
                    <Wrapper.FlexBox
                        style={{
                            overflow: "auto",
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                        }}
                    >
                        <ExpandableText text={review} maxLength={100} />
                    </Wrapper.FlexBox>
                </Text.Body2_1>

                <Wrapper.FlexBox direction="column" gap="8px">
                    <Wrapper.FlexBox justifyContent="space-between" alignItems="center">
                        <Text.Body3_1 color="Gray3">
                            {disclosure ? `게스트하우스에게만 공개 | ${timeAgo(reviewDate)}` : `${timeAgo(reviewDate)}`}
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
                            rightIcon={<img src="/icons/arrow_top.svg" />}
                            onRightIconClick={handleReCommentSubmit}
                        />
                    )}
                </Wrapper.FlexBox>
            </ContentWrapper>

            {reviewComment && (
                <CommentWrapper>
                    <Wrapper.FlexBox justifyContent="space-between" alignItems="center">
                        <Text.Body1_1>{hostNickName}</Text.Body1_1>

                        <OptionButton items={[{ label: "댓글 삭제", onClick: handleDeleteReviewComment }]} />
                    </Wrapper.FlexBox>
                    <Text.Body2_1>
                        <ExpandableText text={reviewComment} maxLength={70} />
                    </Text.Body2_1>
                    <Wrapper.FlexBox justifyContent="flex-end">
                        <Text.Body3 color="Gray4">{timeAgo(reviewCommentDate)}</Text.Body3>
                    </Wrapper.FlexBox>
                </CommentWrapper>
            )}
        </Card>
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
