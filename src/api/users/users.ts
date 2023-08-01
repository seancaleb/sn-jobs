import apiClient, { APIResponseError, APIResponseSuccess } from "@/services/apiClient";
import { UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import {
  UpdateProfile,
  UpdateProfileResponse,
  GetUserProfileResponse,
  getProfileSchemaResponse,
  updateProfileSchemaResponse,
  UpdatePassword,
} from "./users.type";
import { displayErrorNotification, displaySuccessNotification } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import useNotification from "@/features/notification/useNotification";
import { selectNotification } from "@/features/notification/notificationSlice";
import { useAppSelector } from "@/app/hooks";

/**
 * @desc Keys related to users
 */
export const userKeys = {
  all: ["user"] as const,
  profile: (userId: string | null) => [...userKeys.all, userId] as const,
};

/**
 * @desc  Get user profile
 */
export const fetchUserProfile = async (): Promise<GetUserProfileResponse> => {
  await new Promise((res) => setTimeout(res, 1000));

  const data = await apiClient({
    options: {
      url: "/users/profile",
      method: "GET",
    },
  });

  return getProfileSchemaResponse.parse(data);
};

export const useGetProfile = (
  options?: UseQueryOptions<
    GetUserProfileResponse,
    APIResponseError,
    GetUserProfileResponse["user"]
  >
) => {
  return useQuery<GetUserProfileResponse, APIResponseError, GetUserProfileResponse["user"]>({
    ...options,
    queryFn: fetchUserProfile,
    select: ({ user }) => user,
  });
};

/**
 * @desc  Update user profile
 */
export const updateUserProfile = async (data: UpdateProfile): Promise<UpdateProfileResponse> => {
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
export const updatePassword = async (data: UpdatePassword): Promise<APIResponseSuccess> => {
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
