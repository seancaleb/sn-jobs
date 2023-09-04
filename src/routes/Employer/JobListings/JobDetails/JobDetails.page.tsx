/* eslint-disable react-refresh/only-export-components */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User } from "lucide-react";
import { nanoid } from "@reduxjs/toolkit";
import { Badge } from "@/components/ui/badge";
import { QueryClient } from "@tanstack/react-query";
import { Link, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { fetchJobById, jobKeys, useGetJobById } from "@/api/jobs/jobs";
import { LoaderReturnType } from "@/types";
import { JobDetails as JobDetailsType } from "@/api/jobs/jobs.type";
import { parseISO } from "date-fns";
import { formatJobPostTime, getBadgeVariant } from "@/lib/utils";
import {
  employerKeys,
  fetchAllJobPostApplications,
  useGetAllJobPostApplications,
} from "@/api/employer/employer";
import { Button } from "@/components/ui/button";
import { useDocumentTitle } from "@mantine/hooks";
import store from "@/app/store";
import { JobPostApplications } from "@/api/employer/employer.type";

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const auth = store.getState().auth;

    const initialJobDataQuery = queryClient.ensureQueryData({
      queryKey: jobKeys.detail(params.jobId),
      queryFn: fetchJobById,
    });

    const initialJobPostApplicationsQuery = queryClient.ensureQueryData({
      queryKey: employerKeys.jobPostApplications(auth.userId, params.jobId as string),
      queryFn: fetchAllJobPostApplications,
    });

    const [initialJobData, initialJobPostApplications] = await Promise.all([
      initialJobDataQuery,
      initialJobPostApplicationsQuery,
    ]);

    return {
      jobId: params.jobId as string,
      initialJobData,
      initialJobPostApplications,
    };
  };

const JobDetails = () => {
  const { jobId, initialJobData, initialJobPostApplications } = useLoaderData() as LoaderReturnType<
    typeof loader
  >;
  const { data: jobData } = useGetJobById({ jobId, initialData: initialJobData });
  const { data: jobPostApplicationsData } = useGetAllJobPostApplications({
    initialData: initialJobPostApplications,
    jobId,
  });

  const job = jobData as JobDetailsType;
  const jobPostApplications = jobPostApplicationsData as JobPostApplications;
  const formattedJobDate = formatJobPostTime(parseISO(job.createdAt));

  useDocumentTitle("Job Details - SNJOBS");

  return (
    <div className="space-y-5">
      <div className="flex justify-between gap-6">
        <Button asChild variant="link">
          <Link to="/employer/job-listings">Back</Link>
        </Button>
      </div>

      <div className="flex gap-5 items-start">
        <Card className="sticky top-4 bottom-4 flex-1 break-all">
          <CardHeader>
            <div className="flex justify-between gap-x-4">
              <CardTitle className="text-2xl leading-[1.2]">{job.title}</CardTitle>
              <div className="flex-shrink-0">
                {job.applications.length !== 0 && (
                  <Badge variant="primary">
                    <User className="h-4 w-4 mr-1" />
                    {job.applications.length} applicant{job.applications.length > 1 ? "s" : ""}
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex gap-2 text-sm items-center">
              <p className="text-primary">{job.employerName}</p>
              <Separator className="h-4" orientation="vertical" />
              <p className="text-primary"> {job.location}</p>
            </div>

            <p className="text-xs">Posted {formattedJobDate}</p>

            <div className="space-y-6 pt-4">
              <Separator orientation="horizontal" />
            </div>
          </CardHeader>
          <CardContent className="overflow-y-auto text-sm">
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

        <Card className="min-w-[28rem] max-w-[28rem] break-all">
          <CardHeader>
            <CardTitle className="text-2xl leading-[1.2]">Applications</CardTitle>
            <CardDescription>List of all job applications for this job post.</CardDescription>
            <div className="space-y-6 pt-4">
              <Separator orientation="horizontal" />
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-2">
              {jobPostApplications.jobApplications.map((application) => {
                return (
                  <Link
                    to={`applications/${application.applicationId}`}
                    key={application.applicationId}
                    className="flex justify-between items-start hover:underline gap-4"
                  >
                    <div className="text-sm font-medium">
                      {application.user.firstName} {application.user.lastName}
                    </div>
                    <div className="flex-shrink-0">
                      <Badge variant={getBadgeVariant(application.status)}>
                        {application.status}
                      </Badge>
                    </div>
                  </Link>
                );
              })}

              {jobPostApplications.total === 0 ? (
                <div className="text-center text-sm h-24 grid place-items-center text-light">
                  No applications yet.
                </div>
              ) : null}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobDetails;
