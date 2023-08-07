import { Jobs } from "@/api/jobs/jobs.type";
import JobItem from "./JobItem";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { updateQueryParams } from "@/lib/utils";

type JobListProps = {
  jobs: Jobs["jobs"];
};

const JobList = ({ jobs }: JobListProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const location = searchParams.get("location");

  if (!searchParams.get("jobId")) {
    updateQueryParams(setSearchParams, { key: "jobId", value: jobs[0].jobId });
  }

  useEffect(() => {
    if (jobs[0]) {
      updateQueryParams(setSearchParams, { key: "jobId", value: jobs[0].jobId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobs, keyword, location]);

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <div key={job.jobId} className="col-span-12 md:col-span-6 lg:col-span-4">
          <JobItem {...job} />
        </div>
      ))}
    </div>
  );
};

export default JobList;
