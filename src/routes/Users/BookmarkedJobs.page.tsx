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
import { GetUserProfileResponse } from "@/api/users/users.type";
import { QueryClient } from "@tanstack/react-query";
import store from "@/app/store";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { LoaderReturnType } from "@/types";
import { JobDetails } from "@/api/jobs/jobs.type";
import { useDocumentTitle } from "@mantine/hooks";

export const loader = (queryClient: QueryClient) => async () => {
  const auth = store.getState().auth;

  const bookmarkedJobsData = queryClient.ensureQueryData({
    queryKey: userKeys.bookmarks(auth.userId),
    queryFn: fetchBookmarkedJobs,
  });

  const userData = queryClient.ensureQueryData({
    queryKey: userKeys.profile(auth.userId),
    queryFn: fetchUserProfile,
  });

  const [initialData, initialUserData] = await Promise.all([bookmarkedJobsData, userData]);

  return {
    initialData,
    initialUserData,
  };
};

const BookmarkedJobs = () => {
  const { initialData, initialUserData } = useLoaderData() as LoaderReturnType<typeof loader>;
  const { data: bookmarkedJobs } = useGetBookmarkedJobs({
    initialData,
  });
  const bookmarkJobMutation = useBookmarkJobPost();
  const [unbookmarkedJobs, setUnbookmarkedJobs] = useState<Set<string>>(new Set());
  const navigate = useNavigate();
  const { data } = useGetProfile({ initialData: initialUserData });

  const user = data as GetUserProfileResponse;

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

  useDocumentTitle("Bookmarked Jobs");

  return (
    <div className="space-y-2">
      {bookmarkedJobs.total === 0 && (
        <div className="py-12 text-center space-y-4">
          <div className="space-y-1">
            <p className="text-lg tracking-tight font-bold text-primary">No bookmarks yet</p>
            <p className="text-[0.9375rem]">Keep track of bookmarked jobs here.</p>
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
                <CardHeader className="flex flex-row gap-6 space-y-0">
                  <Link to={`/jobs/${job.jobId}`} className="space-y-1.5 flex-1 group">
                    <CardTitle className="text-lg leading-[1.2] group-hover:underline">
                      {job.title}
                    </CardTitle>

                    <div className="space-y-1 text-sm">
                      <p className="text-primary text-base">
                        {job.employerName} &middot; {job.location}
                      </p>
                      <p>Posted {formattedJobDate}</p>
                    </div>
                  </Link>

                  <div className="flex gap-x-3">
                    {user.applications?.find((id) => id === job.jobId) ? (
                      <Button disabled>
                        <Send className="mr-2 h-4 w-4" /> Application Submitted
                      </Button>
                    ) : (
                      <Button onClick={() => navigate(`/jobs/${job.jobId}/apply`)}>
                        <Briefcase className="mr-2 h-4 w-4" /> Apply Now
                      </Button>
                    )}
                    <Button variant="outline" onClick={() => handleUnbookmarkJob(job.jobId)}>
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
