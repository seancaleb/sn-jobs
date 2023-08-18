import { useAppSelector } from "@/app/hooks";
import { selectAuthStatus } from "@/features/auth/authSlice";
import { ReactNode, useState, useEffect, useCallback } from "react";
import { APIResponseError, client } from "@/services/apiClient";
import { isTokenExpirationThresholdMet } from "@/lib/utils";
import { refreshToken } from "@/api/auth/auth";
import { AxiosError, InternalAxiosRequestConfig } from "axios";
import useAuth from "@/features/auth/useAuth";

type AxiosInterceptorProps = {
  children: ReactNode;
};

const AxiosInterceptor = ({ children }: AxiosInterceptorProps) => {
  const [isSet, setIsSet] = useState(false);
  const auth = useAppSelector(selectAuthStatus);
  const { logoutUser, refreshAuthToken } = useAuth();

  const requestInterceptor = useCallback(
    async (config: InternalAxiosRequestConfig) => {
      if (auth.isAuthenticated && isTokenExpirationThresholdMet(auth.tokenExpiration)) {
        try {
          const { exp } = await refreshToken();
          refreshAuthToken(exp);
        } catch (error) {
          console.error("Token refresh failed:", error);
          logoutUser();
        }
      }

      return config;
    },
    [auth.isAuthenticated, auth.tokenExpiration, logoutUser, refreshAuthToken]
  );

  const errInterceptor = useCallback((error: unknown) => {
    const e = error as AxiosError<APIResponseError>;

    if (e.status === 401) {
      console.log("Unauthorized:", e.response?.data);
    }

    return Promise.reject(e.response?.data.message);
  }, []);

  useEffect(() => {
    const interceptor = client.interceptors.request.use(requestInterceptor, errInterceptor);

    setIsSet(true);

    return () => {
      client.interceptors.request.eject(interceptor);
    };
  }, [requestInterceptor, errInterceptor]);

  return isSet && children;
};

export default AxiosInterceptor;
