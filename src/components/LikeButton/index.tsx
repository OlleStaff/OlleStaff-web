import { useState } from "react";
import styled from "@emotion/styled";
import { Text } from "@/styles/Text";
import { useAccompanyLike } from "@/hooks/staff/useAccompanyLike";
import { useQueryClient, InfiniteData } from "@tanstack/react-query";
import type { AccompanyListItemProps } from "@/types/accompany";

type AccompanyListPage = {
    accompanies: AccompanyListItemProps[];
    cursor: number | null;
    hasNext: boolean;
};

interface LikeButtonProps {
    accompanyId: number;
    initialLiked: boolean;
    initialCount: number;
}

export default function LikeButton({ accompanyId, initialLiked, initialCount }: LikeButtonProps) {
    const { postAccompanyLike, deleteAccompanyLike } = useAccompanyLike();
    const qc = useQueryClient();

    const [liked, setLiked] = useState(initialLiked);
    const [count, setCount] = useState(initialCount);

    const patchAccompanyListCache = (nextLiked: boolean, nextCount: number) => {
        const lists = qc.getQueriesData<InfiniteData<AccompanyListPage>>({ queryKey: ["accompanyList"] });
        for (const [key, data] of lists) {
            if (!data) continue;
            qc.setQueryData<InfiniteData<AccompanyListPage>>(key, {
                ...data,
                pages: data.pages.map(p => ({
                    ...p,
                    accompanies: p.accompanies.map(a =>
                        a.id === accompanyId ? { ...a, like: nextLiked, likeCount: nextCount } : a
                    ),
                })),
            });
        }
    };

    const toggleLike = async () => {
        // 낙관적 업데이트
        const prev = { liked, count };
        const optimistic = { liked: !liked, count: liked ? count - 1 : count + 1 };
        setLiked(optimistic.liked);
        setCount(optimistic.count);
        patchAccompanyListCache(optimistic.liked, optimistic.count);

        try {
            if (prev.liked) {
                await deleteAccompanyLike(accompanyId);
            } else {
                await postAccompanyLike(accompanyId);
            }
        } catch (err) {
            console.error("좋아요 요청 실패", err);
            setLiked(prev.liked);
            setCount(prev.count);
            patchAccompanyListCache(prev.liked, prev.count);
        } finally {
        }
    };

    return (
        <IconWrapper onClick={toggleLike} aria-pressed={liked}>
            <Icon
                src="/icons/heart_black.svg"
                alt={liked ? "좋아요 취소" : "좋아요"}
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

const IconWrapper = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: none;
    border: 0;
`;

const Icon = styled.img`
    width: 32px;
    height: 32px;
    object-fit: contain;
`;
