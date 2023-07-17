import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "@/components/ui/use-toast";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//  Response formatter to be used on toast notifications
export const toastResponseFormatter = (responseMessage: string) => {
  const separatorIndex = responseMessage.indexOf(":");
  const title = responseMessage.substring(0, separatorIndex).trim();
  const description = responseMessage.substring(separatorIndex + 1).trim();

  return { title, description };
};

//  Toast notification to display success responses from the backend API
export const displaySuccessNotification = (
  error: string,
  toastFn: typeof toast,
  initNotificationId: (id: string) => void
) => {
  const { title, description } = toastResponseFormatter(error);
  const toastId = toastFn({ title, description }).id;

  initNotificationId(toastId);
};

//  Toast notification to display error responses from the backend API
export const displayErrorNotification = (
  error: string,
  toastFn: typeof toast,
  initNotificationId: (id: string) => void
) => {
  const { title, description } = toastResponseFormatter(error);
  const toastId = toastFn({ title, description, variant: "destructive" }).id;

  initNotificationId(toastId);
};
