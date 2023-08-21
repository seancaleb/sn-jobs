/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { fetchJobs, jobKeys, useGetJobs } from "@/api/jobs/jobs";
import JobList from "@/components/Jobs/JobList";
import { QueryClient } from "@tanstack/react-query";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { useDocumentTitle } from "@mantine/hooks";
import JobPost from "@/components/Jobs/JobPost/JobPost";
import SearchJob from "@/components/Jobs/SearchJob";
import { capitalize } from "@/lib/utils";
import { format } from "date-fns";
import JobsFilter from "@/components/Jobs/JobsFilter";
import { LoaderReturnType } from "@/types";
import Pagination from "@/components/Pagination";
import { useEffect } from "react";
import useRecentSearches from "@/features/recent-searches/useRecentSearches";
import RecentSearches from "@/features/recent-searches/RecentSearches";

export const loader =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);

    const queryParams = Object.fromEntries(url.searchParams.entries());

    delete queryParams["jobId"];

    const page = url.searchParams.has("page");

    if (!page) {
      Object.assign(queryParams, { page: "1" });
    }

    const keyword = url.searchParams.get("keyword");
    const location = url.searchParams.get("location");

    const initialData = await queryClient.ensureQueryData({
      queryKey: jobKeys.filters(queryParams),
      queryFn: fetchJobs,
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

const Jobs = () => {
  const { initialData, queryParams, search } = useLoaderData() as LoaderReturnType<typeof loader>;
  const { data: jobs } = useGetJobs({ queryParams, initialData });
  const { addSearchKeywordEntry } = useRecentSearches();
  const hasSearchResults = !!search.keyword || !!search.location;
  const hasFilters = !!queryParams.sortBy || !!queryParams.fromAge;
  const jobsLength = jobs.jobs.length;

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
      )} - ${formattedDate} - SNJOBS`;
    } else if (keyword) {
      return `${capitalize(keyword)} Work, Jobs - ${formattedDate} - SNJOBS`;
    } else if (location) {
      return `Work, Jobs in ${capitalize(location)} - ${formattedDate} - SNJOBS`;
    } else {
      return `Job Search - SNJOBS`;
    }
  };

  useDocumentTitle(title());

  useEffect(() => {
    if (search.keyword) {
      addSearchKeywordEntry(search.keyword);
    }
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobs, search.keyword]);

  return (
    <>
      <div className="flex flex-col items-center space-y-6 py-8 border-b border-border">
        <div className="text-3xl font-semibold text-center">Explore Job Opportunities</div>

        {/* Search a job  */}
        <SearchJob {...search} />
      </div>

      {hasSearchResults && !hasFilters && jobsLength === 0 ? (
        <div className="py-6 flex flex-col sm:flex-row gap-6">
          <div className="max-w-md w-full">
            <p>
              The search{" "}
              <span className="font-medium text-primary">
                {search.keyword ? `${search.keyword} jobs` : ""}{" "}
                {search.location ? `in ${capitalize(search.location)}` : ""}
              </span>{" "}
              did not match any jobs.
            </p>
          </div>

          {/* Recent Searches  */}
          <RecentSearches />
        </div>
      ) : (
        <>
          <div className="py-6 space-y-6">
            {(search.keyword || search.location) && (
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <p className="text-teal-600">
                    {jobs.total} job{jobs.total > 1 ? "s" : ""}
                  </p>
                  <div className="text-light text-sm">{searchResultsMsg()}</div>
                </div>

                {/* Filters  */}
                <JobsFilter />
              </div>
            )}

            {jobsLength > 0 ? (
              <div className="relative flex gap-x-6 items-start">
                {/* Job List  */}
                <div className="lg:max-w-md w-full space-y-6">
                  <JobList jobs={jobs.jobs} />
                  {jobs.totalPages !== 1 ? (
                    <Pagination total={jobs.totalPages} pageNumber={jobs.pageNumber} />
                  ) : null}
                </div>

                {/* Job Posting  */}
                <div className="w-full hidden lg:block lg:sticky lg:top-20 lg:bottom-20">
                  <JobPost />
                </div>
              </div>
            ) : null}
          </div>

          {jobsLength === 0 ? (
            <div className="py-24 flex flex-col sm:flex-row gap-6">
              <div className="max-w-md w-full mx-auto text-center">
                {hasSearchResults && hasFilters ? (
                  <p>There are no active jobs found.</p>
                ) : (
                  <p>There are no active jobs listed yet.</p>
                )}
              </div>
            </div>
          ) : null}
        </>
      )}
    </>
  );
};

export default Jobs;
