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

export default function ChatRoomPage() {
    const { chatRoomId } = useParams();
    const [message, setMessage] = useState("");

    const { data: chat, isLoading } = useGetChatRoomDetail(Number(chatRoomId));
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
                    <ChatScrollArea>스크롤 되는 메시지영역 {chatRoomId}</ChatScrollArea>
                    <Wrapper.AbsoluteBox>
                        <InputWrapper>
                            <Input
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                placeholder="채팅을 입력하세요."
                                variant="message"
                                leftIcon={<PlusButton src="/icons/plusCircle.svg" />}
                                rightIcon={<SendButton src="/icons/send.svg" />}
                                onLeftIconClick={() => {}}
                                onRightIconClick={() => {}}
                            />
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
