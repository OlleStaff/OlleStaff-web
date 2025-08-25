import { useState } from "react";
import { Text } from "@/styles/Text";
import styled from "@emotion/styled";
import { Wrapper } from "@/styles/Wrapper";
import theme from "@/styles/theme";

export interface RadioButtonProps {
    labelList?: string[];
    selectedIndex: number;
    onSelect?: (index: number) => void;
    radioTitle?: string;
    required?: boolean;
    grayText?: boolean;
}

export default function RadioButton({
    labelList = [],
    selectedIndex,
    onSelect,
    radioTitle,
    required,
    grayText = false,
}: RadioButtonProps) {
    const [selected, setSelected] = useState<number>(selectedIndex);

    const handleSelect = (index: number) => {
        setSelected(index);
        onSelect?.(index);
    };

    return (
        <>
            <Wrapper.FlexBox direction="column" gap="18px">
                {radioTitle && (
                    <Text.Body1_1>
                        {radioTitle}
                        {required && <RequiredStar>*</RequiredStar>}
                    </Text.Body1_1>
                )}
                <Wrapper.FlexBox gap="20px" style={{ flexWrap: "wrap" }}>
                    {labelList.map((name, index) => (
                        <Style.RadioButton key={index}>
                            <input
                                type="radio"
                                name="radio-group"
                                checked={selected === index}
                                onChange={() => handleSelect(index)}
                            />
                            <Wrapper.FlexBox alignItems="center" gap="8px">
                                <Style.RadioCircle>
                                    {selected === index && <Style.RadioInnerCircle />}
                                </Style.RadioCircle>
                                <Text.Body1_1 color={grayText ? "Gray5" : "Black"}>{name}</Text.Body1_1>
                            </Wrapper.FlexBox>
                        </Style.RadioButton>
                    ))}
                </Wrapper.FlexBox>
            </Wrapper.FlexBox>
        </>
    );
}

export const Style = {
    RadioButton: styled.label`
        display: flex;
        align-items: center;
        cursor: pointer;
        input[type="radio"] {
            display: none;
        }
    `,
    RadioCircle: styled.div`
        width: 20px;
        height: 20px;
        border: 2px solid #ccc;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    `,
    RadioInnerCircle: styled.div`
        width: 11px;
        height: 11px;
        background-color: ${theme.color.Main};
        border-radius: 50%;
    `,
};

const RequiredStar = styled.span`
    margin-left: 4px;
    color: ${theme.color.Main};
`;
