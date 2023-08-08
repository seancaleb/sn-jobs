import apiClient, { APIResponseError, APIResponseSuccess } from "@/services/apiClient";
import {
  MutationFunction,
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  Jobs,
  JobDetails,
  jobSchema,
  jobsSchema,
  jobApplicationsSchema,
  JobApplications,
} from "./jobs.type";
import useNotification from "@/features/notification/useNotification";
import { useAppSelector } from "@/app/hooks";
import { useToast } from "@/components/ui/use-toast";
import { selectNotification } from "@/features/notification/notificationSlice";
import {
  disableInteractions,
  displayErrorNotification,
  displaySuccessNotification,
  removeDisableInteractions,
} from "@/lib/utils";
import { selectAuthStatus } from "@/features/auth/authSlice";
import { userKeys } from "../users/users";
import { BookmarkedJobs, GetUserProfileResponse } from "../users/users.type";
import { JobApplicationValues as JobApplicationData } from "@/routes/Jobs/JobApplication/JobApplicationForm.schema";
import { useNavigate, useSearchParams } from "react-router-dom";

/**
 * @desc Keys related to users
 */
export const jobKeys = {
  all: ["jobs"] as const,
  detail: (jobId: string | null | undefined) => [...jobKeys.all, jobId] as const,
  filters: (filters: Record<string, string>) => [...jobKeys.all, filters] as const,
};

/**
 * @desc  Get all jobs
 */
export const fetchJobs = async ({
  queryKey,
}: QueryFunctionContext<ReturnType<(typeof jobKeys)["filters"]>>) => {
  const [, filters] = queryKey;

  await new Promise((res) => setTimeout(res, 1000));

  const data = await apiClient({
    options: {
      url: "/jobs",
      method: "GET",
      params: filters,
    },
  });

  return jobsSchema.parse(data);
};

export const useGetJobs = ({
  queryParams,
  initialData,
}: {
  queryParams: Record<string, string>;
  initialData: Jobs;
}) => {
  return useQuery({
    queryKey: jobKeys.filters(queryParams),
    queryFn: fetchJobs,
    initialData,
  });
};

/**
 * @desc  Get job by id
 */
export const fetchJobById = async ({
  queryKey,
}: QueryFunctionContext<ReturnType<(typeof jobKeys)["detail"]>>) => {
  const [, jobId] = queryKey;

  if (!jobId) return Promise.reject("Job ID needs to be provided.");

  await new Promise((res) => setTimeout(res, 1000));

  const data = await apiClient({
    options: {
      url: `/job/${jobId}`,
      method: "GET",
    },
  });

  return jobSchema.parse(data);
};

export const useGetJobById = ({
  jobId,
  initialData,
}: {
  jobId: string | null | undefined;
  initialData?: JobDetails;
}) => {
  const { toast, dismiss } = useToast();
  const { id: notificationId } = useAppSelector(selectNotification);
  const { initNotificationId } = useNotification();
  const [searchParams] = useSearchParams();

  return useQuery<JobDetails, APIResponseError, JobDetails, ReturnType<(typeof jobKeys)["detail"]>>(
    {
      queryKey: jobKeys.detail(jobId),
      queryFn: fetchJobById,
      initialData,
      keepPreviousData: !searchParams.get("jobId"),
      enabled: !!jobId,
      onError: ({ message }) => {
        if (notificationId) dismiss(notificationId);

        displayErrorNotification(message, toast, initNotificationId);
      },
    }
  );
};

/**
 * @desc  Bookmark job post
 */
export const bookmarkJobPost: MutationFunction<APIResponseSuccess, JobDetails> = async ({
  jobId,
}): Promise<APIResponseSuccess> => {
  return await apiClient({
    options: {
      url: `/users/jobs/${jobId}/bookmark`,
      method: "POST",
    },
  });
};

type BookmarkJobPostContext = {
  profile?: GetUserProfileResponse;
  bookmarked?: BookmarkedJobs;
};

