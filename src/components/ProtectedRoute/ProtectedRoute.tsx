import { useAppSelector } from "@/app/hooks";
import { selectAuthStatus } from "@/features/auth/authSlice";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAppSelector(selectAuthStatus);

  return isAuthenticated ? children : <Navigate to="/" replace={true} />;
};

export default ProtectedRoute;
