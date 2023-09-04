import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Application } from "@/api/employer/employer.type";
import { format, parseISO } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { formatJobPostTime, getBadgeVariant } from "@/lib/utils";
import ColumnDropdownActions from "./ColumnDropdownActions";

export const columns: ColumnDef<Application>[] = [
  {
    accessorKey: "applicationId",
    header: "Application ID",
    cell: ({ row }) => {
      const applicationId = row.getValue<string>("applicationId");
      const createdAt = row.getValue<string>("createdAt");
      const modifiedDate = formatJobPostTime(parseISO(createdAt));

      return (
        <div className="max-w-xs w-full break-all">
          {modifiedDate === "just now" ? <span className="text-green-500 text-xs">New</span> : null}
          <div>{applicationId}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "jobId",
    header: "Job ID",
    cell: ({ row }) => {
      const jobId = row.getValue<string>("jobId");

      return <div>{jobId}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Application Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const createdAt = row.getValue<string>("createdAt");
      const modifiedDate = format(parseISO(createdAt), "PP");

      return (
        <div className="text-right">
          <Badge variant="outline">{modifiedDate}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Last Modified
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const updatedAt = row.getValue<string>("updatedAt");
      const modifiedDate = formatJobPostTime(parseISO(updatedAt));
      const capitalizedDate = modifiedDate[0].toUpperCase() + modifiedDate.slice(1);

      return <div className="text-right">{capitalizedDate}</div>;
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-right">Status</div>,
    cell: ({ row }) => {
      const status = row.getValue<string>("status");

      return (
        <div className="text-right">
          <Badge variant={getBadgeVariant(status)}>{status}</Badge>
        </div>
      );
    },
    filterFn: (row, id, value: []) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const applicationId = row.getValue<string>("applicationId");
      const jobId = row.getValue<string>("jobId");

      const columnActionProps = {
        applicationId,
        jobId,
      };

      return <ColumnDropdownActions {...columnActionProps} />;
    },
  },
];
