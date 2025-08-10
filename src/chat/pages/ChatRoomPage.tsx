import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import Header from "@/components/Header";
import Input from "@/components/Input";
import { useState } from "react";
import theme from "@/styles/theme";
import { Wrapper } from "@/styles/Wrapper";
import PageWrapper from "@/components/PageWrapper";
import { Text } from "@/styles/Text";
import { useGetChatRoomDetail } from "../hooks/useGetRoomDetail";
import LoadingSpinner from "@/components/LoadingSpinner";
import { sendChatMessage } from "../websocket/sendChatMessage";
import { SendMessagePayload } from "../types/websocket";
import { useGetChatMessages } from "../hooks/useGetChatMessages";
import { useQueryClient } from "@tanstack/react-query";

export default function ChatRoomPage() {
    const { chatRoomId } = useParams();
    const roomId = Number(chatRoomId);
    const queryClient = useQueryClient();
    const [message, setMessage] = useState("");

    const { data: chat, isLoading } = useGetChatRoomDetail(roomId);
    const { data: chatMessages } = useGetChatMessages(roomId);

    const handleSendMessage = async () => {
        const text = message.trim();
        if (!text) return;

        const optimisticMessage = {
            id: `${Date.now()}`,
            roomId,
            messageType: "TEXT",
            content: { text },
            timestamp: Date.now(),
        };
        const prev = queryClient.getQueryData<any[]>(["chatMessages", roomId]) ?? [];
        queryClient.setQueryData<any[]>(["chatMessages", roomId], [...prev, optimisticMessage]);

        const payload: SendMessagePayload = {
            chatRoomId: roomId,
            messageType: "TEXT",
            content: { text },
        };

        try {
            await sendChatMessage(payload);
            setMessage("");
        } catch (e) {
            console.error("메시지 전송 실패,, 롤백", e);

            queryClient.setQueryData<any[]>(["chatMessages", roomId], (curr = []) =>
                curr.filter(message => message.id !== optimisticMessage.id)
            );
        }
    };
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSendMessage();
    };
    console.log(roomId);
    console.log(chat);
    console.log("??", chatMessages);

    if (isLoading) return <LoadingSpinner />;
    return (
        <>
            <Header showBackButton title="채팅" />
            <PageWrapper hasHeader>
                <Wrapper.FlexBox
                    direction="column"
                    justifyContent="space-between"
                    height={`calc(100vh - ${theme.size.HeaderHeight})`}
                >
                    <ProfileSection>
                        <Wrapper.FlexBox gap="8px">
                            <ProfileImage src={chat.image} />
                            <Wrapper.FlexBox direction="column" gap="4px">
                                <Text.Body2_1>{chat.title}</Text.Body2_1>
                                <Text.Body2_1 color="Gray4">{chat.detail}</Text.Body2_1>
                            </Wrapper.FlexBox>
                        </Wrapper.FlexBox>
                    </ProfileSection>

                    <ChatScrollArea>
                        {chatMessages?.map(item => {
                            switch (item.messageType) {
                                case "TEXT":
                                    return <div key={item.id}>{item.content?.text ?? ""}</div>;

                                case "PHOTO":
                                    return (
                                        <div key={item.id}>
                                            {(item.content?.images ?? []).map((src: string, i: number) => (
                                                <img
                                                    key={i}
                                                    src={src}
                                                    alt={`img-${i}`}
                                                    style={{ width: 120, height: 120, objectFit: "cover" }}
                                                />
                                            ))}
                                        </div>
                                    );

                                case "FILE":
                                    return (
                                        <div key={item.id}>
                                            <a href={item.content?.link} target="_blank" rel="noreferrer">
                                                {item.content?.name ?? "파일"}
                                            </a>
                                        </div>
                                    );

                                case "APPLICANT":
                                    return (
                                        <div key={item.id}>
                                            <b>{item.content?.title}</b>
                                            <div>{item.content?.detail}</div>
                                        </div>
                                    );

                                case "ACCEPTED":
                                    return (
                                        <div key={item.id}>
                                            <b>{item.content?.title}</b>
                                            <div>{item.content?.detail}</div>
                                        </div>
                                    );
                            }
                        })}
                    </ChatScrollArea>

                    <Wrapper.AbsoluteBox>
                        <InputWrapper>
                            <form onSubmit={handleFormSubmit}>
                                <Input
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
                                    placeholder="채팅을 입력하세요."
                                    variant="message"
                                    leftIcon={<PlusButton src="/icons/plusCircle.svg" />}
                                    rightIcon={<SendButton src="/icons/send.svg" />}
                                    onLeftIconClick={() => {}}
                                    onRightIconClick={handleSendMessage}
                                />
                            </form>
                        </InputWrapper>
                    </Wrapper.AbsoluteBox>
                </Wrapper.FlexBox>
            </PageWrapper>
        </>
    );
}

const ProfileSection = styled.div`
    border-bottom: 1px solid ${theme.color.Gray1};
    padding: 0 0 12px 0;
`;

const ProfileImage = styled.img`
    width: 42px;
    height: 42px;
    border-radius: 6px;
    object-fit: cover;
`;

const ChatScrollArea = styled.div`
    flex: 1;
    margin: 10px 0 70px 0;
    overflow-y: auto;
`;

const InputWrapper = styled.div`
    position: absolute;
    bottom: 20px;
    padding: 0 20px;
    width: 100%;
    background-color: white;
`;

const PlusButton = styled.img`
    width: 30px;
    height: 30px;
    padding: 6px;
    cursor: pointer;
`;

const SendButton = styled.img`
    width: 30px;
    height: 30px;
    padding: 5px;
    cursor: pointer;
`;
