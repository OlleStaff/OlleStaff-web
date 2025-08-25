import { Text } from "@/styles/Text";
import styled from "@emotion/styled";

type TabVariant = "underline" | "bold";

type TabSelectorProps = {
    labels: string[];
    selected: string;
    onChange: (label: string) => void;
    variant?: TabVariant;
};

export default function TabSelector({ labels, selected, onChange, variant = "underline" }: TabSelectorProps) {
    return (
        <TabWrapper variant={variant}>
            {labels.map(label => {
                const isSelected = selected === label;

                // 텍스트 분기
                let Content: React.ReactNode;
                if (variant === "underline") {
                    Content = isSelected ? (
                        <Text.Body1_2 color="Main">{label}</Text.Body1_2>
                    ) : (
                        <Text.Body1_1 color="Gray3">{label}</Text.Body1_1>
                    );
                } else {
                    Content = isSelected ? (
                        <Text.Body1_1 color="Black">{label}</Text.Body1_1>
                    ) : (
                        <Text.Body1 color="Gray2">{label}</Text.Body1>
                    );
                }

                return (
                    <TabButton key={label} onClick={() => onChange(label)} isSelected={isSelected} variant={variant}>
                        {Content}
                    </TabButton>
                );
            })}
        </TabWrapper>
    );
}

const TabWrapper = styled.div<{ variant: TabVariant }>`
    display: flex;
    width: 100%;
    gap: ${({ variant }) => (variant === "underline" ? "none" : "16px")};
`;

const TabButton = styled.button<{
    isSelected: boolean;
    variant: TabVariant;
}>`
    position: relative;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    width: ${({ variant }) => (variant === "underline" ? "100%" : "auto")};

    padding-bottom: 14px;

    &::before {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: ${({ variant }) => (variant === "underline" ? "2px" : "0")};
        background-color: #e3e3e3;
    }

    &::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: ${({ variant }) => (variant === "underline" ? "2px" : "0")};
        background-color: #1fc4db;

        transform: scaleX(${({ isSelected, variant }) => (variant === "underline" ? (isSelected ? 1 : 0) : 1)});
        transform-origin: center;
        transition: transform 220ms cubic-bezier(0.2, 0.8, 0.2, 1);
        will-change: transform;
    }
`;
