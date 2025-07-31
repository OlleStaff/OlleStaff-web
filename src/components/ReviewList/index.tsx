import { useState, useMemo } from "react";
import { OwnerTabTypes, TAB_LABELS } from "@/constants/tabs";
import TabSelector from "@/components/TabSelector";
import ReviewListItem from "./ReviewListItem";
import { ReviewListItemProps } from "@/types/reviews";
import { Wrapper } from "@/styles/Wrapper";
import { useLocation } from "react-router-dom";
import Oops from "../Oops";

type ReviewTab = OwnerTabTypes["REVIEW_MANAGE"]; // "전체" | "완료됨"
type ReviewFilter = "ALL" | "COMMENTED";

interface ReviewListProps {
    data: ReviewListItemProps;
}

export default function ReviewList({ data }: ReviewListProps) {
    const [tab, setTab] = useState<ReviewTab>("전체");
    const convertTabToFilter = (label: ReviewTab): ReviewFilter => (label === "전체" ? "ALL" : "COMMENTED");

    const filter = convertTabToFilter(tab);

    const [openedReviewId, setOpenedReviewId] = useState<number | null>(null);
    const location = useLocation();
    const isOwnerRoot = location.pathname.startsWith("/owner");
    const isOwnerHome = location.pathname === "/owner";

    const completedReviews = useMemo(() => {
        return data.allReviewInfoDTOS.filter(item => !!item.reviewComment?.trim());
    }, [data]);

    const filteredReviews = useMemo(() => {
        if (filter === "ALL") return data.allReviewInfoDTOS;
        return completedReviews;
    }, [filter, data, completedReviews]);

    const hasAllReviews = data.countReview > 0;

    return (
        <div>
            {isOwnerRoot && !isOwnerHome && (
                <>
                    <TabSelector
                        variant="bold"
                        labels={[...TAB_LABELS.OWNER.REVIEW_MANAGE]}
                        selected={tab}
                        onChange={value => setTab(value as ReviewTab)}
                    />
                </>
            )}

            <Wrapper.FlexBox direction="column" gap="20px">
                {filteredReviews.length > 0 ? (
                    filteredReviews.map(item => (
                        <ReviewListItem
                            key={item.reviewId}
                            data={item}
                            openedReviewId={openedReviewId}
                            setOpenedReviewId={setOpenedReviewId}
                        />
                    ))
                ) : hasAllReviews && filter === "COMMENTED" ? (
                    <Wrapper.FlexBox gap="12px" justifyContent="center">
                        <Oops
                            message="아직 리뷰에 대한 댓글을 달지 않았어요."
                            description="작성된 후기에 답댓글을 남겨주세요!"
                        />
                    </Wrapper.FlexBox>
                ) : (
                    <Wrapper.FlexBox gap="12px" justifyContent="center">
                        <Oops message="작성된 나의 후기가 없어요." description="후기가 올라올 때까지 기다려주세요!" />
                    </Wrapper.FlexBox>
                )}
            </Wrapper.FlexBox>
        </div>
    );
}
