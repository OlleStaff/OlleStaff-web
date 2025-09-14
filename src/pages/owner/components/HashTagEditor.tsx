import { useState } from "react";
import styled from "@emotion/styled";
import { Text } from "@/styles/Text";
import { Wrapper } from "@/styles/Wrapper";
import theme from "@/styles/theme";

interface HashTagEditorProps {
    values: string[];
    onChange: (updated: string[]) => void;
}
export default function HashTagEditor({ values, onChange }: HashTagEditorProps) {
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const handleAddNewTag = () => {
        if (values.length >= 5) return;
        onChange([...values, ""]);
        setEditingIndex(values.length);
    };

    const handleChange = (value: string, index: number) => {
        const newTags = [...values];
        newTags[index] = value;
        onChange(newTags);
    };

    const handleBlur = (index: number) => {
        if (!values[index].trim()) {
            const filtered = values.filter((_, i) => i !== index);
            onChange(filtered);
        }
        setEditingIndex(null);
    };

    const handleDeleteTag = (indexToDelete: number, e: React.MouseEvent) => {
        e.stopPropagation();
        const filtered = values.filter((_, i) => i !== indexToDelete);
        onChange(filtered);
        if (editingIndex === indexToDelete) {
            setEditingIndex(null);
        }
    };

    return (
        <Wrapper.FlexBox direction="column" gap="12px">
            <Wrapper.FlexBox direction="column">
                <Text.Body3_1 color="Gray4">* 단어 형식으로 작성하세요.</Text.Body3_1>
                <Text.Body3_1 color="Gray4">최대 8자, 5개까지 해시태그를 작성할 수 있습니다.</Text.Body3_1>
            </Wrapper.FlexBox>

            <Wrapper.FlexBox gap="6px" style={{ flexWrap: "wrap" }}>
                {values.length === 0 && editingIndex === null && (
                    <Style.TagPill onClick={handleAddNewTag}>
                        <Text.Body3_1 color="Gray2"># 입력하기</Text.Body3_1>
                    </Style.TagPill>
                )}
                {values.map((tag, index) =>
                    editingIndex === index ? (
                        <Style.InputWrapper key={index}>
                            <Text.Body3_1>#</Text.Body3_1>
                            <Style.Input
                                value={tag}
                                valueLength={tag.length}
                                onChange={e => handleChange(e.target.value, index)}
                                onBlur={() => handleBlur(index)}
                                onKeyDown={e => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleBlur(index);
                                    }
                                }}
                                autoFocus
                                placeholder="입력하기"
                                maxLength={8}
                            />
                        </Style.InputWrapper>
                    ) : (
                        <Style.TagPill key={index} onClick={() => setEditingIndex(index)}>
                            <Text.Body3_1># {tag || "입력하기"}</Text.Body3_1>
                            <img src="/icons/deleteTag.svg" alt="태그 삭제" onClick={e => handleDeleteTag(index, e)} />
                        </Style.TagPill>
                    )
                )}

                {values.length < 5 && <img src="/icons/addMainColor.svg" alt="태그 추가" onClick={handleAddNewTag} />}
            </Wrapper.FlexBox>
        </Wrapper.FlexBox>
    );
}

const Style = {
    TagPill: styled.div`
        background-color: ${theme.color.Gray0};
        border-radius: 40px;
        padding: 6px 10px;
        cursor: pointer;
        display: flex;
        gap: 4px;
    `,
    InputWrapper: styled.div`
        background-color: ${theme.color.Gray0};
        color: ${theme.color.Black};
        border-radius: 40px;
        padding: 6px 10px;
        display: flex;
        align-items: center;
        width: fit-content;
        &:focus-within {
            box-shadow: inset 0 0 0 1px ${theme.color.Main};
            transition: 0.3s;
        }
    `,
    Input: styled.input<{ valueLength: number }>`
        border: none;
        background: transparent;
        outline: none;
        font-size: 14px;
        margin-left: 4px;
        color: ${theme.color.Black};
        width: ${({ valueLength }) => (valueLength === 0 ? "20px" : `${valueLength + 1}ch`)};
        min-width: 60px;
        max-width: 120px;
        transition: width 0.2s ease;
    `,
    AddButton: styled.button`
        background-color: ${theme.color.Main};
        border-radius: 40px;
        padding: 6px 12px;
        border: none;
        cursor: pointer;
    `,
};
