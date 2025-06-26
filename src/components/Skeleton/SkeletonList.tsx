import { Wrapper } from "@/styles/Wrapper";
import { SkeletonAccompanyItem } from "./SkeletonAccompanyItem";
import { SkeletonGuesthouseItem } from "./SkeletonGuesthouseItem";
import { SkeletonReviewItem } from "./SkeletonReviewItem";
import DeferredComponent from "./base/DeferredComponent";

interface SkeletonListProps {
    variant: "accompany" | "guesthouse" | "review";
    count?: number;
    delay?: number;
}

export const SkeletonList = ({ variant, count = 5, delay = 500 }: SkeletonListProps) => {
    const SkeletonItem =
        variant === "accompany"
            ? SkeletonAccompanyItem
            : variant === "guesthouse"
              ? SkeletonGuesthouseItem
              : SkeletonReviewItem;

    const content = (
        <Wrapper.FlexBox direction="column" gap="12px">
            {Array.from({ length: count }).map((_, idx) => (
                <SkeletonItem key={idx} />
            ))}
        </Wrapper.FlexBox>
    );

    return <DeferredComponent delay={delay}>{content}</DeferredComponent>;
};
