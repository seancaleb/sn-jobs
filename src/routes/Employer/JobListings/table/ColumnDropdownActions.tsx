import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { JobDetails } from "@/api/jobs/jobs.type";
import { useDeleteJobPostById } from "@/api/employer/employer";
import LoaderSpinner from "@/components/LoaderSpinner";
import { useState } from "react";
import AlertDialog from "@/components/AlertDialog";

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

export default ColumnDropdownActions;
