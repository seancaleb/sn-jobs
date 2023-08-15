/* eslint-disable react-refresh/only-export-components */
import { fetchJobById, jobKeys, useGetJobById } from "@/api/jobs/jobs";
import { JobDetails } from "@/api/jobs/jobs.type";
import { fetchUserProfile, useGetProfile, userKeys } from "@/api/users/users";
import { GetUserProfileResponse } from "@/api/users/users.type";
import store from "@/app/store";
import JobPostView from "@/components/Jobs/JobPost/JobPostView";
import { LoaderReturnType } from "@/types";
import { useDocumentTitle } from "@mantine/hooks";
import { QueryClient } from "@tanstack/react-query";
import {
  ActionFunctionArgs,
  Outlet,
  useLoaderData,
  useLocation,
  useParams,
} from "react-router-dom";

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

    return {
      initialJobData,
      initialUserData,
    };
  };

const Job = () => {
  const params = useParams<{ jobId: string }>();
  const { initialJobData, initialUserData } = useLoaderData() as LoaderReturnType<typeof loader>;
  const { data: jobData } = useGetJobById({ initialData: initialJobData, jobId: params.jobId });
  const { data: userData } = useGetProfile({ initialData: initialUserData });
  const location = useLocation();
  const isApplicationPage = location.pathname.includes("apply");

  const job = jobData as JobDetails;
  const user = userData as GetUserProfileResponse;

  useDocumentTitle(
    `${isApplicationPage ? "Application | " : ""}${job.title} - ${job.location} - SNJOBS`
  );

  return (
    <div className="py-8 space-y-6">
      <div className="flex flex-col lg:flex-row gap-6 lg:items-start">
        <Outlet />

        <JobPostView job={job} user={user} isApplicationPage={isApplicationPage} />
      </div>
    </div>
  );
};

export default Job;
