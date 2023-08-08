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
  totalPages: z.number(),
});

export const jobApplicationSchema = z.object({
  jobId: z.string(),
  applicantId: z.string(),
  resume: z.string(),
  coverLetter: z.string(),
  status: z.enum(["applied", "application viewed", "not selected by employer"]),
  applicationId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const jobApplicationsSchema = z.object({
  total: z.number(),
  jobApplications: z
    .object({
      ...jobApplicationSchema.shape,
      job: z.object({ ...jobSchema.shape }),
    })
    .array(),
});

export type Jobs = z.infer<typeof jobsSchema>;
export type JobDetails = z.infer<typeof jobSchema>;
export type JobApplication = z.infer<typeof jobApplicationSchema>;
export type JobApplications = z.infer<typeof jobApplicationsSchema>;
