import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchParams } from "react-router-dom";
import { formatJobPostTime, updateQueryParams } from "@/lib/utils";
import { JobDetails } from "@/api/jobs/jobs.type";
import { nanoid } from "@reduxjs/toolkit";
import { Separator } from "@/components/ui/separator";
import { useMediaQuery } from "@mantine/hooks";

const JobItem = (job: JobDetails) => {
  const jobDatePosted = new Date(job.createdAt);
  const formattedJobDate = formatJobPostTime(jobDatePosted);
  const [searchParams, setSearchParams] = useSearchParams();
  const jobId = searchParams.get("jobId");
  const isDesktop = useMediaQuery("(min-width: 64rem)");

  const handleOnClickJobPost = () => {
    if (isDesktop) updateQueryParams(setSearchParams, { key: "jobId", value: job.jobId });
    else {
      updateQueryParams(setSearchParams, { key: "jobId", value: job.jobId });
      window.open(`/jobs/${job.jobId}`);
    }
  };

  return (
    <Card
      onClick={handleOnClickJobPost}
      className={`cursor-pointer break-all ${jobId === job.jobId ? "border-teal-600" : ""}`}
    >
      <CardHeader>
        {formattedJobDate === "just now" ? (
          <div>
            <p className="text-green-500 text-xs">New</p>
          </div>
        ) : null}
        <CardTitle className="text-xl">{job.title}</CardTitle>

        <div className="flex flex-wrap gap-2 text-sm items-center">
          <p className="text-primary">{job.employerName}</p>
          <Separator className="h-4" orientation="vertical" />
          <p className="text-primary"> {job.location}</p>
        </div>
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
        <p className="text-xs">Posted {formattedJobDate}</p>
      </CardFooter>
    </Card>
  );
};

export default JobItem;
