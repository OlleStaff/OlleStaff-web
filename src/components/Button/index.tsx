import styled from "@emotion/styled";
import theme from "@/styles/theme";
import { Text } from "@/styles/Text";

export interface ButtonProps {
    children: React.ReactNode;
    isActive?: boolean;
    backgroundColor?: keyof typeof theme.color;
    width?: "small" | "medium" | "large";
    height?: "small" | "medium" | "large";
    label: string;
    onClick?: () => void;
    iconSrc?: string;
    disabled?: boolean;
}

export const Button = ({
    children,
    isActive = false,
    width = "medium",
    height = "medium",
    backgroundColor,
    iconSrc,
    ...props
}: ButtonProps) => {
    const TextComponent = isActive ? Text.Title4 : Text.Body1_1;
    const textColor = isActive ? "White" : "Gray5";

    return (
        <Style.Button
            $isActive={isActive}
            width={width}
            height={height}
            backgroundColor={backgroundColor ? backgroundColor : "transparent"}
            {...props}
        >
            {iconSrc && <Style.Icon src={iconSrc} alt="button icon" />}
            <TextComponent color={textColor}>{children}</TextComponent>
        </Style.Button>
    );
};

const Style = {
    Button: styled.button<{
        $isActive: boolean;
        width: "small" | "medium" | "large";
        height: "small" | "medium" | "large";
        backgroundColor?: string;
        disabled?: boolean;
    }>`
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: ${({ $isActive }) => ($isActive ? "pointer" : "not-allowed")};
        cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

        border: 0;
        border-radius: 8px;
        background-color: ${({ $isActive }) => ($isActive ? theme.color.Main : theme.color.Gray2)};
        color: ${({ $isActive }) => ($isActive ? theme.color.White : theme.color.Gray5)};
        opacity: ${({ $isActive }) => ($isActive ? 1 : 0.6)};
        width: ${({ width }) => (width === "small" ? "91px" : width === "medium" ? "50%" : "100%")};
        height: ${({ height }) => (height === "small" ? "40px" : height === "medium" ? "52px" : "48px")};
        transition: background-color 0.3s ease;
        gap: 6px;
        margin-top: 2px; // 전화번호 인증 버튼을 위해 임시 조정하였으니 추후 변경 필요 시 참고해주세요
        white-space: nowrap;
    `,

    Icon: styled.img`
        width: 20px;
        height: 20px;
        object-fit: contain;
        transition: opacity 0.3s ease;
    `,
};
