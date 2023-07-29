import { User } from "@/api/auth/auth.type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLogoutUser } from "@/api/auth/auth";
import { Link } from "react-router-dom";

type HeaderAccountDropdownProps = {
  user: User;
};

const HeaderAccountDropdown = ({ user }: HeaderAccountDropdownProps) => {
  let role: string;
  const { mutate } = useLogoutUser();

  switch (user.role) {
    case "user":
      role = "Jobseeker";
      break;
    case "employer":
      role = "Employer";
      break;
    default:
      role = "Administrator";
      break;
  }

  const handleLogoutUser = () => {
    mutate();
  };

  const pathRoute = (path: string) => {
    return `${user.role === "user" ? "jobseekers" : user.role}/${path}`;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex space-x-1 items-center text-sm">
        <span>My Account</span> <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>
          <div className="mb-2">
            {user.firstName} {user.lastName}
          </div>
          <Badge variant="secondary">{role}</Badge>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link to={pathRoute("profile")}>
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </Link>
        {user.role === "user" && (
          <>
            <Link to={pathRoute("applied-jobs")}>
              <DropdownMenuItem>Applied Jobs</DropdownMenuItem>
            </Link>
            <Link to={pathRoute("bookmarked-jobs")}>
              <DropdownMenuItem>Bookmarked Jobs</DropdownMenuItem>
            </Link>
          </>
        )}
        {user.role === "employer" && (
          <Link to={pathRoute("job-listings")}>
            <DropdownMenuItem>My Job Listings</DropdownMenuItem>
          </Link>
        )}
        <Link to={pathRoute("privacy-and-security")}>
          <DropdownMenuItem>Privacy & Security</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogoutUser}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderAccountDropdown;
