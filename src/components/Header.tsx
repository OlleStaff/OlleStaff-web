import { Text } from "@/styles/Text";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

type HeaderProps = {
    title: string;
    showBackButton?: boolean;
    onBackClick?: () => void;
    rightIconSrc?: string;
    onRightClick?: () => void;
    rightText?: string;
};

export default function Header({
    title,
    showBackButton,
    rightIconSrc,
    onRightClick,
    rightText,
    onBackClick,
}: HeaderProps) {
    const navigate = useNavigate();
    const handleBackClick = () => {
        if (onBackClick) {
            onBackClick();
        } else {
            navigate(-1);
        }
    };
    return (
        <HeaderWrapper>
            <Wrapper>
                <Side>
                    {showBackButton && (
                        <BackButton onClick={handleBackClick}>
                            <img src="/icons/backButton.svg" alt="뒤로가기" />
                        </BackButton>
                    )}
                </Side>
                <Text.Title3_1>{title}</Text.Title3_1>
                <Side>
                    {rightIconSrc ? (
                        <IconButton onClick={onRightClick}>
                            <img src={rightIconSrc} alt="오른쪽 아이콘" />
                        </IconButton>
                    ) : rightText ? (
                        <TextButton onClick={onRightClick}>{rightText}</TextButton>
                    ) : null}
                </Side>
            </Wrapper>
        </HeaderWrapper>
    );
}

const HeaderWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 393px;
    z-index: 10;
    padding: 0 30px;
    background-color: white;
`;

const Wrapper = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 72px;
`;

const Side = styled.div`
    min-width: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const BackButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
`;

const IconButton = styled.button`
    width: 24px;
    background: none;
    border: none;
    cursor: pointer;
`;

const TextButton = styled(Text.Body2_1)`
    background: none;
    border: none;
    color: ${({ theme }) => theme.color.Gray3};
    font-size: 14px;
    cursor: pointer;
`;