export const useBookmarkJobPost = () => {
  const { toast, dismiss } = useToast();
  const { id: notificationId } = useAppSelector(selectNotification);
  const { initNotificationId } = useNotification();
  const queryClient = useQueryClient();
  const auth = useAppSelector(selectAuthStatus);

  return useMutation<APIResponseSuccess, APIResponseError, JobDetails, BookmarkJobPostContext>({
    mutationFn: bookmarkJobPost,
    onSuccess: ({ message }) => {
      if (notificationId) dismiss(notificationId);

      displaySuccessNotification(message, toast, initNotificationId);
    },
    onMutate: async (job: JobDetails) => {
      await queryClient.cancelQueries({ queryKey: userKeys.profile(auth.userId) });

      const previousUserProfileData = queryClient.getQueryData<GetUserProfileResponse>(
        userKeys.profile(auth.userId)
      );

      if (previousUserProfileData) {
        const jobIdExists = previousUserProfileData.bookmark?.find((id) => id === job.jobId);

        queryClient.setQueryData(userKeys.profile(auth.userId), {
          ...previousUserProfileData,
          bookmark: jobIdExists
            ? previousUserProfileData.bookmark?.filter((id) => id !== job.jobId)
            : [
                ...((previousUserProfileData.bookmark && previousUserProfileData.bookmark) || []),
                job.jobId,
              ],
        });
      }

      const previousBookmarkedJobs = queryClient.getQueryData<BookmarkedJobs>(
        userKeys.bookmarks(auth.userId)
      );

      if (previousBookmarkedJobs) {
        const jobIdExists = previousBookmarkedJobs.bookmarkedJobs?.find(
          ({ jobId }) => jobId === job.jobId
        );

        queryClient.setQueryData(userKeys.bookmarks(auth.userId), {
          ...previousBookmarkedJobs,
          total: jobIdExists ? previousBookmarkedJobs.total - 1 : previousBookmarkedJobs.total + 1,
          bookmarkedJobs: jobIdExists
            ? previousBookmarkedJobs.bookmarkedJobs.filter(({ jobId }) => jobId !== job.jobId)
            : [job, ...(previousBookmarkedJobs.bookmarkedJobs || [])],
        });
      }

      return { profile: previousUserProfileData, bookmarked: previousBookmarkedJobs };
    },
    onError: ({ message }, _job, context) => {
      queryClient.setQueryData(userKeys.profile(auth.userId), context?.profile);
      queryClient.setQueryData(userKeys.bookmarks(auth.userId), context?.bookmarked);
      displayErrorNotification(message, toast, initNotificationId);
    },
    onSettled: async (_data, _error, job) => {
      await Promise.all([
        queryClient.invalidateQueries(userKeys.bookmarks(auth.userId)),
        queryClient.invalidateQueries(jobKeys.detail(job.jobId)),
      ]);
    },
  });
};

/**
 * @desc  Apply to a job
 */
export const applyJob: MutationFunction<APIResponseSuccess, ApplyJobVariables> = async ({
  data,
  jobId,
}): Promise<APIResponseSuccess> => {
  await new Promise((res) => setTimeout(res, 2000));

  return await apiClient({
    options: {
      url: `/users/jobs/${jobId}/apply`,
      method: "POST",
      data,
    },
  });
};

type ApplyJobVariables = {
  data: JobApplicationData;
  jobId: string;
};

export const useApplyJob = () => {
  const { toast, dismiss } = useToast();
  const { id: notificationId } = useAppSelector(selectNotification);
  const { initNotificationId } = useNotification();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const auth = useAppSelector(selectAuthStatus);

  return useMutation<APIResponseSuccess, APIResponseError, ApplyJobVariables>({
    mutationFn: applyJob,
    onSuccess: async ({ message }, { jobId }) => {
      if (notificationId) dismiss(notificationId);

      await Promise.all([
        queryClient.invalidateQueries(jobKeys.detail(jobId)),
        queryClient.invalidateQueries(userKeys.all),
        queryClient.prefetchQuery({
          queryKey: userKeys.applications(auth.userId),
          queryFn: fetchJobApplications,
        }),
      ]);

      navigate(`/jobs/${jobId}`);
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
export const fetchJobApplications = async ({
  queryKey,
}: QueryFunctionContext<ReturnType<(typeof userKeys)["applications"]>>) => {
  const [, userId] = queryKey;

  if (userId === null) return Promise.reject("User ID needs to be provided.");

  await new Promise((res) => setTimeout(res, 1000));

  const data = await apiClient({
    options: {
      url: "/users/applications",
      method: "GET",
    },
  });

  return jobApplicationsSchema.parse(data);
};

export const useGetJobApplications = ({ initialData }: { initialData: JobApplications }) => {
  const { toast, dismiss } = useToast();
  const { id: notificationId } = useAppSelector(selectNotification);
  const { initNotificationId } = useNotification();
  const auth = useAppSelector(selectAuthStatus);

  return useQuery<
    JobApplications,
    APIResponseError,
    JobApplications,
    ReturnType<(typeof userKeys)["applications"]>
  >({
    queryKey: userKeys.applications(auth.userId),
    queryFn: fetchJobApplications,
    initialData,
    onError: ({ message }) => {
      if (notificationId) dismiss(notificationId);

      displayErrorNotification(message, toast, initNotificationId);
    },
  });
};
