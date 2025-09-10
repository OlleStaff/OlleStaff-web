import { useState } from "react";
import Input from "@/components/Input";
import styled from "@emotion/styled";
import { useCreateComment, useCreateReply } from "./useCommentMutation";

interface CommentInputProps {
    placeholder?: string;
    disabled?: boolean;
    accompanyId: number;
    activeReply: { commentId: number; nickname: string } | null;
    cancelReply: () => void;
    onCreated?: () => void;
}

export default function CommentInput({
    placeholder = "댓글을 입력하세요.",
    disabled,
    accompanyId,
    activeReply,
    cancelReply,
    onCreated,
}: CommentInputProps) {
    const [text, setText] = useState("");
    const { mutate: createComment } = useCreateComment();
    const { mutate: createReply } = useCreateReply();

    const handleSubmit = () => {
        if (!text.trim()) return;

        if (activeReply) {
            createReply(
                {
                    accompanyId,
                    commentId: activeReply.commentId,
                    content: text,
                },
                {
                    onSuccess: () => {
                        setText("");
                        cancelReply();
                    },
                }
            );
        } else {
            createComment(
                { accompanyId, content: text },
                {
                    onSuccess: () => {
                        setText("");
                        onCreated?.();
                    },
                }
            );
        }
    };

    return (
        <Input
            variant="comment"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder={placeholder}
            rightIcon={<SendImage src="/icons/arrow_top.svg" alt="화살표 아이콘" />}
            onRightIconClick={handleSubmit}
            disabled={disabled}
        />
    );
}

const SendImage = styled.img`
    width: 20px;
    height: 20px;
    cursor: pointer;
`;
