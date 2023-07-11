import { useQuery } from "react-query";
import apiClient from "@/services";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const fetchPosts = async (): Promise<Post[]> => {
  return await apiClient({
    options: {
      url: "/posts",
      method: "GET",
    },
  });
};

const QUERY_KEY = ["posts"];

export const useGetPosts = () => {
  return useQuery<Post[], Error>(QUERY_KEY, fetchPosts, {
    select: (posts) => posts.slice(0, 3),
  });
};
