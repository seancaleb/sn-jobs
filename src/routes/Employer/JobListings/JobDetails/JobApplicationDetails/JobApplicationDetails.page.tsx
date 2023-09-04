/* eslint-disable react-refresh/only-export-components */
import {
  employerKeys,
  fetchAllJobPostApplications,
  useGetAllJobPostApplications,
} from "@/api/employer/employer";
import store from "@/app/store";
import { Button } from "@/components/ui/button";
import { LoaderReturnType } from "@/types";
import { QueryClient } from "@tanstack/react-query";
import { Link, LoaderFunctionArgs, Navigate, useLoaderData } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JobPostApplications } from "@/api/employer/employer.type";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import MutateJobApplicationStatus from "./MutateJobApplicationStatus";
import { useState } from "react";
import { Pencil } from "lucide-react";
import { useDocumentTitle } from "@mantine/hooks";

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const auth = store.getState().auth;

    const initialJobPostApplicationsData = await queryClient.ensureQueryData({
      queryKey: employerKeys.jobPostApplications(auth.userId, params.jobId),
      queryFn: fetchAllJobPostApplications,
    });

    return {
      jobId: params.jobId as string,
      applicationId: params.applicationId as string,
      initialJobPostApplicationsData,
    };
  };

const JobApplicationDetails = () => {
  const { jobId, applicationId, initialJobPostApplicationsData } =
    useLoaderData() as LoaderReturnType<typeof loader>;
  const { data } = useGetAllJobPostApplications({
    initialData: initialJobPostApplicationsData,
    jobId,
  });
  const [isEditMode, setIsEditMode] = useState(false);

  const jobApplications = data as JobPostApplications;
  const application = jobApplications.jobApplications.find(
    (jobPost) => jobPost.applicationId === applicationId
  );

  const handleSetIsEditMode = (value: boolean) => {
    setIsEditMode(value);
  };

  useDocumentTitle("Applicant Details - SNJOBS");

  if (!application) {
    return <Navigate to={`/employer/job-listings/${jobId}`} replace />;
  }

  return (
    <div className="space-y-5 relative">
      <div className="flex justify-between gap-6">
        <Button asChild variant="link">
          <Link to={`/employer/job-listings/${jobId}`}>Back</Link>
        </Button>

        {!isEditMode ? (
          <Button type="button" onClick={() => handleSetIsEditMode(true)}>
            <Pencil className="h-4 w-4 mr-2" />
            Update application
          </Button>
        ) : null}
      </div>

      <div className="flex gap-5 items-start">
        <Card className="flex-1">
          <CardHeader>
            <div className="flex justify-between gap-x-4">
              <div className="space-y-1">
                <CardTitle className="text-2xl leading-[1.2]">
                  {application.user.firstName} {application.user.lastName}
                </CardTitle>
                <p className="text-sm">#{application.applicationId}</p>
              </div>

              <MutateJobApplicationStatus
                isEditMode={isEditMode}
                setIsEditMode={handleSetIsEditMode}
                applicationStatus={application.status}
                jobId={jobId}
                applicationId={application.applicationId}
              />
            </div>

            <div className="space-y-6 pt-4">
              <Separator orientation="horizontal" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col gap-1 items-start text-sm">
              <Label className="underline">Resume link</Label>
              <Link
                to={`${application.resume}`}
                className="text-light hover:underline"
                target="_blank"
              >
                {application.resume}
              </Link>
            </div>

            <div className="flex flex-col gap-1 items-start text-sm">
              <Label className="underline">Cover letter</Label>
              <div className="p-6 text-light whitespace-pre-line">{application.coverLetter}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobApplicationDetails;
