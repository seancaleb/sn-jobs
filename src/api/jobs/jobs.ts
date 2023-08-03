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
import { GetUserProfileResponse } from "../users/users.type";

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
export const bookmarkJobPost = async (jobId: string): Promise<APIResponseSuccess> => {
  return await apiClient({
    options: {
      url: `/users/jobs/${jobId}/bookmark`,
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

  return useMutation<APIResponseSuccess, APIResponseError, string, GetUserProfileResponse>({
    mutationFn: bookmarkJobPost,
    onSuccess: ({ message }) => {
      if (notificationId) dismiss(notificationId);

      displaySuccessNotification(message, toast, initNotificationId);
    },
    onMutate: async (jobId) => {
      await queryClient.cancelQueries({ queryKey: userKeys.profile(auth.userId) });

      const previousUserProfileData = queryClient.getQueryData<GetUserProfileResponse>(
        userKeys.profile(auth.userId)
      );

      if (previousUserProfileData) {
        const jobIdExists = previousUserProfileData.bookmark?.find((id) => id === jobId);

        queryClient.setQueryData(userKeys.profile(auth.userId), {
          ...previousUserProfileData,
          bookmark: jobIdExists
            ? previousUserProfileData.bookmark?.filter((id) => id !== jobId)
            : [
                ...((previousUserProfileData.bookmark && previousUserProfileData.bookmark) || []),
                jobId,
              ],
        });

        return previousUserProfileData;
      }
    },
    onError: ({ message }, _jobId, context) => {
      queryClient.setQueryData(userKeys.profile(auth.userId), context);
      displayErrorNotification(message, toast, initNotificationId);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries(userKeys.profile(auth.userId));
    },
  });
};
