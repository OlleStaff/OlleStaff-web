import styled from "@emotion/styled";
import { useCommentState } from "./useCommentState";
import CommentList from "./CommentList";
import CommentInput from "./CommentInput";
import ReplyingNotice from "./ReplyingNotice";
import { Text } from "@/styles/Text";
import { useCommentList } from "./useCommentQuery";
import { SkeletonList } from "../Skeleton/SkeletonList";

type Props = {
    accompanyId: number;
    commentCount: number;
    onCountDelta?: (d: 1 | -1) => void;
};

export const CommentBox = ({ accompanyId, commentCount, onCountDelta }: Props) => {
    const { openReplies, toggleReplies, startReplyTo, activeReply, cancelReply } = useCommentState();
    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useCommentList(accompanyId);

    const comments = data?.pages ? data.pages.flatMap(page => page.items) : [];

    return (
        <>
            <Text.Body1_1>댓글 {commentCount}</Text.Body1_1>
            <ScrollableArea>
                {isLoading ? (
                    <SkeletonList variant="comment" count={3} />
                ) : (
                    <CommentList
                        comments={comments}
                        openReplies={openReplies}
                        onToggleReplies={toggleReplies}
                        onReplyClick={startReplyTo}
                        accompanyId={accompanyId}
                        fetchNextPage={fetchNextPage}
                        hasNextPage={hasNextPage}
                        isFetchingNextPage={isFetchingNextPage}
                        onDeleted={() => onCountDelta?.(-1)}
                    />
                )}
            </ScrollableArea>
            <FixedInputArea>
                {activeReply && <ReplyingNotice nickname={activeReply.nickname} onCancel={cancelReply} />}
                <InputWrapper>
                    <CommentInput
                        accompanyId={accompanyId}
                        activeReply={activeReply}
                        cancelReply={cancelReply}
                        onCreated={() => onCountDelta?.(+1)}
                    />
                </InputWrapper>
            </FixedInputArea>
        </>
    );
};

const ScrollableArea = styled.div`
    overflow-y: auto;
    padding-bottom: 100px;
`;

const FixedInputArea = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
    background: transparent;
`;

const InputWrapper = styled.div`
    padding: 4px 16px 12px 16px;
    background-color: ${({ theme }) => theme.color.White};
`;
