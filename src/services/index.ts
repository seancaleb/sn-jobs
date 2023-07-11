/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface ServiceRequestConfigs {
  token?: string;
  options: AxiosRequestConfig;
}

const baseURL = import.meta.env.PROD ? import.meta.env.VITE_PROD_URL : import.meta.env.VITE_DEV_URL;

const client = axios.create({
  baseURL,
});

export default async function <T>({ token, options }: ServiceRequestConfigs): Promise<T> {
  if (token) {
    client.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  const onSuccess = (response: AxiosResponse<T>) => response.data;
  const onError = (err: Error) => err;

  try {
    return onSuccess(await client(options));
  } catch (error) {
    const e = error as Error;
    throw onError(e);
  }
}
