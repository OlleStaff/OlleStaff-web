import styled from "@emotion/styled";
import { ReactNode } from "react";
import theme from "@/styles/theme";
import { Text } from "@/styles/Text";
import { Wrapper } from "@/styles/Wrapper";

type InputVariant = "default" | "message" | "comment" | "radio";

type InputProps = {
    inputTitle?: string;
    type?: string;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    disabled?: boolean;
    variant?: InputVariant;
    onRightIconClick?: () => void;
    rightIcon?: ReactNode;
    leftIcon?: ReactNode;
    onLeftIconClick?: () => void;
    bottomMessage?: string;
    messageColor?: keyof typeof theme.color;
    readOnly?: boolean;
    required?: boolean; // 필수값이면 별 달기
    maxLength?: number;
    minLength?: number;
    options?: { label: string; value: string }[];
    onSelect?: (value: string) => void;
    titleColor?: keyof typeof theme.color;
    valueColor?: keyof typeof theme.color;
};

export default function Input(props: InputProps) {
    const {
        inputTitle = "",
        type,
        value,
        onChange,
        placeholder,
        disabled,
        variant = "default",
        rightIcon,
        onRightIconClick,
        leftIcon,
        onLeftIconClick,
        bottomMessage,
        messageColor = "Red1",
        readOnly,
        required,
        maxLength,
        minLength,
        titleColor,
        valueColor,
    } = props;

    const hasBottomMessage = "bottomMessage" in props;

    const showCombinedLengthMessage =
        typeof minLength === "number" &&
        typeof maxLength === "number" &&
        ((value.length > 0 && value.length < minLength) || value.length >= maxLength);

    return (
        <InputContainer>
            {inputTitle !== "" && (
                <InputTitle $color={titleColor}>
                    {inputTitle}
                    {required && <RequiredStar>*</RequiredStar>}
                </InputTitle>
            )}

            <section>
                {variant === "radio" ? (
                    <RadioRow role="radiogroup">
                        {(props.options ?? []).map(opt => {
                            const active = props.value === opt.value;
                            return (
                                <RadioBtn
                                    key={opt.value}
                                    type="button"
                                    $active={active}
                                    aria-pressed={active}
                                    onClick={() => props.onSelect?.(opt.value)}
                                >
                                    {active ? (
                                        <Text.Body1_1 color="Main">{opt.label}</Text.Body1_1>
                                    ) : (
                                        <Text.Body1 color="Gray3">{opt.label}</Text.Body1>
                                    )}
                                </RadioBtn>
                            );
                        })}
                    </RadioRow>
                ) : (
                    <InputWrapper variant={variant}>
                        {variant === "message" && leftIcon && (
                            <LeftIconArea onClick={onLeftIconClick}>{leftIcon}</LeftIconArea>
                        )}
                        <StyledInput
                            type={type}
                            value={value}
                            onChange={onChange}
                            placeholder={placeholder}
                            disabled={disabled}
                            readOnly={readOnly}
                            maxLength={maxLength}
                            $color={valueColor}
                            variant={variant}
                        />
                        {rightIcon && <RightIconArea onClick={onRightIconClick}>{rightIcon}</RightIconArea>}
                    </InputWrapper>
                )}

                <Wrapper.FlexBox justifyContent="flex-end">
                    {showCombinedLengthMessage ? (
                        <BottomMessage visible={true} color={messageColor}>
                            {minLength} ~ {maxLength}자 입력 가능합니다.
                        </BottomMessage>
                    ) : typeof maxLength === "number" && value.length >= maxLength && typeof minLength !== "number" ? (
                        <BottomMessage visible={true} color={messageColor}>
                            최대 {maxLength}자 입력 가능합니다.
                        </BottomMessage>
                    ) : null}
                    {hasBottomMessage && (
                        <BottomMessage visible={!!bottomMessage} color={messageColor}>
                            {bottomMessage || "\u00A0"}
                        </BottomMessage>
                    )}
                </Wrapper.FlexBox>
            </section>
        </InputContainer>
    );
}

const InputTitle = styled(Text.Body1_1)<{ $color?: keyof typeof theme.color }>`
    color: ${({ $color, theme }) => ($color ? theme.color[$color] : theme.color.Black)};
`;

const InputContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const InputWrapper = styled.div<{ variant: InputVariant }>`
    display: flex;
    align-items: center;
    padding: 0 12px;
    border-radius: ${({ variant }) => (variant === "default" ? "8px" : "40px")};
    height: 40px;
    width: 100%;
    background-color: ${theme.color.Gray0};

    &:focus-within {
        box-shadow: inset 0 0 0 1px ${theme.color.Main};
        transition: 0.3s;
    }
`;

const RightIconArea = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
`;

const LeftIconArea = styled.div`
    padding-right: 8px;
    display: flex;
    align-items: center;
`;

export const RequiredStar = styled.span`
    margin-left: 4px;
    color: ${theme.color.Main};
`;

const RadioRow = styled.div`
    display: flex;
    gap: 10px;
    width: 100%;
    min-height: 40px;
    align-items: stretch;
`;

const RadioBtn = styled.button<{ $active: boolean }>`
    flex: 1 0 0;
    border-radius: 8px;
    white-space: nowrap;
    border: ${({ $active, theme }) => ($active ? `1px solid ${theme.color.Main}` : "1px solid transparent")};
    background: ${({ $active, theme }) => ($active ? theme.color.Sub2 : theme.color.Gray0)};
    cursor: pointer;
    transition: all 0.2s ease;
`;

const BottomMessage = styled(Text.Body3_1)<{
    color: keyof typeof theme.color;
    visible: boolean;
}>`
    margin-top: 6px;
    padding-left: 4px;
    min-height: 18px;
    white-space: pre-wrap;
    color: ${({ visible, color, theme }) => (visible ? theme.color[color] : "transparent")};
    visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
    display: ${({ visible }) => (visible ? "block" : "none")};
`;

const StyledInput = styled.input<{
    $color?: keyof typeof theme.color;
    variant: InputVariant;
}>`
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0.32px;
    color: ${({ $color, theme }) => ($color ? theme.color[$color] : theme.color.Black)};
    width: 100%;

    &::placeholder {
        color: ${({ variant, theme }) =>
            variant === "comment" || variant === "message" ? theme.color.Gray4 : theme.color.Gray3};
        font-size: 16px;
        line-height: 20px;
        font-weight: ${({ variant }) => (variant === "comment" || variant === "message" ? 500 : 400)};
        letter-spacing: 0.32px;
    }
`;
