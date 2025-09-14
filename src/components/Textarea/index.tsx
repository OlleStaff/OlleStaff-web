import { useRef, useEffect } from "react";
import styled from "@emotion/styled";
import theme from "@/styles/theme";
import { Text } from "@/styles/Text";

type TextareaVariant = "flat-sm" | "flat" | "flat-lg";

type TextareaProps = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    disabled?: boolean;
    variant?: TextareaVariant;
    minLength?: number;
    maxLength?: number;
    textareaTitle?: string;
    required?: boolean;
};

export default function Textarea({
    value,
    onChange,
    placeholder,
    disabled,
    variant = "flat",
    minLength,
    maxLength,
    textareaTitle,
    required,
}: TextareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [value, variant]);

    const showCount = minLength !== undefined || maxLength !== undefined;
    const isEmpty = value.trim().length === 0;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (maxLength !== undefined && e.target.value.length > maxLength) return;
        onChange(e);
    };

    return (
        <TextareaContainer>
            {textareaTitle && (
                <Text.Body1_1>
                    {textareaTitle}

                    {required && <RequiredStar>*</RequiredStar>}
                </Text.Body1_1>
            )}
            <Wrapper variant={variant} hasCharCount={showCount}>
                <StyledTextarea
                    ref={textareaRef}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    variant={variant}
                />
                {showCount && (
                    <CharCount>
                        {isEmpty
                            ? minLength !== undefined
                                ? `최소 ${minLength}자`
                                : ""
                            : `${value.length}${maxLength ? `/${maxLength}` : "자"}`}
                    </CharCount>
                )}
            </Wrapper>
        </TextareaContainer>
    );
}

const TextareaContainer = styled.div`
    /* width: 333px; */
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const Wrapper = styled.div<{ variant: TextareaVariant; hasCharCount?: boolean }>`
    position: relative;
    display: flex;
    align-items: center;
    padding: 16px 12px;
    padding-bottom: ${({ hasCharCount }) => (hasCharCount ? "40px" : "16px")};
    background-color: ${theme.color.Gray0};
    border: "none";
    border-radius: 8px;
    width: 100%;
    &:focus-within {
        box-shadow: inset 0 0 0 1px ${theme.color.Main};
        transition: 0.3s;
    }
`;

const StyledTextarea = styled.textarea<{ variant: TextareaVariant }>`
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    font-size: 16px;
    font-weight: 400;
    color: ${theme.color.Black};
    resize: none;
    height: 100%;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
        display: none;
    }

    ${({ variant }) => {
        switch (variant) {
            case "flat-sm":
                return `height: 77px;`;
            case "flat":
                return `min-height: 120px;`;
            case "flat-lg":
                return `min-height: 300px;`;
            default:
                return `min-height: 120px;`;
        }
    }}
    max-height: 300px;

    &::placeholder {
        color: ${theme.color.Gray3};
    }
`;

const CharCount = styled.div`
    position: absolute;
    bottom: 12px;
    right: 12px;
    font-size: 14px;
    color: ${theme.color.Gray3};
`;

const RequiredStar = styled.span`
    margin-left: 4px;
    color: ${theme.color.Main};
`;
