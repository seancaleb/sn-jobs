import apiClient from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";
import { UseQueryOptions } from "@/types";
import { UserProfile, getProfileSchema } from "./users.type";

export const fetchUserProfile = async (): Promise<UserProfile> => {
  await new Promise((res) => setTimeout(res, 1000));
  return await apiClient({
    options: {
      url: "/users/profile",
      method: "GET",
    },
  });
};

export const useGetProfile = (queryKey: string[], options: UseQueryOptions<UserProfile>) => {
  return useQuery<UserProfile, Error>(queryKey, fetchUserProfile, {
    ...options,
    select: (data) => getProfileSchema.parse(data),
  });
};
