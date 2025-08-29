import { Text } from "@/styles/Text";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

type HeaderProps = {
    title: string;
    showBackButton?: boolean;
    onBackClick?: () => void;
    rightIconSrc?: string;
    onRightClick?: () => void;
    rightText?: string | React.ReactNode;
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
                        <BackButton onClick={handleBackClick} aria-label="뒤로가기">
                            <img src="/icons/backButton.svg" />
                        </BackButton>
                    )}
                </Side>
                <Text.Title3_1 className="header-title">{title}</Text.Title3_1>
                <Side>
                    {rightIconSrc ? (
                        <IconButton onClick={onRightClick} aria-label="오른쪽 아이콘">
                            <img src={rightIconSrc} alt="" />
                        </IconButton>
                    ) : rightText ? (
                        <TextButton onClick={onRightClick}>{rightText}</TextButton>
                    ) : null}
                </Side>
            </Wrapper>
        </HeaderWrapper>
    );
}
const SIDE_WIDTH = 35;

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
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 72px;
    .header-title {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        max-width: calc(100% - ${SIDE_WIDTH * 2}px - 16px);
    }
`;

const Side = styled.div`
    width: ${SIDE_WIDTH}px;
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
    width: 100%;
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
