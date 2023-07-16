import apiClient from "@/services/apiClient";
import { useMutation } from "@tanstack/react-query";
import { User, LoginUser, Token, userSchema, RegisterUser, ResponseMessage } from "./auth.type";
import jwt_decode from "jwt-decode";
import useAuth from "@/features/auth/useAuth";
import { useNavigate } from "react-router-dom";

/**
 * @desc  Login user
 */
export const loginUserRequest = async (data: LoginUser): Promise<Token> => {
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
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  return useMutation<Token, Error, LoginUser>({
    mutationFn: loginUserRequest,
    onSuccess: (data) => {
      const decodedToken = jwt_decode<User>(data.accessToken);
      const parsedUser = userSchema.parse(decodedToken);

      loginUser(parsedUser);
      navigate("/profile", { replace: true });
    },
  });
};

/**
 * @desc  Logout user
 */
export const logoutUserRequest = async () => {
  return apiClient({
    options: {
      url: "/auth/logout",
      method: "POST",
    },
  });
};

export const useLogoutUser = () => {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutUserRequest,
    onSuccess: () => {
      logoutUser();
      navigate("/", { replace: true });
    },
  });
};

/**
 * @desc  Register user
 */
export const registerUserRequest = async (data: RegisterUser): Promise<ResponseMessage> => {
  await new Promise((res) => setTimeout(res, 1000));
  return await apiClient({
    options: {
      url: "/auth/register",
      method: "POST",
      data,
    },
  });
};

export const useRegisterUser = () => {
  return useMutation<ResponseMessage, Error, RegisterUser>({
    mutationFn: registerUserRequest,
  });
};
