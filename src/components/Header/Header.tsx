import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAppSelector } from "@/app/hooks";
import { selectAuthStatus } from "@/features/auth/authSlice";
import HeaderAccountDropdown from "./HeaderAccountDropdown";
import logo from "@/assets/images/logo.svg";

const Header = () => {
  const { isAuthenticated } = useAppSelector(selectAuthStatus);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-10 bg-background h-16 border-b border-border w-full"
      aria-label="navigation header"
    >
      <div className="container h-full flex items-center justify-between">
        <NavLink
          to={isAuthenticated ? "/jobs" : "/"}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
          onClick={() => window.scrollTo(0, 0)}
        >
          <img src={logo} className="h-7" />
        </NavLink>

        <nav>
          <ul aria-label="Navigation Menu List" className="flex space-x-2 items-center">
            {!isAuthenticated && (
              <>
                <li>
                  <Button asChild variant="ghost">
                    <Link to="sign-in">Sign In</Link>
                  </Button>
                </li>

                <li className="self-stretch">
                  <Separator orientation="vertical" />
                </li>

                <li>
                  <Button asChild variant="ghost">
                    <Link to="sign-up">Sign Up</Link>
                  </Button>
                </li>
              </>
            )}

            {isAuthenticated && <HeaderAccountDropdown />}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
