import { useStartOrGetChat } from "@/chat/hooks/useStartChat";
import { Text } from "@/styles/Text";

type Props = {
    userId: number;
    nickname: string;
};

export default function ClickableNickname({ userId, nickname }: Props) {
    const { startOrGet } = useStartOrGetChat();
    const handleStartChat = () => {
        startOrGet(userId);
    };

    return (
        <div style={{ cursor: "pointer" }}>
            <Text.Body2_1 onClick={handleStartChat}>{nickname}님</Text.Body2_1>
        </div>
    );
}
