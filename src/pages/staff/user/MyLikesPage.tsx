import { AccompanyList } from "@/components/AccompanyList";
import { GuesthouseList } from "@/components/GuesthouseList";
import Header from "@/components/Header";
import PageWrapper from "@/components/PageWrapper";
import { SkeletonList } from "@/components/Skeleton/SkeletonList";
import TabSelector from "@/components/TabSelector";
import { StaffTabTypes, TAB_LABELS } from "@/constants/tabs";
import { useMyLikeAccompany } from "@/hooks/staff/useMyLikeAccompny";
import { useMyLikeRecruitClosed, useMyLikeRecruitOpen } from "@/hooks/staff/useMyLikeRecruit";
import { Wrapper } from "@/styles/Wrapper";
import { useEffect, useState } from "react";

type SavedTab = StaffTabTypes["SAVED_POSTS"]; // "공고" | "동행"
type RecruitTab = StaffTabTypes["SEARCH"]; // "진행중인 공고" | "마감공고"

export default function MyLikesPage() {
    const [mainTab, setMainTab] = useState<SavedTab>("공고");
    const [recruitTab, setRecruitTab] = useState<RecruitTab>("진행중인 공고");

    // 동행
    const {
        data: accompanyData,
        isLoading: accompanyLoading,
        fetchNextPage: accompanyFetchNext,
        hasNextPage: accompanyHasNext,
        isFetchingNextPage: accompanyFetchingNext,
        refetch: refetchAccompany,
    } = useMyLikeAccompany();
    const accompanyItems = accompanyData?.pages ? accompanyData.pages.flatMap(p => p.accompanies) : [];

    // 공고 - 진행중
    const {
        data: openData,
        isLoading: openLoading,
        fetchNextPage: openFetchNext,
        hasNextPage: openHasNext,
        isFetchingNextPage: openFetchingNext,
        refetch: refetchOpen,
    } = useMyLikeRecruitOpen();
    const openItems = openData?.pages ? openData.pages.flatMap(p => p.items) : [];

    // 공고 - 마감
    const {
        data: closedData,
        isLoading: closedLoading,
        fetchNextPage: closedFetchNext,
        hasNextPage: closedHasNext,
        isFetchingNextPage: closedFetchingNext,
        refetch: refetchClosed,
    } = useMyLikeRecruitClosed();
    const closedItems = closedData?.pages ? closedData.pages.flatMap(p => p.items) : [];

    // 탭 전환 시 필요한 목록만 refetch
    useEffect(() => {
        if (mainTab === "동행") {
            refetchAccompany();
        } else {
            recruitTab === "진행중인 공고" ? refetchOpen() : refetchClosed();
        }
    }, [mainTab, recruitTab, refetchAccompany, refetchOpen, refetchClosed]);

    return (
        <>
            <Header showBackButton title="저장한 글" />
            <PageWrapper hasHeader>
                <Wrapper.FlexBox margin="0 0 24px">
                    <TabSelector
                        labels={[...TAB_LABELS.STAFF.SAVED_POSTS]}
                        selected={mainTab}
                        onChange={label => setMainTab(label as SavedTab)}
                        variant="underline"
                    />
                </Wrapper.FlexBox>

                {mainTab === "공고" && (
                    <Wrapper.FlexBox margin="0 0 14px">
                        <TabSelector
                            labels={[...TAB_LABELS.STAFF.SEARCH]}
                            selected={recruitTab}
                            onChange={label => setRecruitTab(label as RecruitTab)}
                            variant="bold"
                        />
                    </Wrapper.FlexBox>
                )}

                {/* 동행 탭 */}
                {mainTab === "동행" &&
                    (accompanyLoading ? (
                        <SkeletonList variant="accompany" count={5} />
                    ) : accompanyItems.length === 0 ? (
                        <EmptyState message="저장한 동행이 없습니다." />
                    ) : (
                        <AccompanyList
                            data={accompanyItems}
                            fetchNextPage={accompanyFetchNext}
                            hasNextPage={accompanyHasNext}
                            isFetchingNextPage={accompanyFetchingNext}
                        />
                    ))}

                {/* 공고 탭 */}
                {mainTab === "공고" &&
                    (recruitTab === "진행중인 공고" ? (
                        openLoading ? (
                            <SkeletonList variant="guesthouse" count={5} />
                        ) : openItems.length === 0 ? (
                            <EmptyState message="저장한 진행중인 공고가 없습니다." />
                        ) : (
                            <GuesthouseList
                                data={openItems}
                                fetchNextPage={openFetchNext}
                                hasNextPage={openHasNext}
                                isFetchingNextPage={openFetchingNext}
                            />
                        )
                    ) : closedLoading ? (
                        <SkeletonList variant="guesthouse" count={5} />
                    ) : closedItems.length === 0 ? (
                        <EmptyState message="저장한 마감된 공고가 없습니다." />
                    ) : (
                        <GuesthouseList
                            data={closedItems}
                            fetchNextPage={closedFetchNext}
                            hasNextPage={closedHasNext}
                            isFetchingNextPage={closedFetchingNext}
                        />
                    ))}
            </PageWrapper>
        </>
    );
}

// 비어있을 때 임시 메시지
function EmptyState({ message }: { message: string }) {
    return <Wrapper.FlexBox>{message}</Wrapper.FlexBox>;
}
