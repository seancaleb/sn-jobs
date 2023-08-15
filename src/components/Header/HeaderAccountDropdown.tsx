import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bookmark, Briefcase, ChevronDown, LogOut, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLogoutUser } from "@/api/auth/auth";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import { selectAuthStatus } from "@/features/auth/authSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { capitalize } from "@/lib/utils";
import { useMediaQuery } from "@mantine/hooks";
import { useUserProfile } from "@/hooks";

const HeaderAccountDropdown = () => {
  const { mutate } = useLogoutUser();
  const auth = useAppSelector(selectAuthStatus);
  const isDesktop = useMediaQuery("(min-width: 64rem)");
  const user = useUserProfile();

  const handleLogoutUser = () => {
    mutate();
  };

  const pathRoute = (path: string) => {
    const rolePath = auth.role === "user" ? "jobseekers" : auth.role;
    return `${rolePath as string}/${path}`;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex space-x-1 items-center text-sm">
        <span>My Account</span> <ChevronDown className="h-4 w-4 ml-2" />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>
          {!user ? (
            <>
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-4 w-14" />
            </>
          ) : (
            <>
              <div className="mb-2">
                {user.firstName} {user.lastName}
              </div>

              <Badge variant="secondary">
                {capitalize(user.role === "user" ? "jobseeker" : user.role)}
              </Badge>
            </>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {isDesktop ? (
          <>
            {auth.role === "user" && (
              <>
                <Link to={pathRoute("applied-jobs")}>
                  <DropdownMenuItem>
                    <Briefcase className="h-4 w-4 mr-2" />
                    Applied Jobs
                  </DropdownMenuItem>
                </Link>
                <Link to={pathRoute("bookmarked-jobs")}>
                  <DropdownMenuItem>
                    <Bookmark className="h-4 w-4 mr-2" />
                    Bookmarked Jobs
                  </DropdownMenuItem>
                </Link>
              </>
            )}
            <Link to={pathRoute("account/profile")}>
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuItem>
            </Link>
          </>
        ) : null}

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogoutUser}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderAccountDropdown;
