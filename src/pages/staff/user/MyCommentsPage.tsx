import Header from "@/components/Header";
import PageWrapper from "@/components/PageWrapper";
import { AccompanyList } from "@/components/AccompanyList";
import { useMyCommentsList } from "@/hooks/staff/useMyCommentsList";
import { SkeletonList } from "@/components/Skeleton/SkeletonList";
import Oops from "@/components/Oops";

export default function MyCommentsPage() {
    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useMyCommentsList();

    const items = data?.pages ? data.pages.flatMap(page => page.accompanies) : [];

    return (
        <>
            <Header showBackButton title="내가 작성한 댓글" />
            <PageWrapper hasHeader>
                {isLoading ? (
                    <SkeletonList variant="accompany" count={6} />
                ) : items.length === 0 ? (
                    <Oops message="작성한 댓글이 없어요." description="댓글을 작성해 보세요!" />
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
