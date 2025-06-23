import { Wrapper } from "@/styles/Wrapper";
import { SkeletonAccompanyItem } from "./SkeletonAccompanyItem";
import { SkeletonGuesthouseItem } from "./SkeletonGuesthouseItem";

interface SkeletonListProps {
    variant: "accompany" | "guesthouse";
    count?: number;
}

export const SkeletonList = ({ variant, count = 5 }: SkeletonListProps) => {
    const SkeletonItem = variant === "accompany" ? SkeletonAccompanyItem : SkeletonGuesthouseItem;

    return (
        <Wrapper.FlexBox direction="column" gap="12px">
            {Array.from({ length: count }).map((_, idx) => (
                <SkeletonItem key={idx} />
            ))}
        </Wrapper.FlexBox>
    );
};
