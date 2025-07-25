import SectionTitle from "@/components/SectionTitle";
import { fetchMinimumUserInfo } from "@/hooks/user/useFetchMinumumUserInfo";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PartnerRecruitmentCard from "./components/PartnerRecruitmentCard";
import { Wrapper } from "@/styles/Wrapper";
import { GuesthouseList } from "@/components/GuesthouseList";
import ReviewList from "@/components/ReviewList";
import Oops from "@/components/Oops";
import { isClosed } from "@/utils/date";
import { useGetMyEmploymentList } from "@/hooks/owner/employment";
import { useGetAllReviewsForGuesthouse } from "@/hooks/owner/review";

import { SkeletonGuesthouseItem } from "@/components/Skeleton/SkeletonGuesthouseItem";
import { SkeletonReviewItem } from "@/components/Skeleton/SkeletonReviewItem";
import { SkeletonBox } from "@/components/Skeleton/base/SkeletonBox";

export default function HomePage() {
    const PREVIEW_COUNT = 2;
    const navigate = useNavigate();

    const { data: employmentData, isLoading: isEmploymentLoading } = useGetMyEmploymentList();
    const { data: reviewData, isLoading: isReviewLoading } = useGetAllReviewsForGuesthouse("ALL");

    const isAllClosed = employmentData?.every(item => isClosed(item.recruitmentEnd));

    useEffect(() => {
        const checkApplicationStatus = async () => {
            try {
                const user = await fetchMinimumUserInfo();

                if (!user || !user.nickname) {
                    navigate("/");
                } else if (!user.userType) {
                    navigate("/type-select");
                } else if (!user.onboarded) {
                    navigate("/business-verification");
                }
            } catch (err) {
                console.error("사용자 정보 확인 실패", err);
                navigate("/");
            }
        };

        checkApplicationStatus();
    }, []);

    return (
        <Wrapper.FlexBox direction="column" gap="32px">
            {isEmploymentLoading ? (
                <SkeletonBox width="100%" height="185px" />
            ) : (
                employmentData &&
                employmentData.length > 0 && (
                    <PartnerRecruitmentCard data={employmentData.filter(item => !item.closed)} />
                )
            )}
            <Wrapper.FlexBox direction="column" gap="16px">
                <SectionTitle title="진행 중인 나의 공고" link="/owner/recruitments-ongoing" />
                {isEmploymentLoading ? (
                    <>
                        {Array.from({ length: PREVIEW_COUNT }).map((_, idx) => (
                            <SkeletonGuesthouseItem key={idx} />
                        ))}
                    </>
                ) : employmentData && employmentData.length > 0 && !isAllClosed ? (
                    <GuesthouseList data={employmentData.filter(item => !item.closed).slice(0, PREVIEW_COUNT)} />
                ) : (
                    <Oops
                        message="작성된 나의 공고가 없어요."
                        description={`홈 > 게시글 작성하기로\n새로운 공고를 등록해 보세요!`}
                    />
                )}
            </Wrapper.FlexBox>

            <Wrapper.FlexBox direction="column" gap="16px">
                <SectionTitle title="작성된 후기" link="/owner/userinfo/reviews" />
                {isReviewLoading ? (
                    <>
                        {Array.from({ length: PREVIEW_COUNT }).map((_, idx) => (
                            <SkeletonReviewItem key={idx} />
                        ))}
                    </>
                ) : reviewData && reviewData.allReviewInfoDTOS.length > 0 ? (
                    <ReviewList
                        data={{
                            ...reviewData,
                            allReviewInfoDTOS: reviewData.allReviewInfoDTOS.slice(0, PREVIEW_COUNT),
                        }}
                    />
                ) : (
                    <Oops message="작성된 나의 후기가 없어요." description="후기가 올라올 때까지 기다려주세요!" />
                )}
            </Wrapper.FlexBox>
        </Wrapper.FlexBox>
    );
}
