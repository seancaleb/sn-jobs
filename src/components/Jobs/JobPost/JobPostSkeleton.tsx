import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const JobPostSkeleton = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between gap-x-4">
          <Skeleton className="h-4 w-64" />
        </div>

        <Skeleton className="h-3 w-80" />

        <div className="space-y-6 pt-4">
          <Separator orientation="horizontal" />
        </div>
      </CardHeader>
      <CardContent className="max-h-[70vh] overflow-y-auto text-sm space-y-1.5">
        <Skeleton className="h-3 w-11/12" />
        <Skeleton className="h-3 w-4/5" />
        <Skeleton className="h-3 w-10/12" />
        <Skeleton className="h-3 w-8/12" />
      </CardContent>
    </Card>
  );
};

export default JobPostSkeleton;
