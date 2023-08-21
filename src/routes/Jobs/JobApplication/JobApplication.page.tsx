/* eslint-disable react-refresh/only-export-components */
import { fetchJobById, jobKeys } from "@/api/jobs/jobs";
import { ActionFunctionArgs, redirect } from "react-router-dom";
import JobApplicationForm from "./JobApplicationForm";
import { fetchUserProfile, userKeys } from "@/api/users/users";
import { QueryClient } from "@tanstack/react-query";
import store from "@/app/store";

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

    return null;
  };

const JobApplication = () => {
  return (
    <div className="w-full mb-4 sm:mb-0 lg:max-w-md">
      <JobApplicationForm />
    </div>
  );
};

export default JobApplication;
