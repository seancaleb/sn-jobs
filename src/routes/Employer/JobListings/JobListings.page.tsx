/* eslint-disable react-refresh/only-export-components */
import { columns } from "./table/JobListingsColumn";
import { QueryClient } from "@tanstack/react-query";
import store from "@/app/store";
import { employerKeys, fetchAllJobPostings, useGetAllJobPostings } from "@/api/employer/employer";
import { Link, useLoaderData } from "react-router-dom";
import { LoaderReturnType } from "@/types";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useDocumentTitle } from "@mantine/hooks";
import JobListingsTable from "./table/JobListingsTable";

export const loader = (queryClient: QueryClient) => async () => {
  const auth = store.getState().auth;

  const initialJobPostingsData = await queryClient.ensureQueryData({
    queryKey: employerKeys.jobPostings(auth.userId),
    queryFn: fetchAllJobPostings,
  });

  return {
    initialJobPostingsData,
  };
};

const JobListings = () => {
  const { initialJobPostingsData } = useLoaderData() as LoaderReturnType<typeof loader>;
  const { data: jobPostings } = useGetAllJobPostings({ initialData: initialJobPostingsData });

  useDocumentTitle("Job Listings - SNJOBS");

  return (
    <div className="space-y-5">
      <div className="flex justify-between gap-6">
        <div className="space-y-1">
          <div className="text-2xl font-semibold">Job listings</div>
          <p className="text-sm">Manage all the jobs you created.</p>
        </div>

        <Button asChild>
          <Link to="create">
            <Plus className="h-4 w-4 mr-2" /> New Job
          </Link>
        </Button>
      </div>

      <JobListingsTable columns={columns} data={jobPostings.jobs} />
    </div>
  );
};

export default JobListings;
