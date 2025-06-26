import styled from "@emotion/styled";
import { SkeletonBox } from "./base/SkeletonBox";
import { Wrapper } from "@/styles/Wrapper";
import theme from "@/styles/theme";

export const SkeletonReviewItem = () => {
    return (
        <Card>
            <Wrapper.FlexBox justifyContent="space-between" alignItems="center">
                <SkeletonBox width="60%" height="18px" /> 
                <SkeletonBox width="20px" height="20px" borderRadius="50%" /> 
            </Wrapper.FlexBox>

            <ContentWrapper>
                <UserWrapper>
                    <SkeletonBox width="50px" height="16px" />
                    <SkeletonBox width="15px" height="15px" borderRadius="50%" />
                    <SkeletonBox width="24px" height="16px" />
                </UserWrapper>
                <SkeletonBox width="88px" height="88px" borderRadius="8px" />
                <SkeletonBox width="90%" height="14px" />

                <Wrapper.FlexBox justifyContent="space-between" alignItems="center">
                    <SkeletonBox width="60%" height="12px" />
                    <SkeletonBox width="20px" height="20px" borderRadius="50%" /> 
                </Wrapper.FlexBox>
            </ContentWrapper>

            <CommentWrapper>
                <Wrapper.FlexBox justifyContent="space-between" alignItems="center">
                    <SkeletonBox width="40px" height="16px" />
                    <SkeletonBox width="16px" height="16px" borderRadius="50%" />
                </Wrapper.FlexBox>
                <SkeletonBox width="100%" height="14px" />
                <SkeletonBox width="80%" height="14px" />
                <Wrapper.FlexBox justifyContent="flex-end">
                    <SkeletonBox width="40px" height="12px" />
                </Wrapper.FlexBox>
            </CommentWrapper>
        </Card>
    );
};

const Card = styled.div`
    border: 1px solid ${theme.color.Gray1};
    border-radius: 12px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    background: ${theme.color.White};
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    border-top: 1px solid #e4e4e4;
    padding-top: 10px;
`;

const CommentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 12px;
    padding: 12px;
    background: #f8f8f8;
    border-radius: 8px;
    gap: 5px;
`;

const UserWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
`;
