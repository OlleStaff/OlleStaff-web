import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import Header from "@/components/Header";
import Input from "@/components/Input";
import { useState } from "react";
import theme from "@/styles/theme";
import { Wrapper } from "@/styles/Wrapper";
import PageWrapper from "@/components/PageWrapper";
import { ChatRoomDetail } from "../types/common";

const mockChatRoom: ChatRoomDetail = {
    id: 1,
    title: "일등 게하",
    detail: "🏠 결 게스트하우스",
    image: "/icons/defaultUser.svg",
};

export default function ChatRoomPage() {
    const { chatRoomId } = useParams();
    const [message, setMessage] = useState("");

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
                        프로필 {chatRoomId} {mockChatRoom.title} {mockChatRoom.detail}
                    </ProfileSection>
                    <ChatScrollArea>스크롤 되는 메시지영역</ChatScrollArea>
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
                </Wrapper.FlexBox>
            </PageWrapper>
        </>
    );
}

const ProfileSection = styled.div`
    border-bottom: 1px solid #f0f0f0;
    padding: 16px 0;
`;

const ChatScrollArea = styled.div`
    flex: 1;
    overflow-y: auto;
`;

const InputWrapper = styled.div`
    padding-bottom: 25px;
    background-color: white;
    border-top: 1px solid #eee;
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
