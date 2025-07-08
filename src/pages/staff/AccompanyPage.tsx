import { useState } from "react";
import Header from "@/components/Header";
import PageWrapper from "@/components/PageWrapper";
import { AccompanyList } from "@/components/AccompanyList";
import TabSelector from "@/components/TabSelector";
import { useNavigate } from "react-router-dom";
import { useAccompanyList } from "@/hooks/staff/useAccompanyList";
import { StaffTabTypes, TAB_LABELS } from "@/constants/tabs";
import { SkeletonList } from "@/components/Skeleton/SkeletonList";

type CompanionTab = StaffTabTypes["COMPANION"]; // "전체", "인기순"

export default function AccompanyPage() {
    const [sort, setSort] = useState<CompanionTab>("전체");
    const navigate = useNavigate();
    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useAccompanyList();

    const handleWriteClick = () => {
        navigate("write");
    };

    const items = data?.pages ? data.pages.flatMap(page => page.accompanies) : []; // 평탄화

    return (
        <>
            <Header title="동행 구하기" rightIconSrc="/icons/edit.svg" onRightClick={handleWriteClick} />
            <PageWrapper hasHeader>
                <TabSelector
                    labels={[...TAB_LABELS.STAFF.COMPANION]}
                    selected={sort}
                    onChange={value => setSort(value as CompanionTab)}
                    variant="bold"
                />
                {isLoading ? (
                    <SkeletonList variant="accompany" count={5} />
                ) : (
                    <AccompanyList
                        data={items}
                        fetchNextPage={fetchNextPage}
                        hasNextPage={hasNextPage}
                        isFetchingNextPage={isFetchingNextPage}
                    />
                )}
            </PageWrapper>
        </>
    );
}
