import Header from "@/components/Header";
import PageWrapper from "@/components/PageWrapper";
import TabSelector from "@/components/TabSelector";
import { StaffTabTypes, TAB_LABELS } from "@/constants/tabs";
import { useState } from "react";
import ChatListItem from "./components/ChatListItem";
import { useNavigate } from "react-router-dom";
import { Wrapper } from "@/styles/Wrapper";
import { Text } from "@/styles/Text";
import { ChatRoomPreview } from "@/chat/types/common";

const mockChatRooms: ChatRoomPreview[] = [
    {
        id: 1,
        title: "일등 게하",
        image: "/icons/defaultUser.svg",
        lastMessage:
            "안녕하세요! 오늘 면접 바로 가능하세요?안녕하세요! 오늘 면접 바로 가능하세요?안녕하세요! 오늘 면접 바로 가능하세요?안녕하세요! 오늘 면접 바로 가능하세요?",
        unreadCount: 6,
        timestamp: Date.now() / 1000,
    },
    {
        id: 2,
        title: "제주 민박",
        image: "/icons/defaultUser.svg",
        lastMessage: "사진 잘 봤습니다. 편하신 시간 알려주세요.",
        unreadCount: 1,
        timestamp: Date.now() / 1000,
    },
    {
        id: 3,
        title: "결 게스트하우스",
        image: "/icons/defaultUser.svg",
        lastMessage: "정말 감사했어요 :)",
        unreadCount: 0,
        timestamp: Date.now() / 1000,
    },
];

export default function ChatPage() {
    const [filter, setFilter] = useState<StaffTabTypes["CHAT_LIST"]>("전체");
    const [onEditMode, setOnEditMode] = useState(false);
    const navigate = useNavigate();

    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const allSelected = selectedIds.length === mockChatRooms.length;

    const toggleSelect = (id: number) => {
        setSelectedIds(prev => (prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]));
    };

    const handleToggleAll = () => {
        if (allSelected) {
            setSelectedIds([]);
        } else {
            setSelectedIds(mockChatRooms.map(room => room.id));
        }
    };

    return (
        <>
            <Header
                title="채팅 리스트"
                rightText={
                    <Text.Body1 color={onEditMode ? "Black" : "Gray3"}>{onEditMode ? "완료" : "편집"}</Text.Body1>
                }
                onRightClick={() => {
                    setOnEditMode(prev => !prev);
                    setSelectedIds([]);
                }}
            />
            <PageWrapper hasHeader hasNav>
                <TabSelector
                    labels={[...TAB_LABELS.STAFF.CHAT_LIST]}
                    selected={filter}
                    onChange={label => setFilter(label as StaffTabTypes["CHAT_LIST"])}
                    variant="underline"
                ></TabSelector>

                {onEditMode && (
                    <Wrapper.FlexBox justifyContent="space-between" padding="18px 0px 6px 0px">
                        <Text.Body1_1 color={allSelected ? "Main" : "Gray4"} onClick={handleToggleAll}>
                            전체선택
                        </Text.Body1_1>
                        <Text.Body1_1 color="Gray4">삭제</Text.Body1_1>
                    </Wrapper.FlexBox>
                )}

                <div>
                    {mockChatRooms.map(room => (
                        <ChatListItem
                            key={room.id}
                            onEditMode={onEditMode}
                            isSelected={selectedIds.includes(room.id)}
                            onSelectToggle={() => toggleSelect(room.id)}
                            room={{
                                id: room.id,
                                title: room.title,
                                image: room.image,
                                unreadCount: room.unreadCount,
                                lastMessage: room.lastMessage,
                                timestamp: room.timestamp,
                            }}
                            onClick={() => navigate(`/chat/${room.id}`)}
                        />
                    ))}
                </div>
            </PageWrapper>
        </>
    );
}
