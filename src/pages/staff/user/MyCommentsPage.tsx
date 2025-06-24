import Header from "@/components/Header";
import PageWrapper from "@/components/PageWrapper";
import { AccompanyList } from "@/components/AccompanyList";
import { useMyCommentsList } from "@/hooks/staff/useMyCommentsList";
import { SkeletonList } from "@/components/Skeleton/SkeletonList";

export default function MyCommentsPage() {
    const { data, isLoading } = useMyCommentsList();

    return (
        <>
            <Header showBackButton title="내가 작성한 댓글" />
            <PageWrapper hasHeader>
                {isLoading ? <SkeletonList variant="accompany" count={6} /> : <AccompanyList data={data || []} />}
            </PageWrapper>
        </>
    );
}
