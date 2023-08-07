import { useGetJobById } from "@/api/jobs/jobs";
import JobPostSkeleton from "./JobPostSkeleton";
import JobPostView from "./JobPostView";
import { useSearchParams } from "react-router-dom";
import { useGetProfile } from "@/api/users/users";

const JobPost = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("jobId");
  const job = useGetJobById({ jobId: id });
  const user = useGetProfile();

  const isLoading = !job.isSuccess || !user.isSuccess;

  if (isLoading) {
    return <JobPostSkeleton />;
  }

  return <JobPostView job={job.data} user={user.data} />;
};

export default JobPost;
