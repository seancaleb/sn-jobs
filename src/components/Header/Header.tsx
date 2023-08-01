import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Menu } from "lucide-react";
import { useMediaQuery } from "@mantine/hooks";
import { useAppSelector } from "@/app/hooks";
import { selectAuthStatus } from "@/features/auth/authSlice";
import HeaderAccountDropdown from "./HeaderAccountDropdown";

const Header = () => {
  const isDesktop = useMediaQuery("(min-width: 40em)");
  const { isAuthenticated, role } = useAppSelector(selectAuthStatus);

  return (
    <header className="h-16 border-b border-slate-200 w-full" aria-label="navigation header">
      <div className="container h-full flex items-center justify-between">
        <NavLink
          to={isAuthenticated ? "/jobs" : "/"}
          className="text-xl font-bold tracking-[-.5px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
        >
          SNJOBS
        </NavLink>

        {isDesktop ? (
          <nav>
            <ul aria-label="Navigation Menu List" className="flex space-x-6 items-center">
              {!isAuthenticated && (
                <li>
                  <Button variant="ghost">Job Board</Button>
                </li>
              )}

              {isAuthenticated && (
                <li>
                  <div className="flex space-x-2">
                    {role === "employer" && <Button variant="ghost">Post a Job</Button>}
                    <Button variant="ghost">Job Board</Button>
                  </div>
                </li>
              )}

              <li className="self-stretch">
                <Separator orientation="vertical" />
              </li>

              {!isAuthenticated && (
                <li>
                  <div className="flex space-x-2">
                    <Button asChild variant="ghost">
                      <Link to="sign-in">Sign In</Link>
                    </Button>
                    <Button asChild variant="ghost">
                      <Link to="sign-up">Sign Up</Link>
                    </Button>
                  </div>
                </li>
              )}

              {isAuthenticated && <HeaderAccountDropdown />}
            </ul>
          </nav>
        ) : (
          <Menu
            role="graphics-document"
            aria-label="navigation menu burger"
            size={32}
            className="cursor-pointer"
          />
        )}
      </div>
    </header>
  );
};

export default Header;
