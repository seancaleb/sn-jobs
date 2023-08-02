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
import { useAppSelector } from "@/app/hooks";
import { selectAuthStatus } from "@/features/auth/authSlice";
import { useGetProfile, userKeys } from "@/api/users/users";
import { Skeleton } from "@/components/ui/skeleton";
import { capitalize } from "@/lib/utils";

const HeaderAccountDropdown = () => {
  const { mutate } = useLogoutUser();
  const auth = useAppSelector(selectAuthStatus);
  const { data: user, isSuccess } = useGetProfile({ queryKey: userKeys.profile(auth.userId) });

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
        <span>My Account</span> <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>
          {!isSuccess ? (
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

        {auth.role === "user" && (
          <>
            <Link to={pathRoute("applied-jobs")}>
              <DropdownMenuItem>Applied Jobs</DropdownMenuItem>
            </Link>
            <Link to={pathRoute("bookmarked-jobs")}>
              <DropdownMenuItem>Bookmarked Jobs</DropdownMenuItem>
            </Link>
          </>
        )}
        {auth.role === "employer" && (
          <Link to={pathRoute("job-listings")}>
            <DropdownMenuItem>My Job Listings</DropdownMenuItem>
          </Link>
        )}

        <Link to={pathRoute("account/profile")}>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogoutUser}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderAccountDropdown;
