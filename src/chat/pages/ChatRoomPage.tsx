import { useUserStore } from "@/store/useUserStore";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { useMarkLatestMessageRead } from "../hooks/useMarkLatestMessageRead";
import { usePostAcceptApplicant } from "../hooks/usePostAcceptApplicant";
import Modal from "@/components/Modal";
import { useGetMyRecruitmentsAppliedByUser } from "../hooks/useGetMyRecruitmentsAppliedByUser";
import { GuesthouseListItemProps } from "@/types/guesthouse";
import SelectableRecruitCard from "./components/SelectableRecruitCard";
import { useGetEmploymentDetail } from "@/hooks/owner/employment";
import { truncateText } from "@/utils/truncateText";
import { useQueryClient } from "@tanstack/react-query";
import { receiveChatMessage } from "../websocket/receiveChatMessage";

export default function ChatRoomPage() {
    const userId = useUserStore(u => u.id);
    const userType = useUserStore(u => u.type);
    const { chatRoomId } = useParams();
    const roomId = Number(chatRoomId);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [message, setMessage] = useState("");
    const isInputActive = message.trim().length > 0;

    const { data: chat, isLoading: isChatLoading } = useGetChatRoomDetail(roomId);
    const myId = userType === "GUESTHOUSE" ? Number(chat?.userId) : Number(userId);

    const {
        data: chatMessages,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
        isLoading: isMsgLoading,
    } = useGetChatMessages(roomId);

    const { sendText } = useChatMessenger(roomId, chat?.userId);
    const { pickAndSend } = useChatPickAndSend(roomId);

    const messages = useMemo(() => {
        const flat = (chatMessages?.pages ?? []).flatMap(p => p.messages);
        return flat.sort((a, b) => a.timestamp - b.timestamp);
    }, [chatMessages]);

    const listRef = useRef<HTMLDivElement | null>(null);
    const topRef = useRef<HTMLDivElement | null>(null);
    const bottomRef = useRef<HTMLDivElement | null>(null);

    const jumpToBottom = useCallback((opts?: { smooth?: boolean }) => {
        const el = listRef.current;
        if (!el) return;

        const prev = el.style.scrollBehavior;
        el.style.scrollBehavior = "auto";

        bottomRef.current?.scrollIntoView({
            block: "end",
            inline: "nearest",
            behavior: opts?.smooth ? "smooth" : "auto",
        });

        el.style.scrollBehavior = prev || "";
    }, []);

    const shouldSmoothScrollRef = useRef(false);

    const isMine = useCallback(
        (m: { senderId: number | string }) =>
            userType === "GUESTHOUSE" ? Number(m.senderId) !== Number(myId) : Number(m.senderId) === Number(myId),
        [userType, myId]
    );

    const handleSendMessage = useCallback(async () => {
        const text = message.trim();
        if (!text) return;
        shouldSmoothScrollRef.current = true;
        await sendText(text);
        setMessage("");
    }, [message, sendText]);

    const pickAndSendWithScroll = useCallback(
        (kind: "image" | "file") => {
            shouldSmoothScrollRef.current = true;
            pickAndSend(kind);
        },
        [pickAndSend]
    );

    const optionMenus = [
        { label: "사진 업로드", onClick: () => pickAndSendWithScroll("image") },
        { label: "파일 업로드", onClick: () => pickAndSendWithScroll("file") },
    ];
    const isBootLoading = isChatLoading || isMsgLoading || status === "pending";

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: myRecruits } = useGetMyRecruitmentsAppliedByUser(chat?.userId);

    const [checkedId, setCheckedId] = useState<number>();

    const handleAcceptModalOpen = () => {
        setCheckedId(undefined);
        setIsModalOpen(true);
    };

    const { mutate: acceptApplicant } = usePostAcceptApplicant();
    const handleAcceptApplicantClick = () => {
        if (!checkedId) return;
        shouldSmoothScrollRef.current = true;
        acceptApplicant(
            { applicantUserId: chat?.userId, employmentId: checkedId },
            {
                onSuccess: async () => {
                    setIsModalOpen(false);
                    setIsAcceptConfirmModal(false);
                    setIsAcceptCompleteModal(false);
                    setCheckedId(undefined);

                    await queryClient.refetchQueries({ queryKey: ["chatMessages", roomId] });

                    requestAnimationFrame(() => {
                        jumpToBottom({ smooth: true });
                    });
                },
            }
        );
    };
    const { data: employment } = useGetEmploymentDetail(checkedId as number);

    const [isAcceptConfirmModal, setIsAcceptConfirmModal] = useState(false);
    const [isAcceptCompleteModal, setIsAcceptCompleteModal] = useState(false);

    //  채팅 페이지 진입 시 애니메이션 없이 바닥 고정
    const didInit = useRef(false);
    useLayoutEffect(() => {
        if (didInit.current) return;
        if (status !== "success") return;
        jumpToBottom({ smooth: false });
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

        const lastMessage = messages[messages.length - 1];
        const nearBottom = el.scrollHeight - el.clientHeight - el.scrollTop < 16;
        const mine = isMine(lastMessage);

        if (shouldSmoothScrollRef.current) {
            shouldSmoothScrollRef.current = false;
            requestAnimationFrame(() => jumpToBottom({ smooth: true }));
            return;
        }

        // 내가 보낸 메시지거나 혹은 유저가 거의 채팅방 아래에 있을 때
        if (mine || nearBottom) {
            requestAnimationFrame(() => jumpToBottom({ smooth: false }));
        }
    }, [messages.length, isMine, jumpToBottom]);

    const lastMsgRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const off = receiveChatMessage(async payload => {
            if (payload.chatRoomId !== roomId) return;

            await queryClient.refetchQueries({ queryKey: ["chatMessages", roomId], exact: true });

            requestAnimationFrame(() => {
                (lastMsgRef.current ?? bottomRef.current)?.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                    inline: "nearest",
                });
            });
        });

        return off; // 언마운트, 방 변경 시 구독 해제
    }, [roomId, queryClient]);

    const { markLatestMessageRead } = useMarkLatestMessageRead();
    const lastReadMessageRef = useRef<string | null>(null);

    useEffect(() => {
        lastReadMessageRef.current = null;
    }, [roomId]);

    useEffect(() => {
        if (status !== "success" || messages.length === 0) return;

        const lastFromOther = [...messages]
            .reverse()
            .find(m => (userType === "STAFF" ? Number(m.senderId) !== myId : Number(m.senderId) === myId));
        if (!lastFromOther) return; // 내 메세지면 요청 X

        if (lastReadMessageRef.current === lastFromOther.id) return; // 같은 메시지 중복 전송 방지

        markLatestMessageRead(roomId, {
            id: lastFromOther.id,
            chatRoomId: lastFromOther.chatRoomId,
            senderId: lastFromOther.senderId,
            timestamp: lastFromOther.timestamp,
            messageType: lastFromOther.messageType,
            content: lastFromOther.content,
        });

        lastReadMessageRef.current = lastFromOther.id;
    }, [status, messages, roomId, myId, markLatestMessageRead, userType]);

    if (userType === "GUESTHOUSE")
        optionMenus.unshift({
            label: "스탭 합격",
            onClick: handleAcceptModalOpen,
        });

    if (isBootLoading || !chat) {
        return <LoadingSpinner />;
    }

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
                            const isMine =
                                userType === "GUESTHOUSE"
                                    ? Number(m.senderId) !== Number(myId)
                                    : Number(m.senderId) === Number(myId);
                            const isFirst = i === 0;
                            const isLast = i === messages.length - 1;
                            const showDateHeader =
                                isFirst || dateKey(messages[i - 1].timestamp) !== dateKey(m.timestamp);
                            return (
                                <div key={m.id}>
                                    {showDateHeader && (
                                        <DateDivider isFirst={isFirst}>{formatDateHeader(m.timestamp)}</DateDivider>
                                    )}
                                    <MessageLine isMine={isMine} ref={isLast ? lastMsgRef : undefined}>
                                        <MessageSendTime>{formatTimestamp(m.timestamp)}</MessageSendTime>
                                        <MessageItem message={m} isMine={isMine} />
                                    </MessageLine>
                                </div>
                            );
                        })}
                        <div ref={bottomRef} />
                    </ChatScrollArea>
                    {isModalOpen && (
                        <Modal variant="page" handleModalClose={() => setIsModalOpen(false)}>
                            <Wrapper.FlexBox direction="column" alignItems="center" gap="6px">
                                <Text.Title3_1> 해당 지원자를 합격으로</Text.Title3_1>
                                <Text.Title3_1> 지정할 공고를 선택해 주세요.</Text.Title3_1>
                            </Wrapper.FlexBox>

                            <RecruitListScroll>
                                {myRecruits.map((item: GuesthouseListItemProps) => (
                                    <RecruitCardWrapper key={item.employmentId}>
                                        <SelectableRecruitCard
                                            item={item}
                                            selected={checkedId === item.employmentId}
                                            onSelect={setCheckedId}
                                        />
                                    </RecruitCardWrapper>
                                ))}
                            </RecruitListScroll>

                            <ConfirmBox>
                                <ConfirmButton
                                    disabled={!checkedId}
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setIsAcceptConfirmModal(true);
                                    }}
                                >
                                    <Text.Title3_1 color="White">확인</Text.Title3_1>
                                </ConfirmButton>
                            </ConfirmBox>
                        </Modal>
                    )}

                    {isAcceptConfirmModal && (
                        <>
                            <Modal
                                variant="confirm"
                                title="해당 공고글로 합격을 시키겠습니까?"
                                message={
                                    <>
                                        확인 버튼 클릭 시, '{truncateText(String(employment?.data.title), 12)}'
                                        <br />
                                        게시글에 {chat.title}님을 합격 처리합니다.
                                    </>
                                }
                                handleModalClose={() => setIsAcceptConfirmModal(false)}
                                onConfirm={() => {
                                    setIsModalOpen(false);
                                    setIsAcceptConfirmModal(false);
                                    setIsAcceptCompleteModal(true);
                                }}
                                cancelText="이전으로"
                                confirmText="확인"
                            />
                        </>
                    )}

                    {isAcceptCompleteModal && (
                        <>
                            <Modal
                                variant="default"
                                title="합격 처리 완료"
                                confirmText="확인"
                                handleModalClose={() => {
                                    setIsAcceptConfirmModal(false);
                                    navigate(-1);
                                }}
                                onConfirm={handleAcceptApplicantClick}
                            />
                        </>
                    )}

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

const RecruitCardWrapper = styled.div`
    width: 302px;
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
    scroll-margin-bottom: 24px;
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
const RecruitListScroll = styled.div`
    max-height: 420px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
    scrollbar-width: none;
`;

const ConfirmBox = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;

const ConfirmButton = styled.button<{ disabled?: boolean }>`
    width: 100%;
    height: 44px;
    border: 0;
    border-radius: 12px;
    background: ${({ theme, disabled }) => (disabled ? theme.color.Gray2 : theme.color.Main)};
    cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
    transition: opacity 0.2s;
    opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;
