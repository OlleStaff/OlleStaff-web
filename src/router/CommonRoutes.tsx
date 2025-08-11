import ChatPage from "@/chat/pages/ChatListPage";
import ChatRoomPage from "@/chat/pages/ChatRoomPage";
import AuthLayout from "@/layout/AuthLayout";
import CommonLayout from "@/layout/ChatLayout";
import UserInfoPage from "@/pages/UserInfoPage";
import { RouteObject } from "react-router-dom";

const CommonRoutes: RouteObject[] = [
    {
        path: "/chat",
        element: <CommonLayout />,
        children: [
            {
                index: true,
                element: <ChatPage />,
            },
        ],
    },
    {
        path: "/",
        element: <CommonLayout />,
        children: [
            {
                path: "userinfo",
                element: <UserInfoPage />,
            },
        ],
    },
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                path: "/chat/:chatRoomId",
                element: <ChatRoomPage />,
            },
        ],
    },
];

export default CommonRoutes;
