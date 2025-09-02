import { useState } from "react";
import styled from "@emotion/styled";
import { CommentType } from "@/types/comment";
import { timeAgo } from "@/utils/date";
import { Text } from "@/styles/Text";
import { useUserStore } from "@/store/useUserStore";
import { useDeleteComment, useDeleteReply } from "./useCommentMutation";
import { useReplyList } from "./useCommentQuery";
import { useCommentState } from "./useCommentState";

interface CommentItemProps {
    comment: CommentType;
    onReplyClick?: (commentId: number, nickname: string) => void;
    onToggleReplies?: (commentId: number) => void;
    isReply?: boolean;
    areRepliesOpen?: boolean;
    accompanyId: number;
    parentCommentId?: number;
    onDeleted?: () => void;
}

export default function CommentItem({
    comment,
    onReplyClick,
    onToggleReplies,
    isReply,
    areRepliesOpen,
    accompanyId,
    parentCommentId,
    onDeleted,
}: CommentItemProps) {
    const { userNickname, userImage, createdAt, content, id, replyCount } = comment;
    const { mutate: deleteComment } = useDeleteComment();
    const { mutate: deleteReply } = useDeleteReply();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const currentUserNickname = useUserStore(state => state.nickname);
    const isAuthor = currentUserNickname === userNickname;
    const { activeReply } = useCommentState();
    const isActiveReply = activeReply?.commentId === id;

    const handleDelete = () => {
        if (isReply && parentCommentId !== undefined) {
            deleteReply({ accompanyId, commentId: parentCommentId, replyId: id });
        } else {
            deleteComment({ accompanyId, commentId: id });
            onDeleted?.();
        }
    };

    const shouldShowReplies = !isReply && areRepliesOpen;
    const { data: replies = [] } = useReplyList(accompanyId, id, shouldShowReplies ?? false);

    return (
        <>
            <Wrapper isReply={isReply}>
                <ProfileImage src={userImage || "/icons/defaultUser.svg"} alt="profile" />
                <ContentBox>
                    <Text.Body2_1 style={{ marginBottom: "2px" }}>{userNickname}</Text.Body2_1>
                    <Text.Body2 style={{ whiteSpace: "pre-wrap" }}>{content}</Text.Body2>
                    <Meta>
                        <Text.Body3 color="Gray4">{timeAgo(createdAt)}</Text.Body3>
                        {!isReply && (
                            <ReplyButton
                                onClick={() => onReplyClick?.(id, userNickname)}
                                className={isActiveReply ? "active" : ""}
                            >
                                <Text.Body3 color="Gray4">답글 달기</Text.Body3>
                            </ReplyButton>
                        )}
                    </Meta>
                    {isAuthor && (
                        <MenuButton onClick={() => setIsMenuOpen(prev => !prev)}>
                            <img src="/icons/dots.svg" alt="댓글 메뉴" />
                            {isMenuOpen && (
                                <Dropdown>
                                    <DropdownButton onClick={handleDelete}>
                                        <Text.Body1 color="Gray3">댓글 삭제</Text.Body1>
                                    </DropdownButton>
                                </Dropdown>
                            )}
                        </MenuButton>
                    )}
                    {!isReply && replyCount > 0 && (
                        <ReplyToggleButton onClick={() => onToggleReplies?.(id)}>
                            <Icon src={areRepliesOpen ? "/icons/upArrow.svg" : "/icons/downArrow.svg"} />
                            <Text.Body3 color="Gray4" style={{ marginTop: "3px" }}>
                                {areRepliesOpen ? "댓글 숨기기" : `${replyCount}개의 댓글 보기`}
                            </Text.Body3>
                        </ReplyToggleButton>
                    )}
                </ContentBox>
            </Wrapper>
            {shouldShowReplies &&
                replies.map(reply => (
                    <CommentItem
                        key={reply.id}
                        comment={{ ...reply, replyCount: 0 }}
                        isReply
                        accompanyId={accompanyId}
                        parentCommentId={id}
                    />
                ))}
        </>
    );
}

const Wrapper = styled.div<{ isReply?: boolean }>`
    display: flex;
    gap: 12px;
    padding-left: ${({ isReply }) => (isReply ? "42px" : "0")};
    margin-top: 20px;
`;

const ProfileImage = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 4px;
    object-fit: cover;
`;

const ContentBox = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
`;

const MenuButton = styled.div`
    position: absolute;
    top: -10px;
    right: 0;
    cursor: pointer;
    padding: 4px;
`;

const Dropdown = styled.div`
    position: absolute;
    top: 24px;
    right: 0;
    background: white;
    border-radius: 4px;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
    padding: 3px 0;
`;

const DropdownButton = styled.button`
    width: 100px;
    background: none;
    border: none;
    padding: 9px 8px 4px 8px;
    cursor: pointer;
`;

const Meta = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
    margin-top: 4px;
`;

const ReplyButton = styled.button`
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
    align-self: flex-start;

    &.active span {
        font-weight: 700 !important;
    }
`;

const Icon = styled.img`
    width: 12px;
    height: 12px;
`;

const ReplyToggleButton = styled.button`
    display: flex;
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
    margin-top: 6px;
    align-items: center;
    gap: 4px;
`;
