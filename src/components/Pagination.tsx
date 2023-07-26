import { usePagination } from "@mantine/hooks";
import { nanoid } from "@reduxjs/toolkit";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { updateQueryParams } from "@/lib/utils";
import { useSearchParams } from "react-router-dom";

type PaginationProps = {
  pageNumber: number;
  total: number;
};

const Pagination = ({ total, pageNumber }: PaginationProps) => {
  const [, setSearchParams] = useSearchParams();
  const pagination = usePagination({
    total: total,
    page: pageNumber,
    onChange: (page) => {
      updateQueryParams(setSearchParams, { key: "page", value: page.toString() });
    },
  });

  return (
    <div className="flex gap-x-1">
      {pagination.active > 1 && (
        <Button size="icon" variant="outline" onClick={() => pagination.previous()}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

      {pagination.range.map((value, index) => {
        console.log({ value, index });
        return (
          <>
            {value === "dots" ? (
              <div className="flex items-center px-3 py-2">...</div>
            ) : (
              <Button
                key={nanoid()}
                variant={pagination.active === value ? "default" : "outline"}
                onClick={() => pagination.setPage(value)}
                className={pagination.active === value ? "hover:bg-primary" : ""}
              >
                {value}
              </Button>
            )}
          </>
        );
      })}

      {pagination.active !== total && (
        <Button size="icon" variant="outline" onClick={() => pagination.next()}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default Pagination;
