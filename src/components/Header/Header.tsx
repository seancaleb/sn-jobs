import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Header = () => {
  return (
    <header className="h-16 border-b border-slate-200 w-full">
      <div className="container h-full flex items-center justify-between">
        <NavLink
          to="/"
          className="text-xl font-bold tracking-[-.5px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
        >
          SNJOBS
        </NavLink>

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
      </div>
    </header>
  );
};

export default Header;
