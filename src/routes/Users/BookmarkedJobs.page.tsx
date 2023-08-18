/* eslint-disable react-refresh/only-export-components */
import { Button } from "@/components/ui/button";
import { Bookmark, Briefcase, MoveRight, Send, X } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useBookmarkJobPost } from "@/api/jobs/jobs";
import { formatJobPostTime } from "@/lib/utils";
import {
  fetchBookmarkedJobs,
  fetchUserProfile,
  useGetBookmarkedJobs,
  useGetProfile,
  userKeys,
} from "@/api/users/users";
import { Fragment, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Undo2 } from "lucide-react";
import {
  BookmarkedJobs as BookmarkedJobsType,
  GetUserProfileResponse,
} from "@/api/users/users.type";
import { QueryClient } from "@tanstack/react-query";
import store from "@/app/store";
import { Link, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { LoaderReturnType } from "@/types";
import { JobDetails } from "@/api/jobs/jobs.type";
import { useDocumentTitle } from "@mantine/hooks";
import { Separator } from "@/components/ui/separator";

export const loader = (queryClient: QueryClient) => async () => {
  const auth = store.getState().auth;

  if (!auth.isAuthenticated) return redirect("/");

  const bookmarkedJobsData = queryClient.ensureQueryData({
    queryKey: userKeys.bookmarks(auth.userId),
    queryFn: fetchBookmarkedJobs,
  });

  const userData = queryClient.ensureQueryData({
    queryKey: userKeys.profile(auth.userId),
    queryFn: fetchUserProfile,
  });

  const [initialBookmarkedJobsData, initialUserData] = await Promise.all([
    bookmarkedJobsData,
    userData,
  ]);

  return {
    initialBookmarkedJobsData,
    initialUserData,
  };
};

const BookmarkedJobs = () => {
  const loaderData = useLoaderData() as LoaderReturnType<typeof loader>;
  const initialBookmarkedJobsData = (
    loaderData as { initialBookmarkedJobsData: BookmarkedJobsType }
  ).initialBookmarkedJobsData;
  const { data: bookmarkedJobs } = useGetBookmarkedJobs({
    initialData: initialBookmarkedJobsData,
  });

  const initialUserData = (loaderData as { initialUserData: GetUserProfileResponse })
    .initialUserData;
  const { data } = useGetProfile({ initialData: initialUserData });
  const user = data as GetUserProfileResponse;

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

  useDocumentTitle("Bookmarked Jobs - SNJOBS");

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <div className="text-xl sm:text-2xl font-semibold">Bookmarked Jobs</div>
        <p className="text-sm">Manage all your bookmarked jobs here.</p>
      </div>

      <Separator orientation="horizontal" />

      {bookmarkedJobs.total === 0 && (
        <div className="py-8 text-center space-y-4">
          <div className="space-y-1">
            <p className="text-primary font-medium">No bookmarks yet</p>
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
              <Card className="w-full break-all">
                <CardHeader className="flex flex-col sm:flex-row gap-6 space-y-0">
                  <Link to={`/jobs/${job.jobId}`} className="space-y-1 flex-1 group">
                    <CardTitle className="text-lg group-hover:underline">{job.title}</CardTitle>

                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2 text-sm items-center">
                        <p className="text-primary">{job.employerName}</p>
                        <Separator className="h-4" orientation="vertical" />
                        <p className="text-primary"> {job.location}</p>
                      </div>

                      <p className="text-xs">Posted {formattedJobDate}</p>
                    </div>
                  </Link>

                  <div className="flex flex-wrap gap-3">
                    {user?.applications?.find((id) => id === job.jobId) ? (
                      <Button className="flex-1" disabled>
                        <Send className="mr-2 h-4 w-4" /> Application Submitted
                      </Button>
                    ) : (
                      <Button
                        className="flex-1"
                        onClick={() => navigate(`/jobs/${job.jobId}/apply`)}
                      >
                        <Briefcase className="mr-2 h-4 w-4" /> Apply Now
                      </Button>
                    )}
                    <Button
                      className="flex-1"
                      variant="outline"
                      onClick={() => handleUnbookmarkJob(job.jobId)}
                    >
                      <Bookmark className="h-4 w-4 fill-teal-500 text-teal-500 mr-2" />
                      Saved
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            )}

            {unbookmarkedJobs.has(job.jobId) && (
              <Alert className="border-teal-500">
                <span
                  role="button"
                  className={`absolute right-4 text-foreground/50 hover:text-foreground ${
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
