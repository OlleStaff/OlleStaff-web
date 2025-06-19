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
}

export default function RadioButton({
    labelList = [],
    selectedIndex,
    onSelect,
    radioTitle,
    required,
}: RadioButtonProps) {
    const [selected, setSelected] = useState<number>(selectedIndex);

    const handleSelect = (index: number) => {
        setSelected(index);
        onSelect?.(index);
    };

    return (
        <>
            <Wrapper.FlexBox direction="column" gap="18px">
                <Text.Body1_1>
                    {radioTitle}

                    {required && <RequiredStar>*</RequiredStar>}
                </Text.Body1_1>
                <Wrapper.FlexBox gap="20px" style={{ flexWrap: "wrap" }}>
                    {labelList.map((name, index) => (
                        <Style.RadioButton key={index}>
                            <input
                                type="radio"
                                name="radio-group"
                                checked={selected === index}
                                onChange={() => handleSelect(index)}
                            />
                            <Style.RadioCircle>{selected === index && <Style.RadioInnerCircle />}</Style.RadioCircle>
                            <Text.Body1_1>{name}</Text.Body1_1>
                        </Style.RadioButton>
                    ))}
                </Wrapper.FlexBox>
            </Wrapper.FlexBox>
        </>
    );
}

const Style = {
    RadioButton: styled.label`
        display: flex;
        align-items: center;
        cursor: pointer;
        margin-bottom: 8px;

        input[type="radio"] {
            display: none; // 실제 라디오 버튼 숨김
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
        margin-right: 8px;
    `,
    RadioInnerCircle: styled.div`
        width: 11px;
        height: 11px;
        background-color: #6ed0e9;
        border-radius: 50%;
    `,
};

const RequiredStar = styled.span`
    margin-left: 4px;
    color: ${theme.color.Main};
`;
