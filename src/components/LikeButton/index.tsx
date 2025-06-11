import { useState } from "react";
import styled from "@emotion/styled";
import { Text } from "@/styles/Text";
import { useAccompanyLike } from "@/hooks/staff/useAccompanyLike";

interface LikeButtonProps {
    accompanyId: number;
    initialLiked: boolean;
    initialCount: number;
}

export default function LikeButton({ accompanyId, initialLiked, initialCount }: LikeButtonProps) {
    const { postAccompanyLike, deleteAccompanyLike } = useAccompanyLike();
    const [liked, setLiked] = useState(initialLiked);
    const [count, setCount] = useState(initialCount);

    const toggleLike = async () => {
        try {
            if (liked) {
                await deleteAccompanyLike(accompanyId);
                setLiked(false);
                setCount(prev => prev - 1);
            } else {
                await postAccompanyLike(accompanyId);
                setLiked(true);
                setCount(prev => prev + 1);
            }
        } catch (err) {
            console.error("좋아요 요청 실패", err);
        }
    };

    return (
        <IconWrapper onClick={toggleLike}>
            <Icon
                src="/icons/heart_black.svg"
                alt="좋아요"
                style={{
                    filter: liked
                        ? "invert(30%) sepia(94%) saturate(7464%) hue-rotate(349deg) brightness(98%) contrast(105%)"
                        : "none",
                }}
            />
            <Text.Body1 style={{ marginTop: "4px" }}>{count}</Text.Body1>
        </IconWrapper>
    );
}

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const Icon = styled.img`
    width: 24px;
    height: 24px;
    object-fit: contain;
`;
