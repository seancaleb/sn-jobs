/* eslint-disable react-refresh/only-export-components */
import { fetchJobById, jobKeys, useGetJobById } from "@/api/jobs/jobs";
import { ActionFunctionArgs, redirect, useLoaderData, useParams } from "react-router-dom";
import JobApplicationForm from "./JobApplicationForm";
import { fetchUserProfile, userKeys } from "@/api/users/users";
import { QueryClient } from "@tanstack/react-query";
import store from "@/app/store";
import { LoaderReturnType } from "@/types";
import { JobDetails } from "@/api/jobs/jobs.type";

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: ActionFunctionArgs) => {
    const auth = store.getState().auth;

    const initalJobDataQuery = queryClient.ensureQueryData({
      queryKey: jobKeys.detail(params.jobId),
      queryFn: fetchJobById,
    });

    const initalUserDataQuery = queryClient.ensureQueryData({
      queryKey: userKeys.profile(auth.userId),
      queryFn: fetchUserProfile,
    });

    const [initialJobData, initialUserData] = await Promise.all([
      initalJobDataQuery,
      initalUserDataQuery,
    ]);

    if (initialUserData.applications?.find((jobId) => jobId === initialJobData.jobId)) {
      return redirect(`/jobs/${initialJobData.jobId}`);
    }

    return {
      initialJobData,
    };
  };

const JobApplication = () => {
  const params = useParams<{ jobId: string }>();
  const loaderData = useLoaderData() as LoaderReturnType<typeof loader>;
  const initialData = (loaderData as { initialJobData: JobDetails }).initialJobData;
  const { data: jobData } = useGetJobById({ initialData, jobId: params.jobId });
  const job = jobData as JobDetails;

  return (
    <div className="max-w-md w-full">
      <JobApplicationForm job={job} />
    </div>
  );
};

export default JobApplication;
