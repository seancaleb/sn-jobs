import apiClient from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

/**
 * Reusable Type
 */
export type UseQueryOptions<T> = Parameters<typeof useQuery<T, Error>>["2"];

export const fetchPosts = async (): Promise<Post[]> => {
  await new Promise((res) => setTimeout(res, 2000));
  return await apiClient({
    options: {
      url: "/posts",
      method: "GET",
    },
  });
};

export const QUERY_KEY = ["posts"];

export const useGetPosts = (options: UseQueryOptions<Post[]>) => {
  return useQuery<Post[], Error>(QUERY_KEY, fetchPosts, {
    ...options,
    select: (posts) => posts.slice(0, 3),
  });
};
