import { useQuery } from "@tanstack/react-query";
import { ChatRoomApi } from "../api/chatroom";

export const useGetChatRoomIdByTargetUser = (targetUserId: number) => {
    return useQuery({
        queryKey: ["chatRoom", targetUserId],
        queryFn: () => ChatRoomApi.getChatRoomByTargetUser(targetUserId as number),
        enabled: typeof targetUserId === "number", // id 없으면 요청 x
    });
};
