/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react-refresh/only-export-components */
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

// import { Checkbox } from "@/components/ui/checkbox";
import { EmployerJob } from "@/api/employer/employer.type";
import { format, parseISO } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { JobDetails } from "@/api/jobs/jobs.type";
import { useDeleteJobPostById } from "@/api/employer/employer";
import LoaderSpinner from "@/components/LoaderSpinner";
import { useState } from "react";
import { formatJobPostTime } from "@/lib/utils";
import AlertDialog from "@/components/AlertDialog";

export const columns: ColumnDef<EmployerJob>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "title",
    header: "Job Title",
    cell: ({ row }) => {
      const title = row.getValue<string>("title");
      const createdAt = row.getValue<string>("createdAt");
      const modifiedDate = formatJobPostTime(parseISO(createdAt));

      return (
        <div className="max-w-xs w-full break-all">
          {modifiedDate === "just now" ? (
            <span className="text-green-500 font-medium text-xs">New</span>
          ) : null}
          <div>{title}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "location",
    header: () => <div>Location</div>,
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
          <Badge variant={jobApplications.length > 0 ? "default" : "outline"}>
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

type ColumnDropdownActions = {
  jobPost: JobDetails;
};

const ColumnDropdownActions = ({ jobPost }: ColumnDropdownActions) => {
  const deleteJobMutation = useDeleteJobPostById();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const handleSetIsOpen = () => {
    setIsOpen(true);
  };

  const handleIsOpenAlert = (value: boolean) => {
    setIsOpenAlert(value);
  };

  const handleCloseAlert = () => {
    deleteJobMutation.mutate(
      { jobId: jobPost.jobId },
      {
        onSuccess: () => {
          setIsOpenAlert(false);
          setIsOpen(false);
        },
      }
    );
  };

  const handleCancelAlert = () => {
    setIsOpenAlert(false);
  };

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0" onClick={handleSetIsOpen}>
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <Link to={`/employer/job-listings/${jobPost.jobId}`}>
            <DropdownMenuItem>
              <Eye className="h-4 w-4 mr-2" />
              View
            </DropdownMenuItem>
          </Link>
          <Link to={`/employer/job-listings/${jobPost.jobId}/edit`}>
            <DropdownMenuItem>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={() => setIsOpenAlert(true)}>
            {deleteJobMutation.isLoading ? <LoaderSpinner /> : <Trash2 className="h-4 w-4 mr-2" />}
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog
        isOpen={isOpenAlert || deleteJobMutation.isLoading}
        setIsOpen={handleIsOpenAlert}
        title="Delete Job Post?"
        message={
          <>
            Are you sure you want to delete this job post? This action cannot be undone. Deleting
            the job post will{" "}
            <span className="text-primary underline">remove all associated information</span>,{" "}
            <span className="text-primary underline">applications</span>, and{" "}
            <span className="text-primary underline">data</span>.
          </>
        }
        actionButtons={[
          <Button
            variant="ghost"
            onClick={handleCancelAlert}
            disabled={deleteJobMutation.isLoading}
          >
            Cancel
          </Button>,
          <Button
            variant="destructive"
            type="submit"
            onClick={handleCloseAlert}
            disabled={deleteJobMutation.isLoading}
          >
            {deleteJobMutation.isLoading ? <LoaderSpinner /> : null}
            Confirm Deletion
          </Button>,
        ]}
      />
    </>
  );
};
