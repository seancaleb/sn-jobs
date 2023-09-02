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

export const applicationsSchema = z.object({
  totalJobs: z.number(),
  totalApplications: z.number(),
  applications: z.array(
    jobApplicationSchema.pick({
      status: true,
      createdAt: true,
    })
  ),
  applicationStatusDistribution: z.array(
    z.object({
      name: z.enum(["Applied", "Viewed", "Rejected"]),
      value: z.number(),
    })
  ),
  applicationTrends: z.array(
    z.object({
      date: z.string(),
      applications: z.number(),
    })
  ),
  applicationTrendsGraphActive: z.boolean(),
});

export type EmployerJob = z.infer<typeof employerJobSchema>;
export type EmployerJobPostings = z.infer<typeof employerJobPostingsSchema>;
export type JobPostApplication = z.infer<typeof jobPostApplicationSchema>;
export type JobPostApplications = z.infer<typeof jobPostApplicationsSchema>;
export type MutateJob = z.infer<typeof mutateJobSchema>;
export type MutateJobApplicationStatus = z.infer<typeof mutateJobApplicationStatusSchema>;
export type Applications = z.infer<typeof applicationsSchema>;
