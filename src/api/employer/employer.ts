import apiClient, { APIResponseError, APIResponseSuccess } from "@/services/apiClient";
import {
  MutateJob,
  EmployerJobPostings,
  JobPostApplications,
  employerJobPostingsSchema,
  jobPostApplicationsSchema,
  MutateJobApplicationStatus,
} from "./employer.type";
import {
  MutationFunction,
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useAppSelector } from "@/app/hooks";
import { selectAuthStatus } from "@/features/auth/authSlice";
import { jobKeys } from "../jobs/jobs";
import { useToast } from "@/components/ui/use-toast";
import useNotification from "@/features/notification/useNotification";
import {
  disableInteractions,
  displayErrorNotification,
  displaySuccessNotification,
  removeDisableInteractions,
  responseDelay,
} from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Applications, applicationsSchema } from "./employer.type";

/**
 * @desc Keys related to employers
 */
export const employerKeys = {
  all: ["employer"] as const,
  profile: (userId: string | null) => [...employerKeys.all, userId] as const,
  jobPostings: (userId: string | null) =>
    [...employerKeys.profile(userId), "job-postings"] as const,
  jobPostApplications: (userId: string | null, jobId: string | null | undefined) =>
    [...employerKeys.profile(userId), ...jobKeys.detail(jobId), "job-applications"] as const,
  applications: (userId: string | null) =>
    [...employerKeys.profile(userId), "applications"] as const,
};

/**
 * @desc  Get all job postings
 */
export const fetchAllJobPostings = async () => {
  await responseDelay();

  const data = await apiClient({
    options: {
      url: "/employers/jobs",
      method: "GET",
    },
  });

  return employerJobPostingsSchema.parse(data);
};

export const useGetAllJobPostings = ({ initialData }: { initialData: EmployerJobPostings }) => {
  const auth = useAppSelector(selectAuthStatus);

  return useQuery({
    queryKey: employerKeys.jobPostings(auth.userId),
    queryFn: fetchAllJobPostings,
    initialData,
  });
};

/**
 * @desc  Get all job applications for a specific job post
 */
export const fetchAllJobPostApplications = async ({
  queryKey,
}: QueryFunctionContext<ReturnType<(typeof employerKeys)["jobPostApplications"]>>) => {
  const [, , , jobId] = queryKey;

  if (!jobId) return Promise.reject("Job ID needs to be provided.");

  await responseDelay();

  const data = await apiClient({
    options: {
      url: `/employers/jobs/${jobId}/applications`,
      method: "GET",
    },
  });

  return jobPostApplicationsSchema.parse(data);
};

export const useGetAllJobPostApplications = ({
  jobId,
  initialData,
}: {
  jobId: string | null | undefined;
  initialData?: JobPostApplications;
}) => {
  const auth = useAppSelector(selectAuthStatus);
  const { toast, dismiss } = useToast();
  const { notificationId, initNotificationId } = useNotification();

  return useQuery<
    JobPostApplications,
    APIResponseError,
    JobPostApplications,
    ReturnType<(typeof employerKeys)["jobPostApplications"]>
  >({
    queryKey: employerKeys.jobPostApplications(auth.userId, jobId),
    queryFn: fetchAllJobPostApplications,
    initialData,
    enabled: !!jobId,
    onError: ({ message }) => {
      if (notificationId) dismiss(notificationId);

      displayErrorNotification(message, toast, initNotificationId);
    },
  });
};

/**
 * @desc  Create a new job post
 */
export const createNewJobPost: MutationFunction<APIResponseSuccess, MutateJobVariables> = async ({
  data,
}) => {
  return await apiClient({
    options: {
      url: "/employers/jobs",
      method: "POST",
      data,
    },
  });
};

type MutateJobVariables = {
  data: MutateJob;
};

export const useCreateNewJobPost = () => {
  const { toast, dismiss } = useToast();
  const { notificationId, initNotificationId } = useNotification();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const auth = useAppSelector(selectAuthStatus);

  return useMutation<APIResponseSuccess, APIResponseError, MutateJobVariables>({
    mutationFn: createNewJobPost,
    onSuccess: async ({ message }) => {
      if (notificationId) dismiss(notificationId);

      await Promise.all([
        queryClient.prefetchQuery({
          queryKey: employerKeys.jobPostings(auth.userId),
          queryFn: fetchAllJobPostings,
        }),
      ]);

      navigate(`/employer/job-listings`);
      displaySuccessNotification(message, toast, initNotificationId);
    },
    onMutate: () => {
      disableInteractions();
    },
    onError: ({ message }) => {
      displayErrorNotification(message, toast, initNotificationId);
    },
    onSettled: () => {
      removeDisableInteractions();
    },
  });
};

/**
 * @desc  Detele job post by ID
 */
type DeleteJobPostResponse = APIResponseSuccess & { deletedJobApplications: number };
type DeleteJobPostVariables = { jobId: string };

export const deleteJobPostById: MutationFunction<
  DeleteJobPostResponse,
  DeleteJobPostVariables
> = async ({ jobId }) => {
  return await apiClient({
    options: {
      url: `/employers/jobs/${jobId}`,
      method: "DELETE",
    },
  });
};

