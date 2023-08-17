/* eslint-disable react-refresh/only-export-components */
import { fetchJobById, jobKeys, useGetJobById } from "@/api/jobs/jobs";
import { JobDetails } from "@/api/jobs/jobs.type";
import { LoaderReturnType } from "@/types";
import { QueryClient } from "@tanstack/react-query";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import MutateJob from "./MutateJob";
import { useDocumentTitle } from "@mantine/hooks";

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const initialJobData = await queryClient.ensureQueryData({
      queryKey: jobKeys.detail(params.jobId),
      queryFn: fetchJobById,
    });

    return {
      jobId: params.jobId,
      initialJobData,
    };
  };

const EditJob = () => {
  const { jobId, initialJobData } = useLoaderData() as LoaderReturnType<typeof loader>;
  const { data } = useGetJobById({ jobId, initialData: initialJobData });
  const job = data as JobDetails;

  useDocumentTitle("Edit Job Details - SNJOBS");

  return (
    <div className="space-y-5 relative">
      <div className="flex justify-between gap-6">
        <div className="space-y-1">
          <div className="text-2xl font-semibold">Edit job</div>
          <p className="text-sm">Perform changes on this job post.</p>
        </div>
      </div>

      <MutateJob mode="edit" job={job} />
    </div>
  );
};

export default EditJob;
