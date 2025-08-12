import styled from "@emotion/styled";
import { Text } from "@/styles/Text";
import { Wrapper } from "@/styles/Wrapper";
import theme from "@/styles/theme";
import { Style as RadioStyle } from "@/components/RadioButton";
import { timeAgo } from "@/utils/date";
import { ChatRoomPreview } from "@/chat/types/chatRooms";

interface ChatListItemProps {
    room: ChatRoomPreview;
    onEditMode: boolean;
    isSelected?: boolean;
    onSelectToggle?: () => void;
    onClick: () => void;
}

export default function ChatListItem({ room, onEditMode, onClick, isSelected, onSelectToggle }: ChatListItemProps) {
    return (
        <ItemContainer onClick={onEditMode ? onSelectToggle : onClick}>
            {onEditMode && (
                <CheckboxWrapper onClick={e => e.stopPropagation()}>
                    <CheckboxInput type="checkbox" checked={isSelected} onChange={onSelectToggle} />
                    <RadioStyle.RadioCircle>{isSelected && <RadioStyle.RadioInnerCircle />}</RadioStyle.RadioCircle>
                </CheckboxWrapper>
            )}
            <ProfileImg src={room.image} alt="프로필" />
            <Wrapper.FlexBox direction="column" gap="6px" style={{ minWidth: 0 }}>
                <Wrapper.FlexBox justifyContent="space-between" alignItems="center">
                    <Text.Title4>{room.title}</Text.Title4>
                    <Text.Body3_1 color="Gray4">{timeAgo(room.lastMessage.timestamp)}</Text.Body3_1>
                </Wrapper.FlexBox>
                <Wrapper.FlexBox justifyContent="space-between" alignItems="center">
                    <LastMessage>
                        {room.lastMessage.messageType === "TEXT" && <>{room.lastMessage.content.text}</>}
                    </LastMessage>
                    {room.unreadMessageCount > 0 && <Unread>{room.unreadMessageCount}</Unread>}
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

const CheckboxWrapper = styled.label`
    position: relative;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const CheckboxInput = styled.input`
    display: none;
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
