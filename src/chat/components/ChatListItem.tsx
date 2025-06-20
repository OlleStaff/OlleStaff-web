import styled from "@emotion/styled";
import { Text } from "@/styles/Text";
import { Wrapper } from "@/styles/Wrapper";
import theme from "@/styles/theme";

interface ChatListItemProps {
    room: {
        id: number;
        name: string;
        lastMessage: string;
        time: string;
        unreadCount: number;
        profileImage: string;
    };
    onClick?: () => void;
}

export default function ChatListItem({ room, onClick }: ChatListItemProps) {
    return (
        <ItemContainer onClick={onClick}>
            <ProfileImg src={room.profileImage} alt="프로필" />
            <Wrapper.FlexBox direction="column" gap="8px" style={{ minWidth: 0 }}>
                <Wrapper.FlexBox justifyContent="space-between" alignItems="center">
                    <Text.Title4>{room.name}</Text.Title4>
                    <Text.Body3_1 color="Gray4">{room.time}</Text.Body3_1>
                </Wrapper.FlexBox>

                <Wrapper.FlexBox justifyContent="space-between" alignItems="center">
                    <LastMessage>{room.lastMessage}</LastMessage>
                    {room.unreadCount > 0 && <Unread>{room.unreadCount}</Unread>}
                </Wrapper.FlexBox>
            </Wrapper.FlexBox>
        </ItemContainer>
    );
}

const ItemContainer = styled(Wrapper.FlexBox)`
    padding: 12px 0;
    gap: 12px;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #f2f2f2;
`;

const ProfileImg = styled.img`
    width: 52px;
    height: 52px;
    border-radius: 6px;
    object-fit: cover;
    flex-shrink: 0;
`;

const LastMessage = styled(Text.Body2)`
    color: ${theme.color.Gray4};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const Unread = styled.div`
    background-color: ${theme.color.Main};
    color: white;
    font-size: 12px;
    min-width: 20px;
    height: 20px;
    border-radius: 10px;
    padding: 0 6px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
