import Header from "@/components/Header";
import PageWrapper from "@/components/PageWrapper";
import TabSelector from "@/components/TabSelector";
import { TAB_LABELS } from "@/constants/tabs";
import { useState } from "react";
import ChatListItem from "./components/ChatListItem";
import { useNavigate } from "react-router-dom";
import { Wrapper } from "@/styles/Wrapper";
import { Text } from "@/styles/Text";
import { useGetChatList } from "../hooks/useGetChatList";
import Oops from "@/components/Oops";
import { useUserStore } from "@/store/useUserStore";

const STAFF_TABS = TAB_LABELS.STAFF.CHAT_LIST;
const OWNER_TABS = TAB_LABELS.OWNER.CHAT_LIST;

type StaffTab = (typeof STAFF_TABS)[number];
type OwnerTab = (typeof OWNER_TABS)[number];
type ChatListTab = StaffTab | OwnerTab;
type ServerFilter = "ALL" | "APPLIED" | "ACCEPTED";

export default function ChatPage() {
    const userType = useUserStore(s => s.type);

    const isStaff = userType === "STAFF";

    const labels = (isStaff ? STAFF_TABS : OWNER_TABS) as readonly ChatListTab[];
    const [selectedTab, setSelectedTab] = useState<ChatListTab>(labels[0]);

    const OWNER_MAP: Record<OwnerTab, ServerFilter> = {
        [OWNER_TABS[0]]: "APPLIED",
        [OWNER_TABS[1]]: "ACCEPTED",
    };

    const serverFilter: ServerFilter = isStaff ? "ALL" : OWNER_MAP[selectedTab as OwnerTab];

    const { data: chatList = [] } = useGetChatList(serverFilter);

    const [onEditMode, setOnEditMode] = useState(false);
    const navigate = useNavigate();

    const [selectedIds, setSelectedIds] = useState<number[]>([]);

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
                    labels={[...labels]}
                    selected={selectedTab}
                    onChange={label => setSelectedTab(label as ChatListTab)}
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
