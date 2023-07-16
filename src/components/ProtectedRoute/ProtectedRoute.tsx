import { useAppSelector } from "@/app/hooks";
import { selectUser } from "@/features/auth/authSlice";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector(selectUser);

  return user ? children : <Navigate to="/" replace={true} />;
};

export default ProtectedRoute;
