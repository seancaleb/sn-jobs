import { useAppSelector } from "@/app/hooks";
import MobileNavigation from "@/components/MobileNavigation";
import { selectAuthStatus } from "@/features/auth/authSlice";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { isAuthenticated, role } = useAppSelector(selectAuthStatus);

  return isAuthenticated ? (
    <>
      {role === "user" ? <MobileNavigation /> : null}
      <Outlet />
    </>
  ) : (
    <Navigate to="/" replace />
  );
};

export default PrivateRoute;
