import apiClient, { APIResponseDefault, APIResponseError } from "@/services/apiClient";
import { useMutation } from "@tanstack/react-query";
import { User, LoginUser, Token, userSchema, RegisterUser } from "./auth.type";
import jwt_decode from "jwt-decode";
import useAuth from "@/features/auth/useAuth";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { displayErrorNotification, displaySuccessNotification } from "@/lib/utils";
import useNotification from "@/features/notification/useNotification";
import { useAppSelector } from "@/app/hooks";
import { selectNotification } from "@/features/notification/notificationSlice";

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
  const { initNotificationId } = useNotification();
  const { toast, dismiss } = useToast();
  const { id } = useAppSelector(selectNotification);

  return useMutation<Token, APIResponseError, LoginUser>({
    mutationFn: loginUserRequest,
    onSuccess: (data) => {
      const decodedToken = jwt_decode<User>(data.accessToken);
      const parsedUser = userSchema.parse(decodedToken);

      if (id) dismiss(id);

      loginUser(parsedUser);
      navigate("/jobseekers/profile", { replace: true });
    },
    onError: ({ message }) => displayErrorNotification(message, toast, initNotificationId),
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

  return useMutation({
    mutationFn: logoutUserRequest,
    onSuccess: () => {
      navigate("/", { replace: true });
    },
  });
};

/**
 * @desc  Register user
 */
export const registerUserRequest = async (data: RegisterUser): Promise<APIResponseDefault> => {
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
  const { toast } = useToast();
  const { initNotificationId } = useNotification();

  return useMutation<APIResponseDefault, APIResponseError, RegisterUser>({
    mutationFn: registerUserRequest,
    onSuccess: ({ message }) => displaySuccessNotification(message, toast, initNotificationId),
    onError: ({ message }) => displayErrorNotification(message, toast, initNotificationId),
  });
};
