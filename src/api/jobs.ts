import apiClient from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const jobSchema = z.object({
  total: z.number(),
  jobs: z
    .object({
      jobId: z.string(),
      title: z.string(),
      description: z.string(),
      location: z.string(),
      applications: z.string().array(),
      createdAt: z.string(),
      employerName: z.string(),
    })
    .array(),
});

export type Job = z.infer<typeof jobSchema>;

/**
 * Reusable Type
 */
export type UseQueryOptions<T> = Parameters<typeof useQuery<T, Error>>["2"];

export const fetchJobs = async (): Promise<Job> => {
  await new Promise((res) => setTimeout(res, 1000));
  return await apiClient({
    options: {
      url: "/jobs",
      method: "GET",
    },
  });
};

export const QUERY_KEY = ["jobs"];

export const useGetJobs = (options: UseQueryOptions<Job>) => {
  return useQuery<Job, Error>(QUERY_KEY, fetchJobs, {
    ...options,
    select: (data) => jobSchema.parse(data),
  });
};
