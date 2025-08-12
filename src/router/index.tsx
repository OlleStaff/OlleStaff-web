import { createBrowserRouter } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import OwnerRoutes from "./OwnerRoutes";
import StaffRoutes from "./StaffRoutes";
import CommonRoutes from "./CommonRoutes";

const router = createBrowserRouter([...AuthRoutes, ...OwnerRoutes, ...StaffRoutes, ...CommonRoutes]);

export default router;
