import Header from "@/components/Header";
import PageWrapper from "@/components/PageWrapper";
import TabSelector from "@/components/TabSelector";
import { StaffTabTypes, TAB_LABELS } from "@/constants/tabs";
import { useState } from "react";
import ChatListItem from "./components/ChatListItem";
import { useNavigate } from "react-router-dom";
import { Wrapper } from "@/styles/Wrapper";
import { Text } from "@/styles/Text";
import { ChatRoomPreview } from "../types/chatRooms";

const mockChatRooms: ChatRoomPreview[] = [
    {
        id: 123,
        title: "후닝",
        image: "https://olle-staff-image.s3.ap-northeast-2.amazonaws.com/images/4dbcfa1f-6bd6-4966-9659-8bb312d21314",
        lastMessage: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            chatRoomId: 123,
            senderId: 128,
            timestamp: 9007199254740991,
            messageType: "TEXT",
            content: {
                text: "안녕",
            },
        },
        unreadMessageCount: 3,
    },
    {
        id: 124,
        title: "훈",
        image: "https://olle-staff-image.s3.ap-northeast-2.amazonaws.com/images/4dbcfa1f-6bd6-4966-9659-8bb312d21314",
        lastMessage: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            chatRoomId: 124,
            senderId: 127,
            timestamp: 7007199254740991,
            messageType: "TEXT",
            content: {
                text: "안녕안녕",
            },
        },
        unreadMessageCount: 0,
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
                                unreadMessageCount: room.unreadMessageCount,
                                lastMessage: room.lastMessage,
                            }}
                            onClick={() => navigate(`/chat/${room.id}`)}
                        />
                    ))}
                </div>
            </PageWrapper>
        </>
    );
}
