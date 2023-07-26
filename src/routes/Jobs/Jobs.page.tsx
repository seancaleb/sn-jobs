/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { QUERY_KEY, fetchJobs, useGetJobs } from "@/api/jobs/jobs";
import JobList from "@/components/Jobs/JobList";
import { QueryClient } from "@tanstack/react-query";
import { ActionFunctionArgs, useLoaderData } from "react-router-dom";
import { useDocumentTitle, useMediaQuery } from "@mantine/hooks";
import JobPost from "@/components/Jobs/JobPost/JobPost";
import SearchJob from "@/components/Jobs/SearchJob";
import { capitalize } from "@/lib/utils";
import { format } from "date-fns";
import { Jobs } from "@/api/jobs/jobs.type";
import JobsFilter from "@/components/Jobs/JobsFilter";
import { LoaderReturnType } from "@/types";
import Pagination from "@/components/Pagination";

export const loader =
  (queryClient: QueryClient) =>
  async ({ request }: ActionFunctionArgs) => {
    const url = new URL(request.url);

    const queryParams = Object.fromEntries(url.searchParams.entries());

    delete queryParams["jobId"];

    const page = url.searchParams.has("page");

    if (!page) {
      Object.assign(queryParams, { page: "1" });
    }

    const QUERY_KEY_PARAMS = Object.entries(queryParams).map(([key, value]) => `${key}=${value}`);

    const keyword = url.searchParams.get("keyword");
    const location = url.searchParams.get("location");

    const queryKey = [...QUERY_KEY, ...QUERY_KEY_PARAMS];

    const initialData = await queryClient.ensureQueryData({
      queryKey,
      queryFn: () => fetchJobs(queryParams),
    });

    return {
      initialData,
      queryParams,
      search: {
        keyword,
        location,
      },
    };
  };

const JobsPage = () => {
  const { initialData, queryParams, search } = useLoaderData() as LoaderReturnType<typeof loader>;
  const { data } = useGetJobs(queryParams, { initialData });
  const isDesktop = useMediaQuery("(min-width: 40em)");

  const jobs = data as Jobs;

  const searchResultsMsg = () => {
    const { keyword, location } = search;
    let message;

    if (keyword && location) {
      message = `'${keyword}' jobs in ${capitalize(location)}`;
    } else if (keyword) {
      message = `'${keyword}' jobs`;
    } else if (location) {
      message = `jobs in ${capitalize(location)} `;
    }

    return message;
  };

  const title = () => {
    const { keyword, location } = search;
    const today = Date.now();
    const formattedDate = format(today, "d MMMM, yyyy");

    if (keyword && location) {
      return `${capitalize(keyword)} Work, Jobs in ${capitalize(
        location
      )} - ${formattedDate} | SNJOBS`;
    } else if (keyword) {
      return `${capitalize(keyword)} Work, Jobs - ${formattedDate} | SNJOBS`;
    } else if (location) {
      return `Work, Jobs in ${capitalize(location)} - ${formattedDate} | SNJOBS`;
    } else {
      return `Job Search | SNJOBS`;
    }
  };

  useDocumentTitle(title());

  return (
    <>
      <div className="flex flex-col items-center space-y-6 py-12 border-b border-slate-200">
        <div className="text-3xl tracking-tight font-bold text-center">
          Explore Job Opportunities
        </div>

        {/* Search a job  */}
        <SearchJob {...search} />
      </div>

      {jobs.jobs.length > 0 ? (
        <div className="py-6 space-y-6">
          {(search.keyword || search.location) && (
            <div className="flex justify-between gap-4">
              <div>
                <p className="text-teal-600">
                  {jobs.total} job{jobs.total > 1 ? "s" : ""}
                </p>
                <div className="text-light text-sm">{searchResultsMsg()}</div>
              </div>

              {/* Filters  */}
              <JobsFilter fromAge={queryParams.fromAge} />
            </div>
          )}

          <div className="relative flex gap-x-6 items-start">
            {/* Job List  */}
            <div className="max-w-md w-full space-y-6">
              <JobList jobs={jobs.jobs} />
              {jobs.totalPages !== 1 ? (
                <Pagination total={jobs.totalPages} pageNumber={jobs.pageNumber} />
              ) : null}
            </div>

            {/* Job Posting  */}
            {isDesktop && <JobPost />}
          </div>
        </div>
      ) : (
        <div className="py-6 flex flex-col sm:flex-row gap-6">
          <div className="max-w-md w-full">
            <p>
              The search{" "}
              <span className="font-bold text-primary">
                {search.keyword ? `${search.keyword} jobs` : ""}{" "}
                {search.location ? `in ${capitalize(search.location)}` : ""}
              </span>{" "}
              did not match any jobs.
            </p>
          </div>

          {/* Recent Searches  */}
          <div className="rounded-md border border-slate-200 p-6 sm:max-w-sm w-full">
            <p>Recent searches</p>
          </div>
        </div>
      )}
    </>
  );
};

export default JobsPage;
