import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import PageWrapper from "@/components/PageWrapper";
import { Text } from "@/styles/Text";

export default function ChatRoomPage() {
    const { chatRoomId } = useParams();

    return (
        <>
            <Header title="채팅" />
            <PageWrapper hasHeader hasNav={false}>
                <Text.Title3>채팅방 ID: {chatRoomId}</Text.Title3>
            </PageWrapper>
        </>
    );
}
