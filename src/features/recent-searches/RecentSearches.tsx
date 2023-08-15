import useRecentSearches from "./useRecentSearches";
import { updateQueryParams } from "@/lib/utils";
import { useSearchParams } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { X } from "lucide-react";

const RecentSearches = () => {
  const { recentSearches, deleteSearchKeyword } = useRecentSearches();
  const [, setSearchParams] = useSearchParams();

  return (
    <>
      {recentSearches.length !== 0 ? (
        <div className="rounded-md border border-border p-6 sm:max-w-sm w-full space-y-4">
          <div>Recent searches</div>
          <div className="space-y-1">
            {recentSearches.map((keyword, index) => (
              <div key={nanoid()} className="flex justify-between gap-6 items-center">
                <span
                  role="button"
                  onClick={() =>
                    updateQueryParams(setSearchParams, { key: "keyword", value: keyword })
                  }
                  className="hover:underline text-sm"
                >
                  {keyword}
                </span>
                <span
                  role="button"
                  onClick={() => deleteSearchKeyword(index)}
                  className="text-foreground/50 hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default RecentSearches;
