import { useGetJobById } from "@/api/jobs/jobs";
import JobPostSkeleton from "./JobPostSkeleton";
import JobPostView from "./JobPostView";
import { useSearchParams } from "react-router-dom";

const JobPost = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("jobId");
  const { data: job, isLoading } = useGetJobById(id);

  return (
    <>
      {isLoading && <JobPostSkeleton />}
      {job && <JobPostView job={job} />}
    </>
  );
};

export default JobPost;
