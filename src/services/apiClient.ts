/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

interface ServiceRequestConfigs {
  options: AxiosRequestConfig;
}

export type APIResponseError = {
  message: string;
};

export type APIResponseSuccess = {
  message: string;
};

const baseURL = import.meta.env.PROD ? import.meta.env.VITE_PROD_URL : import.meta.env.VITE_DEV_URL;
const NETWORK_ERROR =
  "Unable to Connect: The server is currently unreachable or refusing the connection. Please check your network connection and try again later.";

export const client = axios.create({
  baseURL,
  withCredentials: true,
});

export const authClient = axios.create({
  baseURL,
  withCredentials: true,
});

export default async function <T>({ options }: ServiceRequestConfigs): Promise<T> {
  const onSuccess = (response: AxiosResponse<T>) => response.data;
  const onError = (err?: APIResponseError) => err;

  try {
    return onSuccess(await client(options));
  } catch (error) {
    const e = error as AxiosError<APIResponseError>;
    if (e.code === "ERR_NETWORK")
      throw onError({
        message: NETWORK_ERROR,
      });
    else throw onError(e.response?.data);
  }
}

export const apiClientAuth = async <T>({ options }: ServiceRequestConfigs) => {
  const onSuccess = (response: AxiosResponse<T>) => response.data;
  const onError = (err?: APIResponseError) => err;

  try {
    return onSuccess(await authClient(options));
  } catch (error) {
    const e = error as AxiosError<APIResponseError>;
    throw onError(e.response?.data);
  }
};
