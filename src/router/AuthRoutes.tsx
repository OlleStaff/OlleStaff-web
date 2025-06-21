import { RouteObject } from "react-router-dom";
import AuthLayout from "@/layout/AuthLayout";
import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import KakaoRedirectPage from "@/pages/auth/KakaoRedirectPage";
import NaverRedirectPage from "@/pages/auth/NaverRedirectPage";
import GoogleRedirectPage from "@/pages/auth/GoogleRedirectPage";
import TermsPage from "@/pages/auth/TermsPage";
import TypeSelectPage from "@/pages/auth/TypeSelectPage";
import BusinessVerificationPage from "@/pages/auth/BusinessVerification";
import OwnerTermsPage from "@/pages/auth/OwnerTermsPage";
import RecruitWriteContainer from "@/pages/owner/Recruit/RecruitCreateContainer";
import ReviewManagePage from "@/pages/owner/ReviewManagePage";
import NotFoundPage from "@/pages/NotFoundPage";
import RecruitDetailPage from "@/pages/owner/Recruit/RecruitDetailPage";
import FullscreenLayout from "@/layout/FullScreenLayout";
import RecruitEditContainer from "@/pages/owner/Recruit/RecruitEditContainer";
import TermsDetailPage from "@/pages/auth/TermsDetailPage";
import ChatPage from "@/chat/pages/ChatListPage";
import ChatRoomPage from "@/chat/pages/ChatRoomPage";
import ChatLayout from "@/layout/ChatLayout";

const AuthRoutes: RouteObject[] = [
    {
        path: "/",
        element: <FullscreenLayout />,
        children: [
            {
                index: true,
                element: <LoginPage />,
            },
        ],
    },
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                path: "/signup",
                element: <SignupPage />,
            },
            {
                path: "/agreements",
                element: <TermsPage />,
            },
            {
                path: "/type-select",
                element: <TypeSelectPage />,
            },
            {
                path: "/chat/:chatRoomId",
                element: <ChatRoomPage />,
            },
        ],
    },
    {
        path: "/chat",
        element: <ChatLayout />,
        children: [
            {
                index: true,
                element: <ChatPage />,
            },
        ],
    },

    {
        path: "/auth/kakao",
        element: <KakaoRedirectPage />,
    },
    {
        path: "/auth/naver",
        element: <NaverRedirectPage />,
    },
    {
        path: "/auth/google",
        element: <GoogleRedirectPage />,
    },
    {
        path: "business-verification",
        element: <BusinessVerificationPage />,
    },
    {
        path: "business-verification/term",
        element: <OwnerTermsPage />,
    },
    {
        path: "/terms/:termId",
        element: <TermsDetailPage />,
    },
    {
        path: "owner/recruit/write/*",
        element: <RecruitWriteContainer />,
    },
    {
        path: "owner/recruit/edit/:employmentId/*",
        element: <RecruitEditContainer />,
    },
    {
        path: "owner/userinfo/reviews",
        element: <ReviewManagePage />,
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
    {
        path: "guesthouse/:employmentId",
        element: <RecruitDetailPage />,
    },
];

export default AuthRoutes;
