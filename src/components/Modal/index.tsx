import styled from "@emotion/styled";
import ModalWrapper from "./ModalWrapper";
import { Text } from "@/styles/Text";
import theme from "@/styles/theme";

type ModalVariant = "default" | "confirm" | "page";

interface ModalProps {
    variant: ModalVariant;
    title?: string;
    message?: string | React.ReactNode;
    handleModalClose: () => void;
    onConfirm?: () => void;
    cancelText?: string;
    confirmText?: string;
    children?: React.ReactNode;
}

export default function Modal({
    variant,
    title,
    message,
    handleModalClose,
    onConfirm,
    cancelText,
    confirmText,
    children,
}: ModalProps) {
    if (variant === "page") {
        return <ModalWrapper handleModalClose={handleModalClose}>{children}</ModalWrapper>;
    }
    return (
        <ModalWrapper handleModalClose={handleModalClose}>
            {variant === "default" && (
                <>
                    <img src="/icons/check.svg" alt="아이콘" />
                    <Text.Title3_1>{title}</Text.Title3_1>
                </>
            )}
            {variant === "confirm" && title && <Text.Title3_1>{title}</Text.Title3_1>}

            {message && (
                <MessageWrapper>
                    <Text.Body2 color="Gray4">{message}</Text.Body2>
                </MessageWrapper>
            )}

            <ButtonWrapper>
                {variant === "confirm" && (
                    <Button onClick={handleModalClose} variant="cancel">
                        <Text.Title3_1>{cancelText}</Text.Title3_1>
                    </Button>
                )}
                <Button onClick={onConfirm}>
                    <Text.Title3_1 color="White">{confirmText}</Text.Title3_1>
                </Button>
            </ButtonWrapper>
        </ModalWrapper>
    );
}

const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 8px;
    margin-top: 10px;
`;

const MessageWrapper = styled.div`
    width: 100%;
    display: flex;
    text-align: center;
    justify-content: center;
`;

const Button = styled.button<{ variant?: "cancel" | "okay" }>`
    padding: 8px 16px;
    background-color: ${({ variant }) => (variant === "cancel" ? `${theme.color.Gray1}` : `${theme.color.Main}`)};
    border: none;
    border-radius: 8px;
    cursor: pointer;
    width: 100%;
`;
