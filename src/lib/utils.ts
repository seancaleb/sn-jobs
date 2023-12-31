import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "@/components/ui/use-toast";
import { SetURLSearchParams } from "react-router-dom";
import { APIResponseError } from "@/services/apiClient";
import { addMilliseconds } from "date-fns";

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
  successMessage: string,
  toastFn: typeof toast,
  initNotificationId: (id: string) => void
) => {
  const { title, description } = toastResponseFormatter(successMessage);
  const toastId = toastFn({ title, description }).id;

  initNotificationId(toastId);
};

//  Toast notification to display error responses from the backend API
export const displayErrorNotification = (
  errorMessage: string,
  toastFn: typeof toast,
  initNotificationId: (id: string) => void
) => {
  const { title, description } = toastResponseFormatter(errorMessage);
  const toastId = toastFn({ title, description, variant: "destructive" }).id;

  initNotificationId(toastId);
};

//  Date formatter for a specific job post
export const formatJobPostTime = (date: Date) => {
  const now = new Date();

  const hoursAgo = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  const daysAgo = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (hoursAgo < 1) return "just now";
  else if (hoursAgo < 2) return "1 hour ago";
  else if (hoursAgo < 3) return "2 hours ago";
  else if (hoursAgo < 4) return "3 hours ago";
  else if (hoursAgo < 5) return "4 hours ago";

  if (daysAgo < 8) {
    if (daysAgo === 0) {
      return "today";
    } else if (daysAgo === 1) {
      return "yesterday";
    } else if (daysAgo < 8) {
      return `${daysAgo} days ago`;
    }
  }

  const weeksAgo = Math.floor(daysAgo / 7);

  if (weeksAgo < 5) {
    return `${weeksAgo} week${weeksAgo === 1 ? "" : "s"} ago`;
  }

  const monthsAgo = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 30));

  if (monthsAgo < 13) {
    return `${monthsAgo} month${monthsAgo === 1 ? "" : "s"} ago`;
  }

  const yearsAgo = Math.floor(now.getFullYear() - date.getFullYear());

  return `${yearsAgo} year${yearsAgo === 1 ? "" : "s"} ago`;
};

// Function to update the query parameters without replacing the old query parameter list
export const updateQueryParams = (
  setSearchParams: SetURLSearchParams,
  params: { key: string; value: string } | { key: string; value: string }[]
) => {
  // Enqueue navigation action that updates the queryString
  setSearchParams((searchParams) => {
    // Add the new query param value to the queryString
    if (params instanceof Array) {
      params.forEach(({ key, value }) => {
        searchParams.set(key, value);
      });
    } else searchParams.set(params.key, params.value);

    return searchParams;
  });
};

// Function to capitalize every first letter of a word
export const capitalize = (string: string) => {
  let stringArr = string.split(" ");
  stringArr = stringArr.map((string) => {
    const formattedString = string.charAt(0).toUpperCase() + string.slice(1);
    return formattedString;
  });

  return stringArr.join(" ");
};

// Function to disable interactions on a page
export const disableInteractions = () => {
  const body = document.querySelector("body");
  body?.classList.add("disable-interactions");
};

// Function to remove disable interactions on a page
export const removeDisableInteractions = () => {
  const body = document.querySelector("body");
  body?.classList.contains("disable-interactions") &&
    body?.classList.remove("disable-interactions");
};

// Function to check if error is an instance of APIResponseError interface
export const isAPIResponseError = (value: unknown): value is APIResponseError => {
  return typeof value === "object" && "message" in value! && typeof value.message === "string";
};

// Verify if token expiration threshold has been met
export const isTokenExpirationThresholdMet = (exp: number) => {
  const bufferTimeInMilliseconds = 3 * 60 * 1000;
  const currentTime = new Date(Date.now());
  const tokenExpirationTime = new Date(exp * 1000);
  // 3 minutes before tokenExpirationTime
  const expirationThreshold = addMilliseconds(tokenExpirationTime, -bufferTimeInMilliseconds);

  return currentTime >= expirationThreshold;
};

// Determine variant of Badge component based on status of job application
export const getBadgeVariant = (status: string) => {
  switch (status) {
    case "Applied":
      return "applied" as const;
    case "Application viewed":
      return "application-viewed" as const;
    case "Not selected by employer":
      return "not-selected" as const;
    default:
      return "default";
  }
};

// API Response delay
export const responseDelay = async () => {
  return import.meta.env.MODE === "development"
    ? await new Promise((res) => setTimeout(res, 300))
    : null;
};

// Get browser client timezone
export const getUserTimezone = () => {
  if (typeof Intl === "object" && typeof Intl.DateTimeFormat === "function") {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return userTimezone;
  } else {
    return "UTC";
  }
};
