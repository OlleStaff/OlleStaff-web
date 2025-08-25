import Header from "@/components/Header";
import PageWrapper from "@/components/PageWrapper";
import { Wrapper } from "@/styles/Wrapper";
import Oops from "@/components/Oops";
import { useMyReviewList } from "@/hooks/staff/useMyReviewList";
import { StaffTabTypes, TAB_LABELS } from "@/constants/tabs";
import { useState } from "react";
import TabSelector from "@/components/TabSelector";
import { SkeletonList } from "@/components/Skeleton/SkeletonList";
import ReviewListItem from "@/components/ReviewList/ReviewListItem";
import { ReviewInfo } from "@/types/reviews";
import ReviewWriteCard from "../components/ReviewWriteCard";
import { useNavigate } from "react-router-dom";
import { useUnwrittenReview } from "@/hooks/staff/useUnwrittenReview";
import { toDotDate } from "@/utils/date";

export default function MyReviewsPage() {
    const [filter, setFilter] = useState<StaffTabTypes["MY_REVIEW"]>("1주일");
    const { data, isLoading } = useMyReviewList(filter);
    const [openedReviewId, setOpenedReviewId] = useState<number | null>(null);
    const reviews = data?.allReviewInfoDTOS ?? [];
    const navigate = useNavigate();
    const { data: unwrittenData } = useUnwrittenReview();

    // const unwrittenData = [
    //     {
    //         employmentId: 101,
    //         title: "결 게스트하우스",
    //         startedAt: "2025-01-28",
    //         endedAt: "2025-02-26",
    //     },
    //     {
    //         employmentId: 202,
    //         title: "바다뷰 게스트하우스",
    //         startedAt: "2025-03-01",
    //         endedAt: "2025-03-31",
    //     },
    // ];

    const writeTargets = (unwrittenData ?? []).map(item => ({
        id: item.employmentId,
        title: item.title,
        dateRange: `${toDotDate(item.startedAt)} - ${toDotDate(item.endedAt)}`,
    }));

    const handleWriteClick = (employmentId: number, title: string) => {
        navigate("/staff/review", { state: { employmentId, title } });
    };

    return (
        <>
            <Header showBackButton title="내가 작성한 후기" />
            <PageWrapper hasHeader>
                {writeTargets.length > 0 && (
                    <div style={{ margin: "0 0 16px 0" }}>
                        <ReviewWriteCard items={writeTargets} onWriteClick={handleWriteClick} />
                    </div>
                )}
                <TabSelector
                    labels={[...TAB_LABELS.STAFF.MY_REVIEW]}
                    selected={filter}
                    onChange={label => setFilter(label as StaffTabTypes["MY_REVIEW"])}
                    variant="bold"
                />

                <Wrapper.FlexBox margin="5px 0" direction="column" gap="20px">
                    {isLoading ? (
                        <SkeletonList variant="review" count={3} />
                    ) : reviews.length > 0 ? (
                        reviews.map((review: ReviewInfo) => (
                            <ReviewListItem
                                key={review.reviewId}
                                data={review}
                                openedReviewId={openedReviewId}
                                setOpenedReviewId={setOpenedReviewId}
                            />
                        ))
                    ) : (
                        <Oops message="작성된 나의 후기가 없어요." description="후기가 올라올 때까지 기다려주세요!" />
                    )}
                </Wrapper.FlexBox>
            </PageWrapper>
        </>
    );
}