export const useDeleteJobPostById = () => {
  const { toast, dismiss } = useToast();
  const { notificationId, initNotificationId } = useNotification();
  const queryClient = useQueryClient();
  const auth = useAppSelector(selectAuthStatus);

  return useMutation<DeleteJobPostResponse, APIResponseError, DeleteJobPostVariables>({
    mutationFn: deleteJobPostById,
    onSuccess: async ({ message }) => {
      if (notificationId) dismiss(notificationId);

      await Promise.all([
        queryClient.invalidateQueries(employerKeys.jobPostings(auth.userId)),
        queryClient.prefetchQuery({
          queryFn: fetchAllApplications,
          queryKey: employerKeys.applications(auth.userId),
        }),
      ]);

      displaySuccessNotification(message, toast, initNotificationId);
    },
    onMutate: () => {
      disableInteractions();
    },
    onError: ({ message }) => {
      displayErrorNotification(message, toast, initNotificationId);
    },
    onSettled: () => {
      removeDisableInteractions();
    },
  });
};

/**
 * @desc  Update a job post
 */
export const updateJobPostById: MutationFunction<APIResponseSuccess, UpdateJobVariables> = async ({
  data,
  jobId,
}) => {
  return await apiClient({
    options: {
      url: `/employers/jobs/${jobId}`,
      method: "PATCH",
      data,
    },
  });
};

type UpdateJobVariables = {
  data: MutateJob;
  jobId: string;
};

export const useUpdateJobPost = () => {
  const { toast, dismiss } = useToast();
  const { notificationId, initNotificationId } = useNotification();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const auth = useAppSelector(selectAuthStatus);

  return useMutation<APIResponseSuccess, APIResponseError, UpdateJobVariables>({
    mutationFn: updateJobPostById,
    onSuccess: async ({ message }, { jobId }) => {
      if (notificationId) dismiss(notificationId);

      await Promise.all([
        queryClient.invalidateQueries(jobKeys.detail(jobId)),
        queryClient.prefetchQuery({
          queryKey: employerKeys.jobPostings(auth.userId),
          queryFn: fetchAllJobPostings,
        }),
      ]);

      navigate(`/employer/job-listings/${jobId}`);
      displaySuccessNotification(message, toast, initNotificationId);
    },
    onMutate: () => {
      disableInteractions();
    },
    onError: ({ message }) => {
      displayErrorNotification(message, toast, initNotificationId);
    },
    onSettled: () => {
      removeDisableInteractions();
    },
  });
};

/**
 * @desc  Update a job application status
 */
export const updateJobApplicationStatus: MutationFunction<
  APIResponseSuccess,
  UpdateJobStatusVariables
> = async ({ data, jobId, applicationId }) => {
  await responseDelay();

  return await apiClient({
    options: {
      url: `/employers/jobs/${jobId}/applications/${applicationId}/review`,
      method: "PATCH",
      data,
    },
  });
};

type UpdateJobStatusVariables = {
  data: MutateJobApplicationStatus;
  jobId: string;
  applicationId: string;
};

export const useUpdateJobApplicationStatus = () => {
  const { toast, dismiss } = useToast();
  const { notificationId, initNotificationId } = useNotification();
  const queryClient = useQueryClient();
  const auth = useAppSelector(selectAuthStatus);

  return useMutation<APIResponseSuccess, APIResponseError, UpdateJobStatusVariables>({
    mutationFn: updateJobApplicationStatus,
    onSuccess: async ({ message }, { jobId }) => {
      if (notificationId) dismiss(notificationId);

      await Promise.all([
        queryClient.invalidateQueries(employerKeys.jobPostApplications(auth.userId, jobId)),
        queryClient.prefetchQuery({
          queryFn: fetchAllApplications,
          queryKey: employerKeys.applications(auth.userId),
        }),
      ]);

      displaySuccessNotification(message, toast, initNotificationId);
    },
    onMutate: () => {
      disableInteractions();
    },
    onError: ({ message }) => {
      displayErrorNotification(message, toast, initNotificationId);
    },
    onSettled: () => {
      removeDisableInteractions();
    },
  });
};

/**
 * @desc  Get all job applications
 */
export const fetchAllApplications = async ({
  queryKey,
}: QueryFunctionContext<ReturnType<(typeof employerKeys)["applications"]>>) => {
  const [, userId] = queryKey;

  if (!userId) return Promise.reject("Job ID needs to be provided.");

  await responseDelay();

  const data = await apiClient({
    options: {
      url: `/employers/jobs/applications`,
      method: "GET",
    },
  });

  return applicationsSchema.parse(data);
};

export const useGetAllApplications = ({ initialData }: { initialData?: Applications }) => {
  const auth = useAppSelector(selectAuthStatus);
  const { toast, dismiss } = useToast();
  const { notificationId, initNotificationId } = useNotification();

  return useQuery<
    Applications,
    APIResponseError,
    Applications,
    ReturnType<(typeof employerKeys)["applications"]>
  >({
    queryKey: employerKeys.applications(auth.userId),
    queryFn: fetchAllApplications,
    initialData,
    onError: ({ message }) => {
      if (notificationId) dismiss(notificationId);

      displayErrorNotification(message, toast, initNotificationId);
    },
  });
};
