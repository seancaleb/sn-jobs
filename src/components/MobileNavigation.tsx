import { nanoid } from "@reduxjs/toolkit";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

const navigationLinks = [
  {
    heading: "Home",
    links: [{ label: "Jobs", path: "/jobs" }],
  },
  {
    heading: "Jobs",
    links: [
      { label: "Applied Jobs", path: "/jobseekers/applied-jobs" },
      { label: "Bookmarked Jobs", path: "/jobseekers/bookmarked-jobs" },
    ],
  },
  {
    heading: "Account Settings",
    links: [
      { label: "My Profile", path: "/jobseekers/account/profile" },
      { label: "Privacy & Security", path: "/jobseekers/account/privacy-and-security" },
    ],
  },
];

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="fixed top-16 left-0 right-0 h-12 bg-background border-b border-border z-10 lg:hidden">
      <div
        onClick={handleIsOpen}
        className="px-5 h-full flex items-center gap-2 text-sm font-semibold cursor-pointer hover:bg-accent container"
      >
        <ChevronRight
          className={cn(
            "h-4 w-4",
            isOpen ? "animate-chevron-right-down" : "animate-chevron-right-normal"
          )}
        />
        <div>Navigation</div>
      </div>

      <div
        className={cn(
          "px-6 pt-4 pb-8 mt-[1px] h-auto max-h-[24rem] border-b border-border bg-background overflow-y-auto hidden space-y-4",
          isOpen && "block"
        )}
      >
        {navigationLinks.map((nav) => (
          <div key={nanoid()}>
            <div className="font-semibold mb-2">{nav.heading}</div>
            {nav.links.map((link) => (
              <NavLink
                key={nanoid()}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "text-light text-sm cursor-pointer hover:text-primary py-2 px-4 flex items-center",
                    isActive && "text-primary"
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileNavigation;
