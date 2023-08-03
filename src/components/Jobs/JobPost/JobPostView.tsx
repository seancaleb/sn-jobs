import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Briefcase, Bookmark } from "lucide-react";
import { nanoid } from "@reduxjs/toolkit";
import { Badge } from "@/components/ui/badge";
import { formatJobPostTime } from "@/lib/utils";
import { JobDetails } from "@/api/jobs/jobs.type";
import { useBookmarkJobPost } from "@/api/jobs/jobs";
import { useGetProfile, userKeys } from "@/api/users/users";
import { useAppSelector } from "@/app/hooks";
import { selectAuthStatus } from "@/features/auth/authSlice";
import { useEffect, useState } from "react";

type JobPostViewProps = {
  job: JobDetails;
};

const JobPostView = ({ job }: JobPostViewProps) => {
  const jobDatePosted = new Date(job.createdAt);
  const formattedJobDate = formatJobPostTime(jobDatePosted);
  const applications = job.applications.length;

  const bookmarkJobMutation = useBookmarkJobPost();
  const auth = useAppSelector(selectAuthStatus);
  const user = useGetProfile({ queryKey: userKeys.profile(auth.userId) });
  const [bookmarkedJobsSet, setBookmarkedJobsSet] = useState<Set<string> | null>();

  const handleBookmarkJobPost = () => {
    bookmarkJobMutation.mutate(job.jobId);
  };

  useEffect(() => {
    if (user.isSuccess) {
      setBookmarkedJobsSet(new Set(user.data.bookmark));
    }
  }, [user.isSuccess, user.data]);

  return (
    <Card className="sticky top-4 bottom-4 w-full">
      <CardHeader>
        <div className="flex justify-between gap-x-4">
          <CardTitle className="text-2xl leading-[1.2]">{job.title}</CardTitle>
          {applications !== 0 && (
            <Badge className="bg-teal-50 text-teal-950 hover:bg-teal-100 transition duration-300">
              {applications} applicant{applications > 1 ? "s" : ""}
            </Badge>
          )}
        </div>

        <CardDescription>
          {job.employerName} &middot; {job.location} &middot; {formattedJobDate}
        </CardDescription>

        <div className="space-y-6 pt-4">
          {auth.role === "user" && (
            <div className="flex gap-x-3">
              <Button>
                <Briefcase className="mr-2 h-4 w-4" /> Apply Now
              </Button>
              <Button variant="outline" size="icon" onClick={handleBookmarkJobPost}>
                <Bookmark
                  className={`h-4 w-4 ${
                    bookmarkedJobsSet?.has(job.jobId) ? "fill-teal-500 text-teal-500" : ""
                  }`}
                />
              </Button>
            </div>
          )}

          <Separator orientation="horizontal" />
        </div>
      </CardHeader>
      <CardContent className="max-h-[70vh] overflow-y-auto text-sm">
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
