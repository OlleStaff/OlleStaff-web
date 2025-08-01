import { createBrowserRouter } from "react-router-dom";
import AuthRoutes from "./AuthRoutes.native";
import OwnerRoutes from "./OwnerRoutes";
import StaffRoutes from "./StaffRoutes";

console.log("native 버전 index파일 성공");

const router = createBrowserRouter([...AuthRoutes, ...OwnerRoutes, ...StaffRoutes]);
export default router;
