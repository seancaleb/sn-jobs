import { useGetProfile } from "@/api/users/users";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardHeader = () => {
  const { data: user, isLoading } = useGetProfile();
  const dateToday = format(new Date(), "PP");

  return (
    <div className="h-16 flex items-center justify-between border-b border-border px-8 sticky top-0 z-10 bg-background">
      <div />

      <div className="flex flex-col gap-1 items-end">
        {isLoading ? (
          <Skeleton className="h-3 w-36" />
        ) : (
          <div className="text-sm">
            {user?.firstName} {user?.lastName} 👋🏻
          </div>
        )}
        <div className="text-xs text-slate-500">{dateToday}</div>
      </div>
    </div>
  );
};

export default DashboardHeader;
