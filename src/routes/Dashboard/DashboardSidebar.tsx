import { useLogoutUser } from "@/api/auth/auth";
import { Button } from "@/components/ui/button";
import { nanoid } from "@reduxjs/toolkit";
import { Briefcase, Lock, LogOut, User } from "lucide-react";
import { NavLink } from "react-router-dom";

const featureLinks = [
  {
    label: "My Job Listings",
    path: "job-listings",
    icon: <Briefcase className="h-4 w-4 mr-3" />,
  },
];

const accountLinks = [
  {
    label: "My Profile",
    path: "account/profile",
    icon: <User className="h-4 w-4 mr-3" />,
  },
  {
    label: "Privacy & Security",
    path: "account/privacy-and-security",
    icon: <Lock className="h-4 w-4 mr-3" />,
  },
];

const DashboardSidebar = () => {
  const logoutUserMutation = useLogoutUser();

  const handleLogout = () => {
    logoutUserMutation.mutate();
  };

  return (
    <aside className="fixed left-0 top-0 bottom-0 max-w-[16rem] w-full h-full border-r border-border flex flex-col">
      {/* Logo  */}
      <div className="text-xl font-bold px-6 h-16 border-b border-border flex items-center ">
        SNJOBS
      </div>

      {/* Links  */}
      <div className="p-6 flex flex-1 flex-col justify-between">
        {/* Upper  */}
        <div className="space-y-4">
          <div className="space-y-2">
            <span className="uppercase font-medium text-[.625rem] text-slate-400">Features</span>
            <ul className="space-y-1">
              {featureLinks.map(({ label, path, icon }) => (
                <li key={nanoid()}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      `text-sm rounded-md px-4 py-2 h-10 flex items-center transition duration-150 hover:bg-accent hover:text-accent-foreground ${
                        isActive ? "bg-accent text-accent-foreground" : "text-slate-500"
                      }`
                    }
                  >
                    {icon}
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <span className="uppercase font-medium text-[.625rem] text-slate-400">Account</span>
            <ul className="flex flex-col gap-1">
              {accountLinks.map(({ label, path, icon }) => (
                <li key={nanoid()}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      `text-sm rounded-md px-4 py-2 h-10 flex items-center transition duration-150 hover:bg-accent hover:text-accent-foreground ${
                        isActive ? "bg-accent text-accent-foreground" : "text-slate-500"
                      }`
                    }
                  >
                    {icon}
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Lower  */}
        <Button className="justify-start text-slate-500" variant="ghost" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-3" />
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
