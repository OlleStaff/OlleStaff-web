import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import Header from "@/components/Header";
import Input from "@/components/Input";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import theme from "@/styles/theme";
import { Wrapper } from "@/styles/Wrapper";
import PageWrapper from "@/components/PageWrapper";
import { Text } from "@/styles/Text";
import { useGetChatRoomDetail } from "../hooks/useGetChatRoomDetail";
import LoadingSpinner from "@/components/LoadingSpinner";
import { sendChatMessage } from "../websocket/sendChatMessage";
import { SendMessagePayload } from "../types/websocket";
import { useGetChatMessages } from "../hooks/useGetChatMessages";
import { useQueryClient } from "@tanstack/react-query";
import MessageItem from "./components/MessageItem";
import { v4 as uuidv4 } from "uuid";
import { useUserStore } from "@/store/useUserStore";
import OptionButton from "@/components/OptionButton";
import { dateKey, formatDateHeader, formatTimestamp } from "@/utils/date";

export default function ChatRoomPage() {
    const userId = useUserStore(u => u.id);
    const { chatRoomId } = useParams();
    const roomId = Number(chatRoomId);
    const queryClient = useQueryClient();
    const [message, setMessage] = useState("");
    const isInputActive = message.trim().length > 0;

    const { data: chat, isLoading } = useGetChatRoomDetail(roomId);
    const { data: chatMessages, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useGetChatMessages(roomId);

    const messages = useMemo(() => {
        const flat = (chatMessages?.pages ?? []).flatMap(p => p.messages); // 평탄화해서 배열처럼 쓰기
        return flat.sort((a, b) => a.timestamp - b.timestamp);
    }, [chatMessages]);

    const handleSendMessage = async () => {
        const text = message.trim();
        if (!text) return;

        const optimisticMessage = {
            id: uuidv4(),
            chatRoomId: roomId,
            senderId: userId,
            messageType: "TEXT",
            content: { text },
            timestamp: Date.now(),
        };

        queryClient.setQueryData<any>(["chatMessages", roomId], (curr: any) => {
            if (!curr) {
                return {
                    pageParams: [undefined],
                    pages: [{ messages: [optimisticMessage], cursor: null, hasNext: true }],
                };
            }
            const pages = [...curr.pages];
            const last = pages[pages.length - 1];
            pages[pages.length - 1] = {
                ...last,
                messages: [...(last?.messages ?? []), optimisticMessage],
            };
            return { ...curr, pages };
        });

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
    const listRef = useRef<HTMLDivElement | null>(null);
    const topRef = useRef<HTMLDivElement | null>(null); // 화면 상단 감지해서 이전 페이지 로드하도록
    const prevRef = useRef<number | null>(null); // 직전 높이 기억

    const scrollToBottom = () => {
        if (listRef.current) {
            listRef.current.scrollTo({
                top: listRef.current.scrollHeight,
            });
        }
    };

    useEffect(() => {
        if (isFetchingNextPage) return; // 위로 로딩 중에 아래로 튕기는 현상 막기
        scrollToBottom();
    }, [messages.length, isFetchingNextPage]);

    useEffect(() => {
        const root = listRef.current;
        const target = topRef.current;
        if (!root || !target) return;

        const onIntersect: IntersectionObserverCallback = async entries => {
            const [entry] = entries;
            if (!entry.isIntersecting) return;
            if (!hasNextPage || isFetchingNextPage) return;

            prevRef.current = root.scrollHeight;
            await fetchNextPage();

            requestAnimationFrame(() => {
                if (!root || prevRef.current == null) return;
                const delta = root.scrollHeight - prevRef.current;
                root.scrollTop = root.scrollTop + delta;
                prevRef.current = null;
            });
        };

        const io = new IntersectionObserver(onIntersect, {
            root,
            rootMargin: "150px 0px 0px 0px", // 미리 로드
            threshold: 0,
        });
        io.observe(target);
        return () => io.disconnect();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    const imgInputRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSendAccepted = useCallback(() => {
        // 합격 처리
    }, []);

    const handlePickImages = useCallback(() => {
        imgInputRef.current?.click();
    }, []);

    const onImagesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        const images = Array.from(e.target.files ?? []);
        // 업로드/전송 처리
    };

    const handlePickFiles = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const onFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        // 업로드/전송 처리
    };

    const userType = useUserStore(u => u.type);
    const optionMenus = useMemo(() => {
        const menus = [
            { label: "사진 업로드", onClick: handlePickImages },
            { label: "파일 업로드", onClick: handlePickFiles },
        ];
        if (userType !== "STAFF") menus.unshift({ label: "스탭 합격", onClick: handleSendAccepted });
        return menus;
    }, [userType, handleSendAccepted, handlePickImages, handlePickFiles]);

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
                            const isMine = Number(m.senderId) === Number(userId);
                            const isFirst = i === 0;
                            const showDateHeader =
                                isFirst || dateKey(messages[i - 1].timestamp) !== dateKey(m.timestamp);
                            return (
                                <div key={m.id}>
                                    {showDateHeader && (
                                        <DateDivider isFirst={isFirst}>{formatDateHeader(m.timestamp)}</DateDivider>
                                    )}
                                    <MessageLine key={m.id} isMine={isMine}>
                                        <MessageSendTime>{formatTimestamp(m.timestamp)}</MessageSendTime>
                                        <MessageItem message={m} isMine={isMine} />
                                    </MessageLine>
                                </div>
                            );
                        })}
                    </ChatScrollArea>

                    <input
                        ref={imgInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={onImagesSelected}
                        style={{ display: "none" }}
                    />
                    <input ref={fileInputRef} type="file" onChange={onFilesSelected} style={{ display: "none" }} />

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
                                onLeftIconClick={() => {}}
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
