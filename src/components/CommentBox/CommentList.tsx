import { useInView } from "react-intersection-observer";
import CommentItem from "./CommentItem";
import { CommentType } from "@/types/comment";
import { useEffect } from "react";

interface CommentListProps {
    comments: CommentType[];
    openReplies: Record<number, boolean>;
    onReplyClick: (commentId: number, nickname: string) => void;
    onToggleReplies: (commentId: number) => void;
    accompanyId: number;
    fetchNextPage?: () => void;
    hasNextPage?: boolean;
    isFetchingNextPage?: boolean;
}

export default function CommentList({
    comments,
    openReplies,
    onReplyClick,
    onToggleReplies,
    accompanyId,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
}: CommentListProps) {
    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && hasNextPage && fetchNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);
    return (
        <div>
            {comments.map(comment => (
                <CommentItem
                    key={comment.id}
                    comment={comment}
                    onReplyClick={onReplyClick}
                    onToggleReplies={onToggleReplies}
                    areRepliesOpen={!!openReplies[comment.id]}
                    accompanyId={accompanyId}
                />
            ))}
            {hasNextPage && <div ref={ref} style={{ height: 1 }} />}
            {isFetchingNextPage && <div>댓글 더 불러오는 중...</div>}
        </div>
    );
}
