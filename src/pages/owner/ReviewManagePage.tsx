import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import PageWrapper from "@/components/PageWrapper";
import ReviewList from "@/components/ReviewList";
import { OwnerTabTypes } from "@/constants/tabs";
import { useGetAllReviewsForGuesthouse } from "@/hooks/owner/review";
import { fetchMinimumUserInfo } from "@/hooks/user/useFetchMinumumUserInfo";
import { Text } from "@/styles/Text";
import { Wrapper } from "@/styles/Wrapper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type ReviewTab = OwnerTabTypes["REVIEW_MANAGE"];
type ReviewFilter = "ALL" | "COMMENTED";

export default function ReviewManagePage() {
    const navigate = useNavigate();
    const [nickname, setNickname] = useState("");

    useEffect(() => {
        const getNickname = async () => {
            try {
                const { nickname } = await fetchMinimumUserInfo();
                if (!nickname) {
                    navigate("/");
                } else {
                    setNickname(nickname);
                }
            } catch (err) {
                console.error("닉네임 확인 실패", err);
                navigate("/");
            }
        };

        getNickname();
    }, []);

    const convertTabToFilter = (label: ReviewTab): ReviewFilter => {
        return label === "전체" ? "ALL" : "COMMENTED";
    };

    const [tab, _setTab] = useState<ReviewTab>("전체");
    const filter = convertTabToFilter(tab);

    const { data, isLoading, isError } = useGetAllReviewsForGuesthouse(filter);

    if (isLoading) return <LoadingSpinner />;
    if (isError || !data) {
        navigate("/404");
        return null;
    }
    return (
        <>
            <Header showBackButton title="후기 관리" />
            <PageWrapper hasHeader>
                <Wrapper.FlexBox direction="column" gap="20px">
                    <Wrapper.FlexBox direction="column" gap="8px">
                        <Text.Body2_1>총 {data?.countReview ?? 0}개의 후기</Text.Body2_1>
                        <Text.Body1_1>{nickname}님의 평균 평점</Text.Body1_1>
                        <Wrapper.FlexBox gap="6px" alignItems="center">
                            <img src="/icons/fullStar.svg" alt="별" />
                            <Text.Title2_2>
                                {data?.averageRating ?? 0.0} <Text.Title2_1>점</Text.Title2_1>
                            </Text.Title2_2>
                        </Wrapper.FlexBox>
                    </Wrapper.FlexBox>

                    <ReviewList data={data} />
                </Wrapper.FlexBox>
            </PageWrapper>
        </>
    );
}
