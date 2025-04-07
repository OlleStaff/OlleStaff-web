import { useState } from "react";
import { Text } from "@/styles/Text";
import styled from "@emotion/styled";
import { Wrapper } from "@/styles/Wrapper";

export interface RadioButtonProps {
  labelList?: string[];
  selectedIndex: number;
  onSelect?: (index: number) => void;
}

export default function RadioButton({ labelList = [], selectedIndex, onSelect }: RadioButtonProps) {
  const [selected, setSelected] = useState<number>(selectedIndex);

  const handleSelect = (index: number) => {
    setSelected(index);
    onSelect?.(index);
  };

  return (
    <>
      <Wrapper.FlexBox gap="20px">
        {labelList.map((name, index) => (
          <Style.RadioButton key={index}>
            <input type="radio" name="radio-group" checked={selected === index} onChange={() => handleSelect(index)} />
            <Style.RadioCircle>{selected === index && <Style.RadioInnerCircle />}</Style.RadioCircle>
            <Text.Body1_1>{name}</Text.Body1_1>
          </Style.RadioButton>
        ))}
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
