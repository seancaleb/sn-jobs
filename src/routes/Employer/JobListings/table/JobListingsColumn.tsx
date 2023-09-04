import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { EmployerJob } from "@/api/employer/employer.type";
import { format, parseISO } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { formatJobPostTime } from "@/lib/utils";
import ColumnDropdownActions from "./ColumnDropdownActions";

export const columns: ColumnDef<EmployerJob>[] = [
  {
    accessorKey: "title",
    header: "Job Title",
    cell: ({ row }) => {
      const title = row.getValue<string>("title");
      const createdAt = row.getValue<string>("createdAt");
      const modifiedDate = formatJobPostTime(parseISO(createdAt));

      return (
        <div className="max-w-xs w-full break-all">
          {modifiedDate === "just now" ? <span className="text-green-500 text-xs">New</span> : null}
          <div>{title}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "location",
    header: () => <div>Location</div>,
    filterFn: (row, id, value: []) => {
      return value.includes(row.getValue(id));
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
            Date Published
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
    accessorKey: "applications",
    header: () => <div className="text-right">Applications</div>,
    cell: ({ row }) => {
      const jobApplications = row.getValue<string[]>("applications");

      return (
        <div className="text-right">
          <Badge variant={jobApplications.length > 0 ? "primary" : "outline"}>
            {jobApplications.length > 0
              ? `${jobApplications.length} application${jobApplications.length > 1 ? "s" : ""}`
              : "No applications yet"}
          </Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const jobPost = row.original;

      return <ColumnDropdownActions jobPost={jobPost} />;
    },
  },
];
