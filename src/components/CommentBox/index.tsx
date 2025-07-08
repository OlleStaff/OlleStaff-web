import styled from "@emotion/styled";
import { useCommentState } from "./useCommentState";
import CommentList from "./CommentList";
import CommentInput from "./CommentInput";
import ReplyingNotice from "./ReplyingNotice";
import { Text } from "@/styles/Text";
import { useCommentList } from "./useCommentQuery";

export const CommentBox = ({ accompanyId, commentCount }: { accompanyId: number; commentCount: number }) => {
    const { openReplies, toggleReplies, startReplyTo, activeReply, cancelReply } = useCommentState();
    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useCommentList(accompanyId);

    const comments = data?.pages ? data.pages.flatMap(page => page.items) : [];

    return (
        <>
            <Text.Body1_1>댓글 {commentCount}</Text.Body1_1>
            <ScrollableArea>
                {isLoading ? (
                    // TODO: 추후 스켈레톤 적용
                    <div>댓글 불러오는 중</div>
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
                    />
                )}
            </ScrollableArea>
            <FixedInputArea>
                {activeReply && <ReplyingNotice nickname={activeReply.nickname} onCancel={cancelReply} />}
                <InputWrapper>
                    <CommentInput accompanyId={accompanyId} activeReply={activeReply} cancelReply={cancelReply} />
                </InputWrapper>
            </FixedInputArea>
        </>
    );
};

const ScrollableArea = styled.div`
    padding-bottom: 100px;
    overflow-y: auto;
`;

const FixedInputArea = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const InputWrapper = styled.div`
    padding: 4px 16px 12px 16px;
    background-color: ${({ theme }) => theme.color.White};
`;
