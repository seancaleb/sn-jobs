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

export const client = axios.create({
  baseURL,
  withCredentials: true,
});

const authInstance = axios.create({
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
    throw onError(e.response?.data);
  }
}

export const apiClientAuth = async <T>({ options }: ServiceRequestConfigs) => {
  const onSuccess = (response: AxiosResponse<T>) => response.data;
  const onError = (err?: APIResponseError) => err;

  try {
    return onSuccess(await authInstance(options));
  } catch (error) {
    const e = error as AxiosError<APIResponseError>;
    throw onError(e.response?.data);
  }
};
