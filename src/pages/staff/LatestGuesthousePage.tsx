import Header from "@/components/Header";
import PageWrapper from "@/components/PageWrapper";
import { GuesthouseList } from "@/components/GuesthouseList";
import { useEmploymentLatest } from "@/hooks/staff/useEmploymentAll";
import Oops from "@/components/Oops";
import { Wrapper } from "@/styles/Wrapper";
import { SkeletonList } from "@/components/Skeleton/SkeletonList";

export default function LatestGuesthousePage() {
    const { data, isLoading, isError } = useEmploymentLatest(10);
    return (
        <>
            <Header title="새로운 공고" showBackButton />
            <PageWrapper hasHeader>
                {isLoading ? (
                    <SkeletonList variant="guesthouse" count={5} />
                ) : isError ? (
                    <Oops message="에러가 발생했어요" description="다시 시도해주세요" />
                ) : !data || data.length === 0 ? (
                    <Wrapper.FlexBox gap="12px" alignItems="center" direction="column" padding="50% 0">
                        <Oops message="작성된 공고가 없어요." description="공고가 올라올 때까지 기다려주세요!" />
                    </Wrapper.FlexBox>
                ) : (
                    <GuesthouseList
                        data={data}
                        fetchNextPage={undefined}
                        hasNextPage={false}
                        isFetchingNextPage={false}
                    />
                )}
            </PageWrapper>
        </>
    );
}
