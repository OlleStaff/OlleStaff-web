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
                const color = isSelected ? (variant === "bold" ? "Black" : "Main") : "Gray3";

                return (
                    <TabButton key={label} onClick={() => onChange(label)} isSelected={isSelected} variant={variant}>
                        {isSelected ? (
                            <Text.Body1_1 color={color}>{label}</Text.Body1_1>
                        ) : (
                            <Text.Body1 color={color}>{label}</Text.Body1>
                        )}
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

    &::after {
        content: "";
        display: block;
        height: ${({ variant }) => (variant === "underline" ? "2px" : "0")};
        margin-top: 15px;
        border-radius: ${({ variant }) => (variant === "underline" ? "1px" : "0")};
        background-color: ${({ isSelected, variant }) =>
            variant === "underline" ? (isSelected ? "#1FC4DB" : "#E3E3E3") : "transparent"};
    }
`;
