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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-slate-700 flex space-x-1 items-center text-sm">
        <span>My Account</span> <ChevronDown size={16} />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>
          <div className="mb-2">
            {user.firstName} {user.lastName}
          </div>
          <Badge variant="secondary">{role}</Badge>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        {user.role === "user" && (
          <>
            <DropdownMenuItem>Applied Jobs</DropdownMenuItem>
            <DropdownMenuItem>Bookmarked Jobs</DropdownMenuItem>
          </>
        )}
        {user.role === "employer" && <DropdownMenuItem>My Job Listings</DropdownMenuItem>}
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogoutUser}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderAccountDropdown;
