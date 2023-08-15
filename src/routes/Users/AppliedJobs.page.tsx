/* eslint-disable react-refresh/only-export-components */
import { fetchJobApplications, useGetJobApplications } from "@/api/jobs/jobs";
import store from "@/app/store";
import { Button } from "@/components/ui/button";
import { formatJobPostTime } from "@/lib/utils";
import { LoaderReturnType } from "@/types";
import { QueryClient } from "@tanstack/react-query";
import { MoveRight } from "lucide-react";
import { Fragment } from "react";
import { Link, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { userKeys } from "@/api/users/users";
import { useDocumentTitle } from "@mantine/hooks";
import { JobApplications } from "@/api/jobs/jobs.type";
import { Separator } from "@/components/ui/separator";

export const loader = (queryClient: QueryClient) => async () => {
  const auth = store.getState().auth;

  if (!auth.isAuthenticated) return redirect("/");

  const initialJobApplicationsData = await queryClient.ensureQueryData({
    queryKey: userKeys.applications(auth.userId),
    queryFn: fetchJobApplications,
  });

  return {
    initialJobApplicationsData,
  };
};

const AppliedJobs = () => {
  const loaderData = useLoaderData() as LoaderReturnType<typeof loader>;
  const initialData = (loaderData as { initialJobApplicationsData: JobApplications })
    .initialJobApplicationsData;
  const { data } = useGetJobApplications({ initialData });
  const navigate = useNavigate();

  useDocumentTitle("Applied Jobs - SNJOBS");

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <div className="text-xl sm:text-2xl font-semibold">Applied Jobs</div>
        <p className="text-sm">Manage all your applied jobs here.</p>
      </div>

      <Separator orientation="horizontal" />

      {data.total === 0 && (
        <div className="py-8 text-center space-y-4">
          <div className="space-y-1">
            <p className="text-primary font-medium">No applied jobs yet</p>
            <p className="text-sm">Keep track of applied jobs here.</p>
          </div>
          <Button onClick={() => navigate("/jobs")}>
            Find Jobs
            <MoveRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="space-y-3">
        {data.jobApplications.map((application) => {
          const jobDatePosted = new Date(application.job.createdAt);
          const formattedJobDate = formatJobPostTime(jobDatePosted);

          return (
            <Fragment key={application.applicationId}>
              <Card className="w-full">
                <CardHeader className="flex flex-col sm:flex-row justify-between gap-6 space-y-0">
                  <div className="space-y-1.5">
                    <Link to={`/jobs/${application.job.jobId}`} className="space-y-1 flex-1 group">
                      <CardTitle className="text-lg group-hover:underline">
                        {application.job.title}
                      </CardTitle>

                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-2 text-sm items-center">
                          <p className="text-primary">{application.job.employerName}</p>
                          <Separator className="h-4" orientation="vertical" />
                          <p className="text-primary"> {application.job.location}</p>
                        </div>

                        <p className="text-xs">Posted {formattedJobDate}</p>
                      </div>
                    </Link>
                  </div>

                  <div>
                    <Badge>{application.status}</Badge>
                  </div>
                </CardHeader>
              </Card>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default AppliedJobs;
