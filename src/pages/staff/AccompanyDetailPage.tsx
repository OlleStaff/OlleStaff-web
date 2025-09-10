import { CommentBox } from "@/components/CommentBox";
import Header from "@/components/Header";
import ImageGrid from "@/components/ImageGrid";
import ImageViewer from "@/components/ImageViewer";
import LikeButton from "@/components/LikeButton";
import PageWrapper from "@/components/PageWrapper";
import { Text } from "@/styles/Text";
import { Wrapper } from "@/styles/Wrapper";
import { AccompanyListItemProps } from "@/types/accompany";
import { timeAgo } from "@/utils/date";
import styled from "@emotion/styled";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function AccompanyDetailPage() {
    const { state } = useLocation() as { state?: { accompany: AccompanyListItemProps } };
    const accompany = state!.accompany;

    const [count, setCount] = useState(accompany.commentCount);
    const handleCountDelta = (d: 1 | -1) => setCount(c => Math.max(0, c + d));

    const { title, content, images, createdAt, userNickname, likeCount, userImage, like } = accompany;

    const [isViewerOpen, setViewerOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const handleImageClick = (idx: number) => {
        setCurrentImageIndex(idx);
        setViewerOpen(true);
    };

    return (
        <>
            <Header showBackButton title="" />
            <PageWrapper hasHeader>
                <MetaInfo>
                    <ProfileImage src={userImage || "/icons/defaultUser.svg"} alt="프로필 이미지" />
                    <MetaInfoText>
                        <Text.Body1_1>{userNickname}</Text.Body1_1>
                        <Text.Body2_1 color="Gray4">{timeAgo(createdAt)}</Text.Body2_1>
                    </MetaInfoText>
                </MetaInfo>
                <MetaDivider />

                <Wrapper.FlexBox direction="column">
                    <Title>{title}</Title>
                    <Content style={{ whiteSpace: "pre-wrap" }}>{content}</Content>
                </Wrapper.FlexBox>
                {images.length > 0 && <ImageGrid images={images} onImageClick={handleImageClick} />}

                {isViewerOpen && (
                    <ImageViewer images={images} startIndex={currentImageIndex} onClose={() => setViewerOpen(false)} />
                )}

                <ReactionBar>
                    <LikeButton accompanyId={accompany.id} initialLiked={like} initialCount={likeCount} />
                    <IconWrapper>
                        <Icon src="/icons/comment_black.svg" alt="댓글 아이콘" />
                        <Text.Body1 style={{ marginTop: "4px" }}>{count}</Text.Body1>
                    </IconWrapper>
                </ReactionBar>
            </PageWrapper>
            <Divider />
            <PageWrapper>
                <CommentBox accompanyId={accompany.id} commentCount={count} onCountDelta={handleCountDelta} />
            </PageWrapper>
        </>
    );
}

const ProfileImage = styled.img`
    width: 42px;
    height: 42px;
    border-radius: 6px;
    object-fit: cover;
`;

const MetaInfo = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
    padding-bottom: 10px;
    margin-left: 10px;
`;

const MetaInfoText = styled.div`
    display: flex;
    padding-top: 1px;
    flex-direction: column;
    justify-content: center;
    row-gap: 2px;
`;

const MetaDivider = styled.div`
    border-bottom: 1px solid ${({ theme }) => theme.color.Gray1};
    margin-bottom: 10px;
`;

const Title = styled(Text.Title3_2)`
    margin-bottom: 12px;
`;

const Content = styled(Text.Body1)`
    white-space: pre-wrap;
    margin-bottom: 16px;
`;

const ReactionBar = styled.div`
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
`;

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
`;

const Icon = styled.img`
    width: 32px;
    height: 32px;
    object-fit: contain;
`;

const Divider = styled.div`
    border-bottom: 1px solid ${({ theme }) => theme.color.Gray1};
    margin: 0px -30px 20px -30px;
`;
