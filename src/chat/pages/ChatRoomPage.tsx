import { useUserStore } from "@/store/useUserStore";
import { useCallback, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetChatRoomDetail } from "../hooks/useGetChatRoomDetail";
import { useGetChatMessages } from "../hooks/useGetChatMessages";
import { useChatMessenger } from "../hooks/useChatMessenger";
import { useChatPickAndSend } from "../hooks/useChatPickAndSend";
import LoadingSpinner from "@/components/LoadingSpinner";
import Header from "@/components/Header";
import PageWrapper from "@/components/PageWrapper";
import { Wrapper } from "@/styles/Wrapper";
import { Text } from "@/styles/Text";
import { dateKey, formatDateHeader, formatTimestamp } from "@/utils/date";
import Input from "@/components/Input";
import OptionButton from "@/components/OptionButton";
import theme from "@/styles/theme";
import styled from "@emotion/styled";
import MessageItem from "./components/MessageItem";

export default function ChatRoomPage() {
    const userId = useUserStore(u => u.id);
    const userType = useUserStore(u => u.type);
    const { chatRoomId } = useParams();
    const roomId = Number(chatRoomId);

    const [message, setMessage] = useState("");
    const isInputActive = message.trim().length > 0;

    const { data: chat, isLoading } = useGetChatRoomDetail(roomId);
    const { data: chatMessages, status } = useGetChatMessages(roomId);

    const { sendText } = useChatMessenger(roomId, chat?.userId);
    const { pickAndSend } = useChatPickAndSend(roomId);

    const handleSendMessage = useCallback(async () => {
        const text = message.trim();
        if (!text) return;
        await sendText(text);
        setMessage("");
    }, [message, sendText]);

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSendMessage();
    };

    const handleSendAccepted = useCallback(() => {
        // 합격 처리
    }, []);

    const optionMenus = useMemo(() => {
        const menus = [
            { label: "사진 업로드", onClick: () => pickAndSend("image") },
            { label: "파일 업로드", onClick: () => pickAndSend("file") },
        ];
        if (userType !== "STAFF") menus.unshift({ label: "스탭 합격", onClick: handleSendAccepted });
        return menus;
    }, [userType, handleSendAccepted, pickAndSend]);

    const messages = useMemo(() => {
        const flat = (chatMessages?.pages ?? []).flatMap(p => p.messages);
        return flat.sort((a, b) => a.timestamp - b.timestamp);
    }, [chatMessages]);

    const listRef = useRef<HTMLDivElement | null>(null);
    const topRef = useRef<HTMLDivElement | null>(null); // 화면 상단 감지해서 이전 페이지 로드하도록
    if (isLoading || status === "pending") return <LoadingSpinner />;

    return (
        <>
            <Header showBackButton title="채팅" />
            <PageWrapper hasHeader>
                <ChatLayout>
                    <ProfileSection>
                        <Wrapper.FlexBox gap="8px">
                            <ProfileImage
                                src={chat.image?.trim() ? chat.image : "/icons/defaultUser.svg"}
                                alt="프로필"
                            />
                            <Wrapper.FlexBox direction="column" gap="4px">
                                <Text.Body2_1>{chat.title}</Text.Body2_1>
                                <Text.Body2_1 color="Gray4">{chat.detail}</Text.Body2_1>
                            </Wrapper.FlexBox>
                        </Wrapper.FlexBox>
                    </ProfileSection>

                    <ChatScrollArea ref={listRef}>
                        <div ref={topRef} />
                        {messages?.map((m, i) => {
                            const isMine =
                                userType === "GUESTHOUSE"
                                    ? Number(m.senderId) !== Number(userId)
                                    : Number(m.senderId) !== Number(chat.userId);
                            const isFirst = i === 0;
                            const showDateHeader =
                                isFirst || dateKey(messages[i - 1].timestamp) !== dateKey(m.timestamp);
                            return (
                                <div key={m.id}>
                                    {showDateHeader && (
                                        <DateDivider isFirst={isFirst}>{formatDateHeader(m.timestamp)}</DateDivider>
                                    )}
                                    <MessageLine isMine={isMine}>
                                        <MessageSendTime>{formatTimestamp(m.timestamp)}</MessageSendTime>
                                        <MessageItem message={m} isMine={isMine} />
                                    </MessageLine>
                                </div>
                            );
                        })}
                    </ChatScrollArea>

                    <InputWrapper>
                        <form onSubmit={handleFormSubmit}>
                            <Input
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                placeholder="채팅을 입력하세요."
                                variant="message"
                                leftIcon={
                                    <OptionButton
                                        buttonIcon={<PlusButton src="/icons/plusCircle.svg" alt="추가" />}
                                        buttonActiveIcon={<PlusButton src="/icons/plusCircleActive.svg" alt="추가" />}
                                        placement="top"
                                        align="left"
                                        menus={optionMenus}
                                    />
                                }
                                rightIcon={
                                    <SendButton
                                        src={isInputActive ? "/icons/sendMain.svg" : "/icons/send.svg"}
                                        $active={isInputActive}
                                        alt="send"
                                    />
                                }
                                onRightIconClick={isInputActive ? handleSendMessage : undefined}
                            />
                        </form>
                    </InputWrapper>
                </ChatLayout>
            </PageWrapper>
        </>
    );
}

const ChatLayout = styled.div`
    display: grid;
    grid-template-rows: auto 1fr auto;
    height: calc(100vh - ${theme.size.HeaderHeight} - 30px);
    min-height: 0;
    position: relative;
`;

const ProfileSection = styled.div`
    border-bottom: 1px solid ${theme.color.Gray1};
    padding: 0 0 12px 0;
`;

const ChatScrollArea = styled.div`
    min-height: 0;
    padding: 10px 0;
    overflow-y: auto;
    scrollbar-width: none;
    scroll-behavior: smooth;
`;

const InputWrapper = styled.div`
    z-index: 1;
    width: 100%;
    background-color: white;
`;

const ProfileImage = styled.img`
    width: 42px;
    height: 42px;
    border-radius: 6px;
    object-fit: cover;
`;

const PlusButton = styled.img`
    width: 30px;
    height: 30px;
    padding: 6px;
    cursor: pointer;
`;

const SendButton = styled.img<{ $active?: boolean }>`
    width: 30px;
    height: 30px;
    padding: 5px;
    cursor: ${p => (p.$active ? "pointer" : "default")};
    opacity: ${p => (p.$active ? 1 : 0.5)};
`;

const MessageLine = styled.div<{ isMine: boolean }>`
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    flex-direction: ${p => (p.isMine ? "row" : "row-reverse")};
    margin: 12px 0;
`;
const MessageSendTime = styled(Text.Body3_1)`
    color: ${theme.color.Gray3};
    margin: 0 8px;
`;

const DateDivider = styled.div<{ isFirst?: boolean }>`
    display: flex;
    align-items: center;
    gap: 20px;
    margin: ${({ isFirst }) => (isFirst ? "0" : "20px 0")};
    color: #cbd0d4;
    font-size: 12px;
    justify-content: center;

    &::before,
    &::after {
        content: "";
        flex: 1;
        height: 1px;
        background: #e8ecef;
    }

    ${p =>
        p.isFirst &&
        `
    &::before,
    &::after { content: none; }
  `}
`;
