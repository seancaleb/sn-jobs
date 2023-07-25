import { useQuery } from "@tanstack/react-query";

export type LoaderReturnType<T extends (...args: any) => any> = Awaited<ReturnType<ReturnType<T>>>;
export type UseQueryOptions<T> = Parameters<typeof useQuery<T, Error>>["2"];
