/* eslint-disable react-refresh/only-export-components */
import { nanoid } from "@reduxjs/toolkit";
import { useDocumentTitle } from "@mantine/hooks";
import { QueryClient } from "@tanstack/react-query";
import store from "@/app/store";
import { employerKeys, fetchAllApplications, useGetAllApplications } from "@/api/employer/employer";
import { useLoaderData } from "react-router-dom";
import { LoaderReturnType } from "@/types";
import { Applications } from "@/api/employer/employer.type";
import EmptyChartData from "./EmptyChartData";
import ApplicationStatusChart from "./ApplicationStatusChart";
import ApplicationTrendsChart from "./ApplicationTrendsChart";

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

const Dashboard = () => {
  const { initialAllApplications } = useLoaderData() as LoaderReturnType<typeof loader>;
  const { data } = useGetAllApplications({ initialData: initialAllApplications });

  const applications = data as Applications;

  useDocumentTitle("Dashboard - SNJOBS");

  return (
    <div className="h-full flex flex-col gap-5">
      <div className="space-y-1">
        <div className="text-2xl font-semibold">Dashboard</div>
        <p className="text-sm">Visualize relevant job related data.</p>
      </div>
      <DashboardOverview data={applications} />

      <div className="flex flex-1 gap-4 max-h-[32rem]">
        <div className="relative grid place-items-center border border-border rounded-md p-4 w-full pt-12">
          <div className="absolute top-4 left-4">
            <div className="text-teal-600 text-sm">Application trends in the last 30 days</div>
          </div>
          {!applications.applicationTrendsGraphActive ? (
            <EmptyChartData message="Please wait for at least 7 days to process your application trends data." />
          ) : (
            <ApplicationTrendsChart data={applications.applicationTrends} />
          )}
        </div>
        <div className="relative grid place-items-center border border-border rounded-md p-4 max-w-[40%] w-full pt-12">
          <div className="absolute top-4 left-4">
            <div className="text-teal-600 text-sm">Application status distribution</div>
          </div>
          {applications.totalApplications === 0 ? (
            <EmptyChartData message="No applications yet." />
          ) : (
            <ApplicationStatusChart data={applications.applicationStatusDistribution} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

type DashboardOverviewProps = {
  data: Applications;
};

const DashboardOverview = ({ data }: DashboardOverviewProps) => {
  const overviewData = [
    { id: nanoid(), label: "Total jobs", count: data.totalJobs },
    { id: nanoid(), label: "Total applications", count: data.totalApplications },
    {
      id: nanoid(),
      label: "Pending applications",
      count: data.applicationStatusDistribution.find((status) => status.name === "Applied")
        ?.value as number,
    },
  ];

  return (
    <div className="flex gap-5 justify-between">
      {overviewData.map(({ id, label, count }) => (
        <div key={id} className="border border-border rounded-md p-4 w-full">
          <div className="space-y-1">
            <div className="text-teal-600 text-sm">{label}</div>
            <div className="text-2xl font-semibold">{count}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
