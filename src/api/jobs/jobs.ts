import apiClient from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";
import { Jobs, JobDetails, jobSchema, jobsSchema } from "./jobs.type";
import { UseQueryOptions } from "@/types";

export const fetchJobs = async (params: Record<string, string>): Promise<Jobs> => {
  await new Promise((res) => setTimeout(res, 1000));
  return await apiClient({
    options: {
      url: "/jobs",
      method: "GET",
      params,
    },
  });
};

export const QUERY_KEY = ["jobs"];

export const useGetJobs = (params: Record<string, string>, options: UseQueryOptions<Jobs>) => {
  const QUERY_KEY_PARAMS = Object.entries(params).map(([key, value]) => `${key}=${value}`);

  return useQuery<Jobs, Error>([...QUERY_KEY, ...QUERY_KEY_PARAMS], () => fetchJobs(params), {
    ...options,
    select: (data) => jobsSchema.parse(data),
  });
};

export const fetchJobById = async (jobId: string | null): Promise<JobDetails> => {
  if (!jobId) {
    throw new Error("Invalid id");
  }

  await new Promise((res) => setTimeout(res, 1000));

  return await apiClient({
    options: {
      url: `/job/${jobId}`,
      method: "GET",
    },
  });
};

export const useGetJobById = (jobId: string | null) => {
  return useQuery<JobDetails, Error>(["job", jobId], () => fetchJobById(jobId), {
    enabled: !!jobId,
    select: (data) => jobSchema.parse(data),
    keepPreviousData: !jobId,
  });
};
