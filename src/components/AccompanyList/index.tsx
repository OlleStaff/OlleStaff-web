import styled from "@emotion/styled";
import { AccompanyListItem } from "./AccompanyListItem";
import { AccompanyListItemProps } from "@/types/accompany";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { SkeletonList } from "../Skeleton/SkeletonList";

interface AccompanyListProps {
    data: AccompanyListItemProps[];
    fetchNextPage?: () => void;
    hasNextPage?: boolean;
    isFetchingNextPage?: boolean;
}

export const AccompanyList = ({ data, fetchNextPage, hasNextPage, isFetchingNextPage }: AccompanyListProps) => {
    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && hasNextPage && fetchNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    return (
        <Wrapper>
            {data.map((item, index) => (
                <AccompanyListItem key={index} {...item} />
            ))}
            {hasNextPage && <div ref={ref} style={{ height: 1 }} />}
            {isFetchingNextPage && <SkeletonList variant="accompany" count={3} />}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;
