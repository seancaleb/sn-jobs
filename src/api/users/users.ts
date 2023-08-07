import apiClient, { APIResponseError, APIResponseSuccess } from "@/services/apiClient";
import {
  MutationFunction,
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  UpdateProfile,
  UpdateProfileResponse,
  GetUserProfileResponse,
  getProfileSchemaResponse,
  updateProfileSchemaResponse,
  UpdatePassword,
  DeleteProfile,
  BookmarkedJobs,
  bookmarkedJobsSchema,
} from "./users.type";
import { displayErrorNotification, displaySuccessNotification } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import useNotification from "@/features/notification/useNotification";
import { selectNotification } from "@/features/notification/notificationSlice";
import { useAppSelector } from "@/app/hooks";
import { useNavigate } from "react-router-dom";
import useAuth from "@/features/auth/useAuth";
import { selectAuthStatus } from "@/features/auth/authSlice";

/**
 * @desc Keys related to users
 */
export const userKeys = {
  all: ["user"] as const,
  profile: (userId: string | null) => [...userKeys.all, userId] as const,
  bookmarks: (userId: string | null) => [...userKeys.profile(userId), "bookmarks"] as const,
  applications: (userId: string | null) => [...userKeys.profile(userId), "applications"] as const,
};

/**
 * @desc  Get user profile
 */
export const fetchUserProfile = async ({
  queryKey,
}: QueryFunctionContext<ReturnType<(typeof userKeys)["profile"]>>) => {
  const [, userId] = queryKey;

  if (userId === null) return Promise.reject("User ID needs to be provided.");

  await new Promise((res) => setTimeout(res, 1000));

  const data = await apiClient({
    options: {
      url: "/users/profile",
      method: "GET",
    },
  });

  return getProfileSchemaResponse.parse(data);
};

export const useGetProfile = ({ initialData }: { initialData?: GetUserProfileResponse } = {}) => {
  const auth = useAppSelector(selectAuthStatus);

  return useQuery<
    GetUserProfileResponse,
    APIResponseError,
    GetUserProfileResponse,
    ReturnType<(typeof userKeys)["profile"]>
  >({
    queryKey: userKeys.profile(auth.userId),
    queryFn: fetchUserProfile,
    initialData,
  });
};

/**
 * @desc  Update user profile
 */
export const updateUserProfile: MutationFunction<UpdateProfileResponse, UpdateProfile> = async (
  data
) => {
  await new Promise((res) => setTimeout(res, 1000));

  const responseData = await apiClient({
    options: {
      url: "/users/profile",
      method: "PATCH",
      data,
    },
  });

  return updateProfileSchemaResponse.parse(responseData);
};

export const useUpdateProfile = () => {
  const { toast, dismiss } = useToast();
  const { id } = useAppSelector(selectNotification);
  const { initNotificationId } = useNotification();

  return useMutation<UpdateProfileResponse, APIResponseError, UpdateProfile>({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      const message = "Profile Updated: Your profile has been successfully updated.";

      if (id) dismiss(id);

      displaySuccessNotification(message, toast, initNotificationId);
    },
    onError: ({ message }) => displayErrorNotification(message, toast, initNotificationId),
  });
};

/**
 * @desc  Update password
 */
export const updatePassword: MutationFunction<APIResponseSuccess, UpdatePassword> = async (
  data
) => {
  await new Promise((res) => setTimeout(res, 1000));

  return await apiClient({
    options: {
      url: "/users/update-password",
      method: "PATCH",
      data,
    },
  });
};

export const useUpdatePassword = () => {
  const { toast, dismiss } = useToast();
  const { id } = useAppSelector(selectNotification);
  const { initNotificationId } = useNotification();

  return useMutation<APIResponseSuccess, APIResponseError, UpdatePassword>({
    mutationFn: updatePassword,
    onSuccess: ({ message }) => {
      if (id) dismiss(id);

      displaySuccessNotification(message, toast, initNotificationId);
    },
    onError: ({ message }) => displayErrorNotification(message, toast, initNotificationId),
  });
};

/**
 * @desc  Delete user profile
 */
export const deleteUserProfile: MutationFunction<unknown, DeleteProfile> = async (
  data
): Promise<unknown> => {
  await new Promise((res) => setTimeout(res, 1000));

  return await apiClient({
    options: {
      url: "/users/profile",
      method: "DELETE",
      data,
    },
  });
};

export const useDeleteProfile = () => {
  const { toast, dismiss } = useToast();
  const { id } = useAppSelector(selectNotification);
  const { initNotificationId } = useNotification();
  const { logoutUser } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<unknown, APIResponseError, DeleteProfile>({
    mutationFn: deleteUserProfile,
    onSuccess: () => {
      if (id) dismiss(id);

      queryClient.removeQueries();

      logoutUser();
      navigate("/", { replace: true });
    },

    onError: ({ message }) => displayErrorNotification(message, toast, initNotificationId),
  });
};

/**
 * @desc  Get Bookmarked job post
 */
export const fetchBookmarkedJobs = async ({
  queryKey,
}: QueryFunctionContext<ReturnType<(typeof userKeys)["bookmarks"]>>) => {
  const [, userId] = queryKey;

  if (userId === null) return Promise.reject("User ID needs to be provided.");

  await new Promise((res) => setTimeout(res, 1000));

  const data = await apiClient({
    options: {
      url: "/users/bookmarked-jobs",
      method: "GET",
    },
  });

  return bookmarkedJobsSchema.parse(data);
};

export const useGetBookmarkedJobs = ({ initialData }: { initialData: BookmarkedJobs }) => {
  const auth = useAppSelector(selectAuthStatus);

  return useQuery<
    BookmarkedJobs,
    APIResponseError,
    BookmarkedJobs,
    ReturnType<(typeof userKeys)["bookmarks"]>
  >({
    queryKey: userKeys.bookmarks(auth.userId),
    queryFn: fetchBookmarkedJobs,
    initialData,
  });
};
