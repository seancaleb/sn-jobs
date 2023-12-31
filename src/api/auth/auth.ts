import apiClient, {
  APIResponseSuccess,
  APIResponseError,
  apiClientAuth,
} from "@/services/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  LoginCredentials,
  Token,
  RegisterCredentials,
  parsedTokenSchema,
  tokenSchema,
} from "./auth.type";
import jwt_decode from "jwt-decode";
import useAuth from "@/features/auth/useAuth";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
  disableInteractions,
  displayErrorNotification,
  displaySuccessNotification,
  removeDisableInteractions,
  responseDelay,
} from "@/lib/utils";
import useNotification from "@/features/notification/useNotification";
import { User } from "@/types/user";

/**
 * @desc  Login user
 */
export const loginUserRequest = async (data: LoginCredentials): Promise<Token> => {
  await responseDelay();
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
  const { notificationId, initNotificationId } = useNotification();
  const { toast, dismiss } = useToast();

  return useMutation<Token, APIResponseError, LoginCredentials>({
    mutationFn: loginUserRequest,
    onSuccess: (data) => {
      const decodedToken = jwt_decode<User>(data.accessToken);
      const parsedUser = parsedTokenSchema.parse(decodedToken);
      const { role, exp, userId } = parsedUser;

      if (notificationId) dismiss(notificationId);

      loginUser({ role, exp, userId });
      if (role === "user") {
        navigate("/jobseekers/account/profile", { replace: true });
      } else {
        navigate(`/${role}/dashboard`, { replace: true });
      }
    },
    onError: ({ message }) => displayErrorNotification(message, toast, initNotificationId),
    onMutate: () => {
      disableInteractions();
    },
    onSettled: () => {
      removeDisableInteractions();
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
  const navigate = useNavigate();
  const { logoutUser } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUserRequest,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate(0);
    },
    onMutate: () => {
      logoutUser();
    },
  });
};

/**
 * @desc  Register user
 */
export const registerUserRequest = async (
  data: RegisterCredentials
): Promise<APIResponseSuccess> => {
  await responseDelay();
  return await apiClient({
    options: {
      url: "/auth/register",
      method: "POST",
      data,
    },
  });
};

export const useRegisterUser = () => {
  const { toast } = useToast();
  const { initNotificationId } = useNotification();

  return useMutation<APIResponseSuccess, APIResponseError, RegisterCredentials>({
    mutationFn: registerUserRequest,
    onSuccess: ({ message }) => displaySuccessNotification(message, toast, initNotificationId),
    onError: ({ message }) => displayErrorNotification(message, toast, initNotificationId),
    onMutate: () => {
      disableInteractions();
    },
    onSettled: () => {
      removeDisableInteractions();
    },
  });
};

/**
 * @desc  Refresh token
 */
export const refreshToken = async () => {
  const response = await apiClientAuth<Token>({
    options: {
      url: "/auth/refresh",
      method: "GET",
    },
  });

  const { accessToken } = tokenSchema.parse(response);
  const decodedToken = jwt_decode<User>(accessToken);

  return parsedTokenSchema.parse(decodedToken);
};
