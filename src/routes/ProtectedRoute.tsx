import { useAppSelector } from "@/app/hooks";
import { selectAuthStatus } from "@/features/auth/authSlice";
import { Role } from "@/types/user";
import { Navigate, Outlet } from "react-router-dom";

type ProtectedRouteProps = {
  role: Role;
};

const ProtectedRoute = ({ role }: ProtectedRouteProps) => {
  const auth = useAppSelector(selectAuthStatus);

  if (auth.role === null) return <Navigate to="/" replace />;

  const isAuthorized = auth.role === role;

  if (!isAuthorized) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
