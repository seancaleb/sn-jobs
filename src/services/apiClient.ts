/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

interface ServiceRequestConfigs {
  token?: string;
  options: AxiosRequestConfig;
}

export type APIResponseError = {
  message: string;
};

export type APIResponseSuccess = {
  message: string;
};

const baseURL = import.meta.env.PROD ? import.meta.env.VITE_PROD_URL : import.meta.env.VITE_DEV_URL;

const client = axios.create({
  baseURL,
});

export default async function <T>({ token, options }: ServiceRequestConfigs): Promise<T> {
  if (token) {
    client.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  client.defaults.withCredentials = true;

  const onSuccess = (response: AxiosResponse<T>) => response.data;
  const onError = (err?: APIResponseError) => err;

  try {
    return onSuccess(await client(options));
  } catch (error) {
    const e = error as AxiosError<APIResponseError>;
    throw onError(e.response?.data);
  }
}
