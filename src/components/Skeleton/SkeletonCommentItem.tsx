import { Wrapper } from "@/styles/Wrapper";
import { SkeletonBox } from "./base/SkeletonBox";
import styled from "@emotion/styled";

export const SkeletonCommentItem = () => (
    <ItemWrapper>
        <SkeletonBox width="32px" height="32px" borderRadius="50%" />
        <Content>
            <Wrapper.FlexBox gap="6px" alignItems="center">
                <SkeletonBox width="60px" height="14px" borderRadius="6px" />
                <SkeletonBox width="36px" height="12px" borderRadius="6px" />
            </Wrapper.FlexBox>
            <SkeletonBox width="90%" height="16px" borderRadius="8px" style={{ marginTop: 8 }} />
        </Content>
    </ItemWrapper>
);

const ItemWrapper = styled.div`
    display: flex;
    gap: 12px;
    padding: 10px 0;
`;

const Content = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 6px;
`;
