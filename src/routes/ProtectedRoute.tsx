/* eslint-disable react-refresh/only-export-components */
import store from "@/app/store";
import { Role } from "@/types/user";
import { Outlet, redirect } from "react-router-dom";

export const loader = (role: Role) => () => {
  const auth = store.getState().auth;

  if (!auth.isAuthenticated) return redirect("/");

  const isAuthorized = role === (auth.role as Role);

  return !isAuthorized
    ? auth.role === "user"
      ? redirect("/jobs")
      : redirect("/employer/dashboard")
    : null;
};

const ProtectedRoute = () => {
  return <Outlet />;
};

export default ProtectedRoute;
