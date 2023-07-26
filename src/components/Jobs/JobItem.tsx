import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSearchParams } from "react-router-dom";
import { formatJobPostTime, updateQueryParams } from "@/lib/utils";
import { JobDetails } from "@/api/jobs/jobs.type";
import { nanoid } from "@reduxjs/toolkit";

const JobItem = (job: JobDetails) => {
  const jobDatePosted = new Date(job.createdAt);
  const formattedJobDate = formatJobPostTime(jobDatePosted);
  const [searchParams, setSearchParams] = useSearchParams();
  const jobId = searchParams.get("jobId");

  const handleUpdateQueryParams = () => {
    updateQueryParams(setSearchParams, { key: "jobId", value: job.jobId });
  };

  return (
    <Card
      onClick={handleUpdateQueryParams}
      className={`cursor-pointer ${jobId === job.jobId ? "border-teal-500" : ""}`}
    >
      <CardHeader>
        {formattedJobDate === "Just now" ? (
          <div>
            <p className="text-green-700 font-medium text-xs">New</p>
          </div>
        ) : null}
        <CardTitle className="text-xl leading-[1.2]">{job.title}</CardTitle>
        <CardDescription>
          {job.employerName} &middot; {job.location}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-1 text-sm">
          {job.requirements
            .map((requirement) => (
              <div key={nanoid()} className="flex gap-2">
                <span className="text-light">&#8226;</span>
                <p>{requirement}</p>
              </div>
            ))
            .slice(0, 2)}
        </div>
      </CardContent>
      <CardFooter>
        <span className="text-light text-xs">{formattedJobDate}</span>
      </CardFooter>
    </Card>
  );
};

export default JobItem;
