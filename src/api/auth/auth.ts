import apiClient from "@/services/apiClient";
import { useMutation } from "@tanstack/react-query";
import { LoginUser, Token } from "./auth.type";

export const loginUser = async (data: LoginUser): Promise<Token> => {
  await new Promise((res) => setTimeout(res, 1000));
  return await apiClient({
    options: {
      url: "/auth/login",
      method: "POST",
      data,
    },
  });
};

export const useLoginUser = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log(data.accessToken);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
