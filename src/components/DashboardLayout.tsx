import { useAppSelector } from "@/app/hooks";
import { selectAuthStatus } from "@/features/auth/authSlice";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const auth = useAppSelector(selectAuthStatus);

  if (auth.role === "user") {
    return (
      <div className="h-screen container grid place-items-center">
        <Outlet />
      </div>
    );
  }

  return (
    <main>
      <h1>Dashboard Layout</h1>
      <Outlet />
    </main>
  );
};

export default DashboardLayout;
