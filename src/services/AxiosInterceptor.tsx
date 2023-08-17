import { useAppSelector } from "@/app/hooks";
import { selectAuthStatus } from "@/features/auth/authSlice";
import { ReactNode, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const auth = useAppSelector(selectAuthStatus);
  const { logoutUser, refreshAuthToken } = useAuth();

  useEffect(() => {
    const requestInterceptor = async (config: InternalAxiosRequestConfig) => {
      if (auth.isAuthenticated && isTokenExpirationThresholdMet(auth.tokenExpiration)) {
        try {
          const { exp } = await refreshToken();
          refreshAuthToken(exp);
        } catch (error) {
          console.error("Token refresh failed:", error);
          logoutUser();
          navigate("/", { replace: true });
        }
      }

      return config;
    };

    const errInterceptor = (error: unknown) => {
      const e = error as AxiosError<APIResponseError>;

      if (e.status === 401) {
        console.log("Unauthorized:", e.response?.data);
        navigate("/", { replace: true });
      }

      return Promise.reject(e.response?.data.message);
    };

    const interceptor = client.interceptors.request.use(requestInterceptor, errInterceptor);

    setIsSet(true);

    return () => {
      client.interceptors.request.eject(interceptor);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, auth.isAuthenticated, auth.tokenExpiration]);

  return isSet && children;
};

export default AxiosInterceptor;
