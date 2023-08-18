/* eslint-disable react-refresh/only-export-components */
import { useAppSelector } from "@/app/hooks";
import store from "@/app/store";
import { selectAuthStatus } from "@/features/auth/authSlice";
import { Navigate, Outlet, redirect } from "react-router-dom";

export const loader = () => {
  const auth = store.getState().auth;

  return auth.isAuthenticated ? null : redirect("/");
};

const PrivateRoute = () => {
  const { isAuthenticated } = useAppSelector(selectAuthStatus);

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
