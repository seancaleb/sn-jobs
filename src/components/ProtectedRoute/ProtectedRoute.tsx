import { useAppSelector } from "@/app/hooks";
import { selectAuthStatus } from "@/features/auth/authSlice";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAppSelector(selectAuthStatus);

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace={true} />;
};

export default ProtectedRoute;
