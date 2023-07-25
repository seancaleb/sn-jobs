import { z } from "zod";

export const jobSchema = z.object({
  jobId: z.string(),
  title: z.string(),
  description: z.string(),
  location: z.string(),
  applications: z.string().array(),
  createdAt: z.string(),
  employerName: z.string(),
  requirements: z.string().array(),
});

export const jobsSchema = z.object({
  total: z.number(),
  jobs: jobSchema.array(),
  limit: z.number(),
  pageNumber: z.number(),
});

export type Jobs = z.infer<typeof jobsSchema>;
export type JobDetails = z.infer<typeof jobSchema>;
