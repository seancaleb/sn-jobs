import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Eye, MoreHorizontal } from "lucide-react";
import { Application } from "@/api/employer/employer.type";
import { Button } from "@/components/ui/button";

type ColumnDropdownActions = Pick<Application, "jobId" | "applicationId">;

const ColumnDropdownActions = ({ jobId, applicationId }: ColumnDropdownActions) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0" onClick={() => setIsOpen(true)}>
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <Link to={`/employer/job-listings/${jobId}/applications/${applicationId}`}>
            <DropdownMenuItem>
              <Eye className="h-4 w-4 mr-2" />
              View
            </DropdownMenuItem>
          </Link>
          <Link to={`/employer/job-listings/${jobId}`}>
            <DropdownMenuItem>
              <Eye className="h-4 w-4 mr-2" />
              Browse job post
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ColumnDropdownActions;
