import { AccompanyList } from "@/components/AccompanyList";
import Header from "@/components/Header";
import PageWrapper from "@/components/PageWrapper";
import { SkeletonList } from "@/components/Skeleton/SkeletonList";
import TabSelector from "@/components/TabSelector";
import { StaffTabTypes, TAB_LABELS } from "@/constants/tabs";
import { useMyLikeAccompany } from "@/hooks/staff/useMyLikeAccompny";
import { useMyLikeRecruitClosed, useMyLikeRecruitOpen } from "@/hooks/staff/useMyLikeRecruit";
import { useEffect, useState } from "react";

export default function MyLikesPage() {
    const [filter, setFilter] = useState<StaffTabTypes["SAVED_POSTS"]>("공고");
    const [sfilter, ssetFilter] = useState<StaffTabTypes["SEARCH"]>("진행중인 공고");

    const { data: accompanyData, isLoading: accompanyLoading, refetch: refetchAccompany } = useMyLikeAccompany();

    const { data: openRecruitData, refetch: refetchOpenRecruit } = useMyLikeRecruitOpen();

    const { data: closedRecruitData, refetch: refetchClosedRecruit } = useMyLikeRecruitClosed();

    useEffect(() => {
        if (filter === "동행") {
            refetchAccompany();
        } else if (filter === "공고") {
            if (sfilter === "진행중인 공고") {
                refetchOpenRecruit();
            } else {
                refetchClosedRecruit();
            }
        }
    }, [filter, sfilter]);

    return (
        <>
            <Header showBackButton title="저장한 글" />
            <PageWrapper hasHeader>
                <TabSelector
                    labels={[...TAB_LABELS.STAFF.SAVED_POSTS]}
                    selected={filter}
                    onChange={label => setFilter(label as StaffTabTypes["SAVED_POSTS"])}
                    variant="underline"
                />

                {filter === "공고" && (
                    <TabSelector
                        labels={[...TAB_LABELS.STAFF.SEARCH]}
                        selected={sfilter}
                        onChange={label => ssetFilter(label as StaffTabTypes["SEARCH"])}
                        variant="bold"
                    />
                )}

                {filter === "동행" &&
                    (accompanyLoading ? (
                        <SkeletonList variant="accompany" count={5} />
                    ) : (
                        <AccompanyList data={accompanyData || []} />
                    ))}

                {filter === "공고" && (
                    <div>
                        {sfilter === "진행중인 공고" ? (
                            <div>{JSON.stringify(openRecruitData)}</div>
                        ) : (
                            <div>{JSON.stringify(closedRecruitData)}</div>
                        )}
                    </div>
                )}
            </PageWrapper>
        </>
    );
}
