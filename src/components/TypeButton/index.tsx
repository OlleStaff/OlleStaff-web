import styled from "@emotion/styled";
import { Text } from "@/styles/Text";

export interface TypeButtonProps {
    iconSrc: string;
    label: string;
    subLabel: string;
    isActive?: boolean;
    onClick?: () => void;
}

export const TypeButton = ({ iconSrc, label, subLabel, isActive = false, onClick }: TypeButtonProps) => {
    return (
        <Wrapper $isActive={isActive} onClick={onClick}>
            <IconImage src={iconSrc} alt={label} />
            <Text.Body1>
                {label} <br />
            </Text.Body1>
            <Text.Body2_1 color="Gray2">{subLabel}</Text.Body2_1>
        </Wrapper>
    );
};

const Wrapper = styled.button<{ $isActive: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 162px;
    min-height: 209px;
    border-radius: 12px;
    background-color: ${({ $isActive, theme }) => ($isActive ? theme.color.Sub2 : theme.color.White)};
    color: ${({ $isActive }) => ($isActive ? "white" : "black")};
    border: ${({ $isActive, theme }) => ($isActive ? `2px solid ${theme.color.Main}` : "1px solid #D9D9D9")};
    cursor: pointer;
`;

const IconImage = styled.img`
    width: 88px;
    height: 88px;
    margin-bottom: 16px;
    object-fit: contain;
`;
