import { Text } from "@/styles/Text";
import { Wrapper } from "@/styles/Wrapper";
import { Button } from "@/components/Button";

type OopsProps = {
    message: string;
    description?: string;
    buttonLabel?: string;
    onButtonClick?: () => void;
};

export default function Oops({ message, description, buttonLabel, onButtonClick }: OopsProps) {
    return (
        <Wrapper.FlexBox direction="column" alignItems="center" justifyContent="center" gap="23px" margin="20px 0">
            <img src="/icons/oops.svg" alt="oops" style={{ width: "32px" }} />

            <Wrapper.FlexBox gap="8px" direction="column" alignItems="center">
                <Text.Body1_1 color="Gray3">{message}</Text.Body1_1>
                {description && (
                    <Text.Body2_1 color="Gray3" style={{ whiteSpace: "pre-line", textAlign: "center" }}>
                        {description}
                    </Text.Body2_1>
                )}
            </Wrapper.FlexBox>

            {buttonLabel && onButtonClick && (
                <Button isActive label={buttonLabel} onClick={onButtonClick} height="small">
                    {buttonLabel}
                </Button>
            )}
        </Wrapper.FlexBox>
    );
}
