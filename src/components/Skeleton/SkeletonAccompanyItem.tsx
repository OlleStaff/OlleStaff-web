import { Wrapper } from "@/styles/Wrapper";
import { SkeletonBox } from "./base/SkeletonBox";
import { Card } from "../AccompanyList/AccompanyListItem";
import { ContentWrapper } from "./SkeletonStyle";

export const SkeletonAccompanyItem = () => {
    return (
        <Card>
            <SkeletonBox width="88px" height="88px" borderRadius="4px" />
            <ContentWrapper>
                <SkeletonBox width="60%" height="18px" />
                <SkeletonBox width="90%" height="32px" />
                <Wrapper.FlexBox justifyContent="space-between" width="100%" alignItems="center">
                    <Wrapper.FlexBox gap="4px" width="fit" alignItems="center">
                        <SkeletonBox width="24px" height="24px" borderRadius="50%" />
                        <SkeletonBox width="24px" height="16px" />
                        <SkeletonBox width="24px" height="24px" borderRadius="50%" />
                        <SkeletonBox width="24px" height="16px" />
                    </Wrapper.FlexBox>
                    <SkeletonBox width="48px" height="16px" />
                </Wrapper.FlexBox>
            </ContentWrapper>
        </Card>
    );
};
