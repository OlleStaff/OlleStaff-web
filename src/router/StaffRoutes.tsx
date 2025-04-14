import { RouteObject } from "react-router-dom";
import StaffLayout from "@/layout/StaffLayout";
import StaffHome from "@/pages/staff/HomePage";
import CompanionPage from "@/pages/staff/CompanionPage";
import UserInfoPage from "@/pages/staff/UserInfoPage";

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
                path: "companion",
                element: <CompanionPage />,
            },
            {
                path: "userinfo",
                element: <UserInfoPage />,
            },
        ],
    },
];

export default StaffRoutes;
