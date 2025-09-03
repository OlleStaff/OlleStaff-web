import styled from "@emotion/styled";
import { Text } from "@/styles/Text";
import { useNavigate } from "react-router-dom";
import { AccompanyListItemProps } from "@/types/accompany";
import { timeAgo } from "@/utils/date";
import { Wrapper } from "@/styles/Wrapper";
import { useUserStore } from "@/store/useUserStore";
import OptionButton from "../OptionButton";
import { useDeleteAccompany } from "@/hooks/staff/useDeleteAccompany";
import { useState } from "react";
import Modal from "../Modal";

type ModalType = "confirm" | "success" | null;

export const AccompanyListItem = ({
    id,
    title,
    content,
    createdAt,
    updatedAt,
    images,
    userNickname,
    like,
    likeCount,
    commentCount,
    userImage,
}: AccompanyListItemProps) => {
    const navigate = useNavigate();
    const myNickname = useUserStore(s => s.nickname);
    const isOwner = myNickname && userNickname && myNickname === userNickname;
    const { mutate: deleteAccompany, isPending } = useDeleteAccompany();

    const [modalType, setModalType] = useState<ModalType>(null);

    const openConfirm = () => setModalType("confirm");
    const openSuccess = () => setModalType("success");
    const closeModal = () => setModalType(null);

    const handleClick = () => {
        navigate(`/staff/accompany/${id}`, {
            state: {
                accompany: {
                    id,
                    title,
                    content,
                    createdAt,
                    updatedAt,
                    images,
                    userNickname,
                    like,
                    likeCount,
                    commentCount,
                    userImage,
                },
            },
        });
    };

    const handleDelete = () => {
        if (isPending) return;
        deleteAccompany(id, {
            onSuccess: () => openSuccess(),
            onError: e => {
                console.error("동행글 삭제 실패", e);
                alert("삭제 중 오류가 발생했습니다.");
            },
        });
    };

    const thumbnail = images?.[0];

    return (
        <>
            {modalType === "confirm" && (
                <Modal
                    variant="confirm"
                    title="게시글을 삭제하시겠습니까?"
                    message={
                        <>
                            삭제 버튼 클릭 시
                            <br />
                            게시글이 영구히 삭제됩니다.
                        </>
                    }
                    cancelText="취소"
                    confirmText="삭제"
                    handleModalClose={closeModal}
                    onConfirm={handleDelete}
                />
            )}

            {modalType === "success" && (
                <Modal
                    variant="default"
                    title="삭제 완료"
                    confirmText="확인"
                    handleModalClose={closeModal}
                    onConfirm={() => {
                        closeModal();
                    }}
                />
            )}
            <Card onClick={handleClick}>
                {isOwner && (
                    <TopRight onClick={e => e.stopPropagation()}>
                        <OptionButton
                            placement="bottom"
                            align="right"
                            menus={[{ label: "게시글 삭제", onClick: () => openConfirm() }]}
                        />
                    </TopRight>
                )}
                {thumbnail && (
                    <ImageWrapper>
                        <StyledImage src={thumbnail} alt="thumbnail" />
                    </ImageWrapper>
                )}
                <ContentCol direction="column" justifyContent="space-between">
                    <Title>{title}</Title>
                    <Text.Body3_1
                        color="Gray4"
                        style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            height: "40px",
                        }}
                    >
                        {content}
                    </Text.Body3_1>
                    <Wrapper.FlexBox justifyContent="space-between">
                        <Wrapper.FlexBox justifyContent="space-between" gap="4px" width="fit">
                            <Wrapper.FlexBox alignItems="center">
                                <Icon src="/icons/comment.svg" alt="comment" />
                                <Text.Body2_1 color="Gray4" style={{ marginTop: "4px" }}>
                                    {commentCount}
                                </Text.Body2_1>
                            </Wrapper.FlexBox>
                            <Wrapper.FlexBox alignItems="center">
                                <Icon src="/icons/heart.svg" alt="heart" />
                                <Text.Body2_1 color="Gray4" style={{ marginTop: "4px" }}>
                                    {likeCount}
                                </Text.Body2_1>
                            </Wrapper.FlexBox>
                        </Wrapper.FlexBox>
                        <Text.Body3 color="Gray4" style={{ marginTop: "4px" }}>
                            {timeAgo(createdAt)}
                        </Text.Body3>
                    </Wrapper.FlexBox>
                </ContentCol>
            </Card>
        </>
    );
};

export const Card = styled.div`
    position: relative;
    display: flex;
    gap: 12px;
    padding: 13px 16px 9px 16px;
    border: 1px solid #f0f0f5;
    border-radius: 8px;
    background-color: white;
    height: 112px;
`;

const TopRight = styled.div`
    position: absolute;
    top: 15px;
    right: 16px;
`;

const ImageWrapper = styled.div`
    width: 88px;
    height: 88px;
    flex-shrink: 0;
    border-radius: 4px;
    overflow: hidden;
`;

const StyledImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
`;

const ContentCol = styled(Wrapper.FlexBox)`
    flex: 1 1 auto;
    min-width: 0;
`;

const Title = styled(Text.Title3_1)`
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const Icon = styled.img`
    width: 24px;
    height: 24px;
`;
