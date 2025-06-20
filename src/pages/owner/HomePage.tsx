import SectionTitle from "@/components/SectionTitle";
import { fetchMinimumUserInfo } from "@/hooks/user/useFetchMinumumUserInfo";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PartnerRecruitmentCard from "./components/PartnerRecruitmentCard";
import { Wrapper } from "@/styles/Wrapper";
import { GuesthouseList } from "@/components/GuesthouseList";
import ReviewList from "@/components/ReviewList";
import { ReviewListItemProps } from "@/types/reviews";
import Oops from "@/components/Oops";
import { mockdata_reviews } from "./mock";
import { useMyEmploymentList } from "@/hooks/owner/employment/useGetMyEmploymentList";

export default function HomePage() {
    const navigate = useNavigate();

    const { data } = useMyEmploymentList();

    const [reviewData, setReviewData] = useState<ReviewListItemProps | null>(null);

    useEffect(() => {
        setReviewData(mockdata_reviews);
    }, [data]);

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
            {data && data.length > 0 && <PartnerRecruitmentCard data={data.filter(item => !item.closed)} />}

            <Wrapper.FlexBox direction="column" gap="16px">
                <SectionTitle title="진행 중인 나의 공고" link="/owner/recruitments-ongoing" />
                {data && data.length > 0 ? (
                    <GuesthouseList data={data.filter(item => !item.closed).slice(0, 2)} />
                ) : (
                    <Oops
                        message="작성된 나의 공고가 없어요."
                        description={`홈 > 게시글 작성하기로\n새로운 공고를 등록해 보세요!`}
                    />
                )}
            </Wrapper.FlexBox>

            <Wrapper.FlexBox direction="column" gap="16px">
                <SectionTitle title="작성된 후기" link="/owner/userinfo/reviews" />
                {reviewData && reviewData.allReviewInfoDTOS.length > 0 ? (
                    <ReviewList
                        data={{
                            ...reviewData,
                            allReviewInfoDTOS: reviewData.allReviewInfoDTOS.slice(0, 1),
                        }}
                    />
                ) : (
                    <Oops message="작성된 나의 후기가 없어요." description="후기가 올라올 때까지 기다려주세요!" />
                )}
            </Wrapper.FlexBox>
        </Wrapper.FlexBox>
    );
}
