import apiClient, { APIResponseError, APIResponseSuccess } from "@/services/apiClient";
import { UseQueryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Jobs, JobDetails, jobSchema, jobsSchema } from "./jobs.type";
import useNotification from "@/features/notification/useNotification";
import { useAppSelector } from "@/app/hooks";
import { useToast } from "@/components/ui/use-toast";
import { selectNotification } from "@/features/notification/notificationSlice";
import { displayErrorNotification, displaySuccessNotification } from "@/lib/utils";
import { selectAuthStatus } from "@/features/auth/authSlice";
import { userKeys } from "../users/users";
import { BookmarkedJobs, GetUserProfileResponse } from "../users/users.type";

/**
 * @desc  Get all jobs
 */
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

  return useQuery<Jobs>([...QUERY_KEY, ...QUERY_KEY_PARAMS], () => fetchJobs(params), {
    ...options,
    select: (data) => jobsSchema.parse(data),
  });
};

/**
 * @desc  Get job by id
 */
export const fetchJobById = async (jobId: string | null): Promise<JobDetails> => {
  if (jobId === null) return Promise.reject(new Error("Invalid id"));

  await new Promise((res) => setTimeout(res, 1000));

  return await apiClient({
    options: {
      url: `/job/${jobId}`,
      method: "GET",
    },
  });
};

export const useGetJobById = (jobId: string | null) => {
  return useQuery<JobDetails>(["job", jobId], () => fetchJobById(jobId), {
    enabled: !!jobId,
    select: (data) => jobSchema.parse(data),
  });
};

/**
 * @desc  Bookmark job post
 */
export const bookmarkJobPost = async (job: JobDetails): Promise<APIResponseSuccess> => {
  return await apiClient({
    options: {
      url: `/users/jobs/${job.jobId}/bookmark`,
      method: "POST",
    },
  });
};

export const useBookmarkJobPost = () => {
  const { toast, dismiss } = useToast();
  const { id: notificationId } = useAppSelector(selectNotification);
  const { initNotificationId } = useNotification();
  const queryClient = useQueryClient();
  const auth = useAppSelector(selectAuthStatus);

  return useMutation<
    APIResponseSuccess,
    APIResponseError,
    JobDetails,
    { profile?: GetUserProfileResponse; bookmarked?: BookmarkedJobs }
  >({
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
        userKeys.bookmark(auth.userId)
      );

      if (previousBookmarkedJobs) {
        const jobIdExists = previousBookmarkedJobs.bookmarkedJobs?.find(
          ({ jobId }) => jobId === job.jobId
        );

        queryClient.setQueryData(userKeys.bookmark(auth.userId), {
          ...previousBookmarkedJobs,
          total: jobIdExists ? previousBookmarkedJobs.total - 1 : previousBookmarkedJobs.total + 1,
          bookmarkedJobs: jobIdExists
            ? previousBookmarkedJobs.bookmarkedJobs.filter(({ jobId }) => jobId !== job.jobId)
            : [...(previousBookmarkedJobs.bookmarkedJobs || []), job],
        });
      }

      return { profile: previousUserProfileData, bookmarked: previousBookmarkedJobs };
    },
    onError: ({ message }, _jobId, context) => {
      queryClient.setQueryData(userKeys.profile(auth.userId), context?.profile);
      queryClient.setQueryData(userKeys.bookmark(auth.userId), context?.bookmarked);
      displayErrorNotification(message, toast, initNotificationId);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries(userKeys.bookmark(auth.userId));
    },
  });
};
