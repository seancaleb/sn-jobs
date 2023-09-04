import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Briefcase, Send } from "lucide-react";
import { nanoid } from "@reduxjs/toolkit";
import { Badge } from "@/components/ui/badge";
import { cn, formatJobPostTime } from "@/lib/utils";
import { JobDetails } from "@/api/jobs/jobs.type";
import { useAppSelector } from "@/app/hooks";
import { selectAuthStatus } from "@/features/auth/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { GetUserProfileResponse } from "@/api/users/users.type";
import { useMemo } from "react";
import BookmarkJobPost from "@/components/Jobs/BookmarkJobPost";

type JobPostViewProps = {
  job: JobDetails;
  user: GetUserProfileResponse;
  isApplicationPage?: boolean;
};

const JobPostView = ({ job, user, isApplicationPage = false }: JobPostViewProps) => {
  const jobDatePosted = new Date(job.createdAt);
  const formattedJobDate = formatJobPostTime(jobDatePosted);
  const applications = job.applications.length;
  const auth = useAppSelector(selectAuthStatus);
  const navigate = useNavigate();
  const location = useLocation();
  const isBookmarked = useMemo(
    () => user.bookmark?.find((id) => id === job.jobId),
    [job.jobId, user.bookmark]
  );

  const handleApplyNow = (jobId: string) => {
    navigate(`/jobs/${jobId}/apply`);
  };

  return (
    <Card
      key={job.jobId}
      className={cn(
        "w-full border-0 sm:border break-all overflow-y-auto h-fit",
        location.pathname === "/jobs" && "max-h-[calc(100vh-6rem)]"
      )}
    >
      <CardHeader className="p-0 sm:p-6 sticky top-0 bg-background">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-2">
          <CardTitle className="text-2xl">{job.title}</CardTitle>
          <div className="flex-shrink-0">
            {applications !== 0 && !isApplicationPage && (
              <Badge variant="primary">
                <User className="h-4 w-4 mr-1" />
                {applications} applicant{applications > 1 ? "s" : ""}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-sm items-center">
          <p className="text-primary">{job.employerName}</p>
          <Separator className="h-4" orientation="vertical" />
          <p className="text-primary"> {job.location}</p>
        </div>

        <p className="text-xs">Posted {formattedJobDate}</p>

        <div className="space-y-6 pt-4">
          {auth.role === "user" && (
            <div className="flex flex-wrap gap-3">
              {!isApplicationPage &&
                (user?.applications?.find((id) => id === job.jobId) ? (
                  <Button disabled>
                    <Send className="mr-2 h-4 w-4" /> Application submitted
                  </Button>
                ) : (
                  <Button onClick={() => handleApplyNow(job.jobId)}>
                    <Briefcase className="mr-2 h-4 w-4" /> Apply now
                  </Button>
                ))}
              <BookmarkJobPost job={job} isBookmarked={isBookmarked} />
            </div>
          )}

          <Separator orientation="horizontal" />
        </div>
      </CardHeader>
      <CardContent className="overflow-y-auto text-sm px-0 py-6 sm:px-6 sm:pt-0">
        <div className="space-y-6">
          <div className="space-y-1">
            <div className="underline font-medium">Job description</div>
            <p className="whitespace-pre-wrap">{job.description}</p>
          </div>

          <div className="space-y-1">
            <div className="underline font-medium">Requirements</div>
            {job.requirements.map((requirement) => (
              <div key={nanoid()} className="flex gap-2">
                <span className="text-light">&#8226;</span>
                <p>{requirement}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobPostView;
