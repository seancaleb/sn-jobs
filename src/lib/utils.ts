import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toastResponseFormatter = (responseMessage: string) => {
  const separatorIndex = responseMessage.indexOf(":");
  const title = responseMessage.substring(0, separatorIndex).trim();
  const description = responseMessage.substring(separatorIndex + 1).trim();

  return { title, description };
};
