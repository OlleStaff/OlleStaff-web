import styled from "@emotion/styled";

type Props = {
    isMine: boolean;
    children: React.ReactNode;
    noBubble?: boolean;
};

export default function MessageBubble({ isMine, children, noBubble }: Props) {
    if (noBubble) {
        return (
            <BubbleWrapper isMine={isMine}>
                <CardContainer isMine={isMine}>{children}</CardContainer>
            </BubbleWrapper>
        );
    }
    return (
        <BubbleWrapper isMine={isMine}>
            <Bubble isMine={isMine}>{children}</Bubble>
        </BubbleWrapper>
    );
}

const BubbleWrapper = styled.div<{ isMine: boolean }>`
    display: flex;
    justify-content: ${({ isMine }) => (isMine ? "flex-end" : "flex-start")};
    align-items: flex-end;
`;

const Bubble = styled.div<{ isMine: boolean }>`
    padding: 10px 16px;
    max-width: 203px;
    line-height: 1.5;
    white-space: pre-wrap;
    word-break: break-word;
    display: inline-block;
    background: ${({ isMine }) => (isMine ? "#F5F6F8" : "#FFFFFF")};
    border: 1px solid ${({ isMine }) => (isMine ? "transparent" : "#E6E9EE")};
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.04);
    border-radius: ${({ isMine }) => (isMine ? "18px 18px 4px 18px" : "18px 18px 18px 4px")};
`;

const CardContainer = styled.div<{ isMine: boolean }>`
    background: #fff;
    border: 1px solid #e6e9ee;
    border-radius: 16px;
    padding: 14px 16px;
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.04);
    max-width: 200px;
`;
