import Header from "@/components/Header";
import PageWrapper from "@/components/PageWrapper";
import TabSelector from "@/components/TabSelector";
import { StaffTabTypes, TAB_LABELS } from "@/constants/tabs";
import { useState } from "react";
import ChatListItem from "../components/ChatListItem";
import { useNavigate } from "react-router-dom";

const mockChatRooms = [
    {
        id: 1,
        name: "일등 게하",
        lastMessage:
            "안녕하세요! 오늘 면접 바로 가능하세요?안녕하세요! 오늘 면접 바로 가능하세요?안녕하세요! 오늘 면접 바로 가능하세요?안녕하세요! 오늘 면접 바로 가능하세요?",
        time: "3분전",
        unreadCount: 6,
        profileImage: "/icons/defaultUser.svg",
    },
    {
        id: 2,
        name: "제주 민박",
        lastMessage: "사진 잘 봤습니다. 편하신 시간 알려주세요.",
        time: "2일전",
        unreadCount: 1,
        profileImage: "/icons/defaultUser.svg",
    },
    {
        id: 3,
        name: "결 게스트하우스",
        lastMessage: "정말 감사했어요 :)",
        time: "6일전",
        unreadCount: 0,
        profileImage: "/icons/defaultUser.svg",
    },
];

export default function ChatPage() {
    const [filter, setFilter] = useState<StaffTabTypes["CHAT_LIST"]>("전체");
    const navigate = useNavigate();

    return (
        <>
            <Header title="채팅 리스트" />
            <PageWrapper hasHeader hasNav>
                <TabSelector
                    labels={[...TAB_LABELS.STAFF.CHAT_LIST]}
                    selected={filter}
                    onChange={label => setFilter(label as StaffTabTypes["CHAT_LIST"])}
                    variant="underline"
                ></TabSelector>

                <div>
                    {mockChatRooms.map(room => (
                        <ChatListItem key={room.id} room={room} onClick={() => navigate(`/chat/${room.id}`)} />
                    ))}
                </div>
            </PageWrapper>
        </>
    );
}
