import { useAppSelector } from "@/app/hooks";
import { selectAuthStatus } from "@/features/auth/authSlice";
import { nanoid } from "@reduxjs/toolkit";
import { Lock, User as ProfileUser } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

const links = [
  {
    label: "My Profile",
    path: "account/profile",
    icon: <ProfileUser className="mr-3 h-5 w-5" strokeWidth={2.5} />,
    role: "generic",
  },
  {
    label: "Privacy & Security",
    path: "account/privacy-and-security",
    icon: <Lock className="mr-3 h-5 w-5" strokeWidth={2.5} />,
    role: "generic",
  },
];

const UserAccountRoute = () => {
  const auth = useAppSelector(selectAuthStatus);

  return (
    <div className="py-12 space-y-6">
      <div className="space-y-1">
        <div className="text-2xl tracking-tight font-bold">Account Settings</div>
        <p className="text-[0.9375rem]">Centralize your profile and settings.</p>
      </div>

      <div className="flex gap-6 items-start">
        <aside className="p-6 rounded-md border border-slate-200 max-w-[14em] w-full">
          <ul className="space-y-6 text-[0.9375rem] font-medium">
            {links.map(({ label, path, icon, role }) =>
              role === "generic" ? (
                <li key={nanoid()}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      isActive ? "text-teal-600 flex items-center" : "flex items-center"
                    }
                  >
                    {icon}
                    {label}
                  </NavLink>
                </li>
              ) : role === auth.role ? (
                <li key={nanoid()}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      isActive ? "text-teal-600 flex items-center" : "flex items-center"
                    }
                  >
                    {icon}
                    {label}
                  </NavLink>
                </li>
              ) : null
            )}
          </ul>
        </aside>

        <div className="p-6 rounded-md border border-slate-200 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserAccountRoute;
