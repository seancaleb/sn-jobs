import { useDocumentTitle } from "@mantine/hooks";
import MutateJob from "./MutateJob";

const CreateJobPage = () => {
  useDocumentTitle("Create New Job - SNJOBS");

  return (
    <div className="space-y-5 relative">
      <div className="flex justify-between gap-6">
        <div className="space-y-1">
          <div className="text-2xl font-semibold">Create new job</div>
          <p className="text-sm">Create a new job opportunity for potential candidates.</p>
        </div>
      </div>

      <MutateJob />
    </div>
  );
};

export default CreateJobPage;
