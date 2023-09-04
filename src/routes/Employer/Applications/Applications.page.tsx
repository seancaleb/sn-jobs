/* eslint-disable react-refresh/only-export-components */
import { useLoaderData } from "react-router-dom";
import { LoaderReturnType } from "@/types";
import { useDocumentTitle } from "@mantine/hooks";
import store from "@/app/store";
import { QueryClient } from "@tanstack/react-query";
import { Applications } from "@/api/employer/employer.type";
import { employerKeys, fetchAllApplications, useGetAllApplications } from "@/api/employer/employer";
import { columns } from "./table/ApplicationsColumn";
import ApplicationsTable from "./table/ApplicationsTable";

export const loader = (queryClient: QueryClient) => async () => {
  const auth = store.getState().auth;

  const initialAllApplications = await queryClient.ensureQueryData({
    queryKey: employerKeys.applications(auth.userId),
    queryFn: fetchAllApplications,
  });

  return {
    initialAllApplications,
  };
};

const ApplicationsPage = () => {
  const { initialAllApplications } = useLoaderData() as LoaderReturnType<typeof loader>;
  const { data } = useGetAllApplications({ initialData: initialAllApplications });

  const jobApplications = data as Applications;

  const { applications } = jobApplications;

  useDocumentTitle("Applications - SNJOBS");

  console.log(data, columns);

  return (
    <div className="space-y-5">
      <div className="flex justify-between gap-6">
        <div className="space-y-1">
          <div className="text-2xl font-semibold">Applications</div>
          <p className="text-sm">Review and manage job applications.</p>
        </div>
      </div>

      <ApplicationsTable data={applications} columns={columns} />
    </div>
  );
};

export default ApplicationsPage;
