import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import PageWrapper from "@/components/PageWrapper";
import { GuesthouseList } from "@/components/GuesthouseList";
import TabSelector from "@/components/TabSelector";
import { useState } from "react";
import { StaffTabTypes, TAB_LABELS } from "@/constants/tabs";
import { categoryMap } from "@/constants/categories";
import { useEmploymentAll } from "@/hooks/staff/useEmploymentAll";
import Oops from "@/components/Oops";
import { Wrapper } from "@/styles/Wrapper";

type SearchTab = StaffTabTypes["SEARCH"]; // "진행중인 공고", "마감공고"

export default function CategoryPage() {
    const [sort, setSort] = useState<SearchTab>("진행중인 공고");
    const [params] = useSearchParams();
    const label = params.get("label") || "";
    const category = categoryMap[label];

    const {
        data = [],
        isLoading,
        isError,
    } = useEmploymentAll({
        type: sort === "마감공고" ? "END" : "IN_PROGRESS",
        category,
        pageSize: 10,
    });

    return (
        <>
            <Header showBackButton title={label || "카테고리"} />
            <PageWrapper hasHeader>
                <TabSelector
                    labels={[...TAB_LABELS.STAFF.SEARCH]}
                    selected={sort}
                    onChange={value => setSort(value as SearchTab)}
                    variant="bold"
                />
                {isLoading ? (
                    <p>로딩중...</p>
                ) : isError ? (
                    <p>에러가 발생했습니다. 다시 시도해주세요.</p>
                ) : data.length === 0 ? (
                    <Wrapper.FlexBox gap="12px" alignItems="center" direction="column" padding="50% 0">
                        <Oops
                            message="등록된 공고가 없어요."
                            description={`다른 카테고리를 선택하거나\n나중에 다시 확인해보세요!`}
                        />
                    </Wrapper.FlexBox>
                ) : (
                    <GuesthouseList data={data} />
                )}
            </PageWrapper>
        </>
    );
}
