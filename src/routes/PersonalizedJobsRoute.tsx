import { nanoid } from "@reduxjs/toolkit";
import { Bookmark, Briefcase } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

const links = [
  {
    label: "Applied Jobs",
    path: "applied-jobs",
    icon: <Briefcase className="h-4 w-4 mr-3" />,
  },
  {
    label: "Bookmarked Jobs",
    path: "bookmarked-jobs",
    icon: <Bookmark className="h-4 w-4 mr-3" />,
  },
];

const PersonalizedJobsRoute = () => {
  return (
    <div className="py-8 space-y-6">
      <div className="flex gap-6 items-start">
        <aside className="sticky top-20 p-6 rounded-md border border-border max-w-[16rem] w-full hidden lg:block">
          <ul className="space-y-1">
            {links.map(({ label, path, icon }) => (
              <li key={nanoid()}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `text-sm rounded-md px-4 py-2 h-10 font-medium flex items-center transition duration-150 hover:bg-accent hover:text-accent-foreground ${
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
        </aside>

        <div className="lg:p-6 lg:rounded-md lg:border lg:border-border w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PersonalizedJobsRoute;
