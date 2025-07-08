import { Wrapper } from "@/styles/Wrapper";
import { SkeletonBox } from "./base/SkeletonBox";
import { Card } from "../GuesthouseList/GuesthouseListItem";
import { ContentWrapper } from "./SkeletonStyle";

export const SkeletonGuesthouseItem = () => {
    return (
        <Card>
            <SkeletonBox width="88px" height="88px" borderRadius="4px" />
            <ContentWrapper>
                <Wrapper.FlexBox gap="4px">
                    <SkeletonBox width="40px" height="18px" borderRadius="40px" />
                    <SkeletonBox width="40px" height="18px" borderRadius="40px" />
                    <SkeletonBox width="32px" height="18px" borderRadius="40px" />
                </Wrapper.FlexBox>
                <Wrapper.FlexBox direction="column" gap="6px">
                    <SkeletonBox width="70%" height="18px" />
                    <SkeletonBox width="90%" height="16px" />
                </Wrapper.FlexBox>
                <Wrapper.FlexBox gap="4px">
                    <SkeletonBox width="40%" height="14px" />
                    <SkeletonBox width="40%" height="14px" />
                </Wrapper.FlexBox>
            </ContentWrapper>
        </Card>
    );
};
