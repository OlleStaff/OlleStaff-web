import styled from "@emotion/styled";
import { GuesthouseListItem } from "./GuesthouseListItem";
import { GuesthouseListItemProps } from "@/types/guesthouse";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { SkeletonList } from "../Skeleton/SkeletonList";

interface GuesthouseListProps {
    data: GuesthouseListItemProps[];
    isTrashIconClicked?: boolean;
    checkedIds?: number[];
    onToggleCheck?: (id: number) => void;
    fetchNextPage?: () => void;
    hasNextPage?: boolean;
    isFetchingNextPage?: boolean;
}

export const GuesthouseList = ({
    data,
    isTrashIconClicked,
    checkedIds,
    onToggleCheck,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
}: GuesthouseListProps) => {
    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && hasNextPage && fetchNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    return (
        <Wrapper>
            {data.map(item => (
                <GuesthouseListItem
                    key={item.employmentId}
                    {...item}
                    isTrashIconActive={isTrashIconClicked}
                    isChecked={checkedIds?.includes(item.employmentId)}
                    onCheckToggle={onToggleCheck}
                />
            ))}
            {hasNextPage && <div ref={ref} style={{ height: 1 }} />}
            {isFetchingNextPage && <SkeletonList variant="guesthouse" count={3} />}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;
