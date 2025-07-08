import Header from "@/components/Header";
import PageWrapper from "@/components/PageWrapper";
import { AccompanyList } from "@/components/AccompanyList";
import { useMyAccompanyList } from "@/hooks/staff/useMyAccompanyList";
import { SkeletonList } from "@/components/Skeleton/SkeletonList";

export default function MyPostsPage() {
    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useMyAccompanyList();

    const items = data?.pages ? data.pages.flatMap(page => page.accompanies) : [];

    return (
        <>
            <Header showBackButton title="내가 작성한 게시글" />
            <PageWrapper hasHeader>
                {isLoading ? (
                    <SkeletonList variant="accompany" count={6} />
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
