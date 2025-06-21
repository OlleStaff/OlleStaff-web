import { RouteObject } from "react-router-dom";
import StaffLayout from "@/layout/StaffLayout";
import StaffHome from "@/pages/staff/HomePage";
import UserInfoPage from "@/pages/staff/user/UserInfoPage";
import ApplicationWritePage from "@/pages/staff/ApplicationWritePage";
import AuthLayout from "@/layout/AuthLayout";
import AccompanyWritePage from "@/pages/staff/AccompanyWritePage";
import CategoryPage from "@/pages/staff/CategoryPage";
import RecommendPage from "@/pages/staff/RecommendPage";
import AccompanyPage from "@/pages/staff/AccompanyPage";
import AccompanyDetailPage from "@/pages/staff/AccompanyDetailPage";
import MyCommentsPage from "@/pages/staff/user/MyCommentsPage";
import EditProfilePage from "@/pages/staff/user/EditProfilePage";
import EditApplicationPage from "@/pages/staff/user/EditApplicationPage";
import MyPostsPage from "@/pages/staff/user/MyPostsPage";
import MyReviewsPage from "@/pages/staff/user/MyReviewsPage";
import MyLikesPage from "@/pages/staff/user/MyLikesPage";
import ApplicationViewPage from "@/pages/staff/ApplicationViewPage";
import ReviewWritePage from "@/pages/staff/ReviewWritePage";

const StaffRoutes: RouteObject[] = [
    {
        path: "/staff",
        element: <StaffLayout />,
        children: [
            {
                index: true,
                element: <StaffHome />,
            },
            {
                path: "accompany",
                element: <AccompanyPage />,
            },

            {
                path: "userinfo",
                element: <UserInfoPage />,
            },
            {
                path: "guesthouse/category",
                element: <CategoryPage />,
            },
            {
                path: "guesthouse/recommend",
                element: <RecommendPage />,
            },
        ],
    },
    {
        path: "/staff",
        element: <AuthLayout />,
        children: [
            {
                path: "accompany/:id",
                element: <AccompanyDetailPage />,
            },
            {
                path: "application/write",
                element: <ApplicationWritePage />,
            },
            {
                path: "accompany/write",
                element: <AccompanyWritePage />,
            },
            {
                path: "user/edit-profile",
                element: <EditProfilePage />,
            },
            {
                path: "user/edit-application",
                element: <EditApplicationPage />,
            },
            {
                path: "user/my-posts",
                element: <MyPostsPage />,
            },
            {
                path: "user/my-comments",
                element: <MyCommentsPage />,
            },
            {
                path: "user/my-reviews",
                element: <MyReviewsPage />,
            },
            {
                path: "user/my-likes",
                element: <MyLikesPage />,
            },
            {
                path: "application",
                element: <ApplicationViewPage />,
            },
            {
                path: "review",
                element: <ReviewWritePage />,
            },
        ],
    },
];

export default StaffRoutes;
