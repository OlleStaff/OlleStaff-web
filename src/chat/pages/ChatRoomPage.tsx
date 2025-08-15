import { useUserStore } from "@/store/useUserStore";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
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

    const { data: chat } = useGetChatRoomDetail(roomId);
    const myId = userType === "GUESTHOUSE" ? Number(chat?.userId) : Number(userId);

    const { data: chatMessages, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useGetChatMessages(roomId);

    const { sendText } = useChatMessenger(roomId, chat?.userId);
    const { pickAndSend } = useChatPickAndSend(roomId);

    const messages = useMemo(() => {
        const flat = (chatMessages?.pages ?? []).flatMap(p => p.messages);
        return flat.sort((a, b) => a.timestamp - b.timestamp);
    }, [chatMessages]);

    const listRef = useRef<HTMLDivElement | null>(null);
    const topRef = useRef<HTMLDivElement | null>(null);
    const bottomRef = useRef<HTMLDivElement | null>(null);

    const jumpToBottom = useCallback(() => {
        bottomRef.current?.scrollIntoView({ block: "end", inline: "nearest", behavior: "smooth" });
    }, []);

    const handleSendMessage = useCallback(async () => {
        const text = message.trim();
        if (!text) return;
        await sendText(text);
        setMessage("");
        requestAnimationFrame(() => {
            jumpToBottom();
        });
    }, [message, sendText, jumpToBottom]);

    //  채팅 페이지 진입 시 애니메이션 없이 바닥 고정
    const didInit = useRef(false);
    useLayoutEffect(() => {
        if (didInit.current) return;
        if (status !== "success") return;
        jumpToBottom();
        didInit.current = true;
    }, [status, messages.length, jumpToBottom]);

    // 위로 무한스크롤 ( + 스크롤 이어서)
    useEffect(() => {
        const root = listRef.current;
        const target = topRef.current;
        if (!root || !target) return;

        let locked = false;
        const io = new IntersectionObserver(
            async ([entry]) => {
                if (!entry.isIntersecting || locked) return;
                if (!hasNextPage || isFetchingNextPage) return;

                locked = true;
                const prevHeight = root.scrollHeight;
                const prevTop = root.scrollTop;

                await fetchNextPage();

                requestAnimationFrame(() => {
                    const nextHeight = root.scrollHeight;
                    const delta = nextHeight - prevHeight;
                    root.scrollTop = prevTop + delta;
                    locked = false;
                });
            },
            { root, rootMargin: "150px 0px 0px 0px", threshold: 0 }
        );

        io.observe(target);
        return () => io.disconnect();
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    // 새 메시지 도착 시 바닥으로
    useEffect(() => {
        const el = listRef.current;
        if (!el || messages.length === 0) return;

        const last = messages[messages.length - 1];
        const nearBottom = el.scrollHeight - el.clientHeight - el.scrollTop < 16;

        if (Number(last.senderId) === myId || nearBottom) {
            requestAnimationFrame(() => {
                jumpToBottom();
            });
        }
    }, [messages.length, myId, jumpToBottom]);

    if (status === "pending" || !chat) {
        return <LoadingSpinner />;
    }

    const optionMenus = [
        { label: "사진 업로드", onClick: () => pickAndSend("image") },
        { label: "파일 업로드", onClick: () => pickAndSend("file") },
    ];
    if (userType !== "STAFF") optionMenus.unshift({ label: "스탭 합격", onClick: () => {} });

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
                        {messages.map((m, i) => {
                            const isMine = Number(m.senderId) !== myId;
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
                        <div ref={bottomRef} />
                    </ChatScrollArea>

                    <InputWrapper>
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                handleSendMessage();
                            }}
                        >
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
    padding: 10px 0 0 0;
    overflow-y: auto;
    scrollbar-width: none;
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

    ${({ isFirst }) =>
        isFirst &&
        `
    &::before,
    &::after { content: none; }
  `}
`;
