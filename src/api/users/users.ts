import apiClient, { APIResponseError } from "@/services/apiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UseQueryOptions } from "@/types";
import {
  UpdateProfile,
  UpdateProfileResponse,
  UserProfileResponse,
  getProfileSchemaResponse,
  updateProfileSchemaResponse,
} from "./users.type";
import { displayErrorNotification, displaySuccessNotification } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import useNotification from "@/features/notification/useNotification";
import { selectNotification } from "@/features/notification/notificationSlice";
import { useAppSelector } from "@/app/hooks";

/**
 * @desc  Get user profile
 */
export const fetchUserProfile = async (): Promise<UserProfileResponse> => {
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
  queryKey: string[],
  options: UseQueryOptions<UserProfileResponse>
) => {
  return useQuery<UserProfileResponse, Error>(queryKey, fetchUserProfile, {
    ...options,
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
  const queryClient = useQueryClient();

  return useMutation<UpdateProfileResponse, APIResponseError, UpdateProfile>({
    mutationFn: updateUserProfile,
    onSuccess: async () => {
      await queryClient.invalidateQueries();

      const message = "Profile Updated: Your profile has been successfully updated.";

      if (id) dismiss(id);

      displaySuccessNotification(message, toast, initNotificationId);
    },
    onError: ({ message }) => displayErrorNotification(message, toast, initNotificationId),
  });
};
