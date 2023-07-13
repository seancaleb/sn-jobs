import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Menu } from "lucide-react";
import { useMediaQuery } from "@mantine/hooks";

const Header = () => {
  const isDesktop = useMediaQuery("(min-width: 40em)");

  return (
    <header
      className="font-helvetica-cyr h-16 border-b border-slate-200 w-full"
      aria-label="navigation header"
    >
      <div className="container h-full flex items-center justify-between">
        <NavLink
          to="/"
          className="text-xl font-bold tracking-[-.5px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
        >
          SNJOBS
        </NavLink>

        {isDesktop ? (
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Button>Post a Job</Button>
              </li>
              <li>
                <Separator orientation="vertical" />
              </li>
              <li>
                <div className="flex space-x-2">
                  <Button variant="ghost">Sign In</Button>
                  <Button variant="ghost">Sign Up</Button>
                </div>
              </li>
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
