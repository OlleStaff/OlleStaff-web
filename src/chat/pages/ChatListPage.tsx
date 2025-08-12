import Header from "@/components/Header";
import PageWrapper from "@/components/PageWrapper";
import TabSelector from "@/components/TabSelector";
import { StaffTabTypes, TAB_LABELS } from "@/constants/tabs";
import { useState } from "react";
import ChatListItem from "./components/ChatListItem";
import { useNavigate } from "react-router-dom";
import { Wrapper } from "@/styles/Wrapper";
import { Text } from "@/styles/Text";
import { useGetChatList } from "../hooks/useGetChatList";
import LoadingSpinner from "@/components/LoadingSpinner";
import Oops from "@/components/Oops";

export default function ChatPage() {
    const [filter, setFilter] = useState<StaffTabTypes["CHAT_LIST"]>("전체");
    const [onEditMode, setOnEditMode] = useState(false);
    const navigate = useNavigate();

    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const { data: chatList, isLoading } = useGetChatList();

    if (isLoading) return <LoadingSpinner />;

    const allSelected = selectedIds.length === chatList?.length;

    const toggleSelect = (id: number) => {
        setSelectedIds(prev => (prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]));
    };

    const handleToggleAll = () => {
        if (allSelected) {
            setSelectedIds([]);
        } else {
            setSelectedIds(chatList?.map(room => room.id) ?? []);
        }
    };

    return (
        <>
            <Header
                title="채팅 리스트"
                rightText={<Text.Body1 color={onEditMode ? "Black" : "Gray3"}>편집</Text.Body1>}
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
                />

                {onEditMode && (
                    <Wrapper.FlexBox justifyContent="space-between" padding="18px 0px 6px 0px" pointer>
                        <Text.Body1_1 color={allSelected ? "Main" : "Gray4"} onClick={handleToggleAll}>
                            전체선택
                        </Text.Body1_1>
                        <Text.Body1_1 color="Gray4">삭제</Text.Body1_1>
                    </Wrapper.FlexBox>
                )}

                <div>
                    {chatList?.map(room => (
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

                    {chatList?.length === 0 && (
                        <>
                            <div style={{ padding: "150px 0 0 0" }}>
                                <Oops
                                    message="아직 진행 중인 채팅이 없어요."
                                    description={`지원자가 생기면 채팅이 시작돼요!`}
                                />
                            </div>
                        </>
                    )}
                </div>
            </PageWrapper>
        </>
    );
}
