/* eslint-disable react-refresh/only-export-components */
import { Button } from "@/components/ui/button";
import { Bookmark, Briefcase, MoveRight, X } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useBookmarkJobPost } from "@/api/jobs/jobs";
import { formatJobPostTime } from "@/lib/utils";
import { fetchBookmarkedJobs, useGetBookmarkedJobs, userKeys } from "@/api/users/users";
import { useAppSelector } from "@/app/hooks";
import { selectAuthStatus } from "@/features/auth/authSlice";
import { Fragment, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Undo2 } from "lucide-react";
import { type BookmarkedJobs } from "@/api/users/users.type";
import { QueryClient } from "@tanstack/react-query";
import store from "@/app/store";
import { useLoaderData, useNavigate } from "react-router-dom";
import { LoaderReturnType } from "@/types";
import { JobDetails } from "@/api/jobs/jobs.type";

export const loader = (queryClient: QueryClient) => async () => {
  const auth = store.getState().auth;

  const initialData = await queryClient.ensureQueryData({
    queryKey: userKeys.bookmark(auth.userId),
    queryFn: fetchBookmarkedJobs,
  });

  return {
    initialData,
  };
};

const BookmarkedJobs = () => {
  const { initialData } = useLoaderData() as LoaderReturnType<typeof loader>;
  const auth = useAppSelector(selectAuthStatus);
  const { data: bookmarkedJobs } = useGetBookmarkedJobs({
    queryKey: userKeys.bookmark(auth.userId),
    initialData,
  });
  const bookmarkJobMutation = useBookmarkJobPost();
  const [unbookmarkedJobs, setUnbookmarkedJobs] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  const handleUnbookmarkJob = (jobId: string) => {
    setUnbookmarkedJobs((prev) => {
      const updatedBookmarkSet = new Set(prev);

      if (updatedBookmarkSet.has(jobId)) {
        updatedBookmarkSet.delete(jobId);
      } else {
        updatedBookmarkSet.add(jobId);

        return updatedBookmarkSet;
      }
      return updatedBookmarkSet;
    });
  };

  const handleMutateUnbookmarkJob = (job: JobDetails) => {
    bookmarkJobMutation.mutate(job, {
      onSuccess: () =>
        setUnbookmarkedJobs((prev) => {
          const updatedSet = new Set(prev);
          updatedSet.delete(job.jobId);
          return updatedSet;
        }),
    });
  };

  return (
    <div className="space-y-2">
      {bookmarkedJobs.total === 0 && (
        <div className="py-12 text-center space-y-4">
          <div className="space-y-1">
            <p className="font-medium text-primary">No bookmarks yet</p>
            <p className="text-sm">Keep track of bookmarked jobs here.</p>
          </div>
          <Button onClick={() => navigate("/jobs")}>
            Find Jobs
            <MoveRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}

      {bookmarkedJobs.bookmarkedJobs.map((job) => {
        const jobDatePosted = new Date(job.createdAt);
        const formattedJobDate = formatJobPostTime(jobDatePosted);

        return (
          <Fragment key={job.jobId}>
            {!unbookmarkedJobs.has(job.jobId) && (
              <Card className="w-full">
                <CardHeader className="flex flex-row justify-between gap-6 space-y-0">
                  <div className="space-y-1.5">
                    <CardTitle className="text-lg leading-[1.2]">{job.title}</CardTitle>

                    <div className="space-y-1 text-sm">
                      <p className="text-primary text-base">
                        {job.employerName} &middot; {job.location}
                      </p>
                      <p>Posted {formattedJobDate}</p>
                    </div>
                  </div>

                  <div className="flex gap-x-3">
                    <Button>
                      <Briefcase className="mr-2 h-4 w-4" /> Apply Now
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleUnbookmarkJob(job.jobId)}
                    >
                      <Bookmark className="h-4 w-4 fill-teal-500 text-teal-500" />
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            )}

            {unbookmarkedJobs.has(job.jobId) && (
              <Alert className="border-teal-500">
                <span
                  role="button"
                  className={`absolute right-4 ${
                    bookmarkJobMutation.isLoading ? "disable-interactions" : ""
                  }`}
                  onClick={() => handleMutateUnbookmarkJob(job)}
                >
                  <X className="h-4 w-4" />
                </span>
                <Undo2 className="h-4 w-4" />
                <AlertTitle>{job.title}</AlertTitle>
                <AlertDescription className="text-light">
                  This job has been unbookmarked.{" "}
                  <span
                    role="button"
                    tabIndex={0}
                    className="font-medium text-teal-600 transition duration-300 hover:text-teal-700"
                    onClick={() => handleUnbookmarkJob(job.jobId)}
                  >
                    Undo
                  </span>
                </AlertDescription>
              </Alert>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default BookmarkedJobs;
