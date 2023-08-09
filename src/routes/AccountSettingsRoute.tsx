import { nanoid } from "@reduxjs/toolkit";
import { Lock, User as ProfileUser } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

const links = [
  {
    label: "My Profile",
    path: "profile",
    icon: <ProfileUser className="mr-3 h-5 w-5" strokeWidth={2.5} />,
  },
  {
    label: "Privacy & Security",
    path: "privacy-and-security",
    icon: <Lock className="mr-3 h-5 w-5" strokeWidth={2.5} />,
  },
];

const AccountSettingsRoute = () => {
  return (
    <div className="py-8 space-y-6">
      <div className="space-y-2">
        <div className="text-3xl tracking-tight font-bold">Account Settings</div>
        <p>Centralize your profile and settings.</p>
      </div>

      <div className="flex gap-6 items-start">
        <aside className="p-6 rounded-md border border-slate-200 max-w-[14em] w-full">
          <ul className="space-y-6 text-[0.9375rem] font-medium">
            {links.map(({ label, path, icon }) => (
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
            ))}
          </ul>
        </aside>

        <div className="p-6 rounded-md border border-slate-200 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsRoute;