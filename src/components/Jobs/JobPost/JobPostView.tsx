import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Briefcase, Bookmark, Send } from "lucide-react";
import { nanoid } from "@reduxjs/toolkit";
import { Badge } from "@/components/ui/badge";
import { formatJobPostTime } from "@/lib/utils";
import { JobDetails } from "@/api/jobs/jobs.type";
import { useBookmarkJobPost } from "@/api/jobs/jobs";
import { useAppSelector } from "@/app/hooks";
import { selectAuthStatus } from "@/features/auth/authSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { GetUserProfileResponse } from "@/api/users/users.type";

type JobPostViewProps = {
  job: JobDetails;
  user: GetUserProfileResponse;
  isApplicationPage?: boolean;
};

const JobPostView = ({ job, user, isApplicationPage = false }: JobPostViewProps) => {
  const jobDatePosted = new Date(job.createdAt);
  const formattedJobDate = formatJobPostTime(jobDatePosted);
  const applications = job.applications.length;
  const bookmarkJobMutation = useBookmarkJobPost();
  const auth = useAppSelector(selectAuthStatus);
  const [bookmarkedJobsSet, setBookmarkedJobsSet] = useState<Set<string> | null>();
  const navigate = useNavigate();

  const handleBookmarkJobPost = () => {
    bookmarkJobMutation.mutate(job);
  };

  const handleApplyNow = (jobId: string) => {
    navigate(`/jobs/${jobId}/apply`);
  };

  useEffect(() => {
    if (user) {
      setBookmarkedJobsSet(new Set(user.bookmark));
    }
  }, [user]);

  return (
    <Card className="w-full border-0 sm:border break-all">
      <CardHeader className="p-0 sm:p-6">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-2">
          <CardTitle className="text-2xl">{job.title}</CardTitle>
          <div className="flex-shrink-0">
            {applications !== 0 && (
              <Badge>
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
                    <Send className="mr-2 h-4 w-4" /> Application Submitted
                  </Button>
                ) : (
                  <Button onClick={() => handleApplyNow(job.jobId)}>
                    <Briefcase className="mr-2 h-4 w-4" /> Apply Now
                  </Button>
                ))}
              <Button variant="outline" onClick={handleBookmarkJobPost}>
                <Bookmark
                  className={`h-4 w-4 ${
                    bookmarkedJobsSet?.has(job.jobId) ? "fill-teal-500 text-teal-500 mr-2" : ""
                  }`}
                />
                {bookmarkedJobsSet?.has(job.jobId) && "Saved"}
              </Button>
            </div>
          )}

          <Separator orientation="horizontal" />
        </div>
      </CardHeader>
      <CardContent className="overflow-y-auto text-sm px-0 py-6 sm:px-6 sm:pt-0 lg:max-h-[70vh]">
        <div className="space-y-6">
          <div className="space-y-1">
            <div className="underline font-medium">Job description</div>
            <p>{job.description}</p>
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
