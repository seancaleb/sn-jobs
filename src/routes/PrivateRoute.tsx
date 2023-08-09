import { useAppSelector } from "@/app/hooks";
import { selectAuthStatus } from "@/features/auth/authSlice";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { isAuthenticated } = useAppSelector(selectAuthStatus);

  console.log("Test");

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
