import { z } from "zod";
import { jobApplicationSchema, jobSchema } from "../jobs/jobs.type";
import { userSchema } from "../users/users.type";
import { defaultCities } from "@/routes/Employer/JobListings/JobDetails/MutateJob/MutateJob.schema";

export const employerJobSchema = z.object({
  ...jobSchema.shape,
  updatedAt: z.string(),
  employerId: z.string(),
});

export const employerJobPostingsSchema = z.object({
  jobs: z
    .object({
      ...employerJobSchema.shape,
    })
    .array(),
  total: z.number(),
});

export const jobPostApplicationSchema = z.object({
  ...jobApplicationSchema.shape,
  user: userSchema.pick({
    userId: true,
    firstName: true,
    lastName: true,
  }),
});

export const jobPostApplicationsSchema = z.object({
  total: z.number(),
  jobApplications: jobPostApplicationSchema.array(),
});

export const mutateJobSchema = z.object({
  title: z.string(),
  description: z.string(),
  requirements: z.array(z.string()),
  location: z.enum(defaultCities),
});

export const mutateJobApplicationStatusSchema = z.object({
  ...jobApplicationSchema.pick({
    status: true,
  }).shape,
});

export type EmployerJob = z.infer<typeof employerJobSchema>;
export type EmployerJobPostings = z.infer<typeof employerJobPostingsSchema>;
export type JobPostApplication = z.infer<typeof jobPostApplicationSchema>;
export type JobPostApplications = z.infer<typeof jobPostApplicationsSchema>;
export type MutateJob = z.infer<typeof mutateJobSchema>;
export type MutateJobApplicationStatus = z.infer<typeof mutateJobApplicationStatusSchema>;
