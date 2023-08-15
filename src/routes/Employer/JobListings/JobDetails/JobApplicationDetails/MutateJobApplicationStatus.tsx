/* eslint-disable @typescript-eslint/no-misused-promises */
import { useUpdateJobApplicationStatus } from "@/api/employer/employer";
import { JobPostApplication } from "@/api/employer/employer.type";
import { jobApplicationSchema } from "@/api/jobs/jobs.type";
import FormSelectField from "@/components/FormSelectField/FormSelectField";
import LoaderSpinner from "@/components/LoaderSpinner";
import Prompt from "@/components/Prompt";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const mutateJobApplicationStatusSchema = z.object({
  ...jobApplicationSchema.pick({
    status: true,
  }).shape,
});

type MutateJobApplicationStatusValues = z.infer<typeof mutateJobApplicationStatusSchema>;

const options = [
  { value: "Application viewed", label: "Application viewed" },
  { value: "Not selected by employer", label: "Not selected by employer" },
];

type MutateJobApplicationStatusProps = {
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
  applicationStatus: JobPostApplication["status"];
  jobId: string;
  applicationId: string;
};

const MutateJobApplicationStatus = ({
  isEditMode,
  setIsEditMode,
  applicationStatus,
  jobId,
  applicationId,
}: MutateJobApplicationStatusProps) => {
  const form = useForm<MutateJobApplicationStatusValues>({
    defaultValues:
      applicationStatus === "Applied"
        ? undefined
        : {
            status: applicationStatus,
          },
    resolver: zodResolver(mutateJobApplicationStatusSchema),
  });
  const { control, handleSubmit, formState, reset } = form;
  const { isDirty } = formState;
  const jobApplicationStatusMutation = useUpdateJobApplicationStatus();

  const onSubmit = async (values: MutateJobApplicationStatusValues) => {
    if (values.status === applicationStatus) {
      reset();
      setIsEditMode(false);
      return;
    }

    await jobApplicationStatusMutation.mutateAsync({ data: values, jobId, applicationId });
    reset({ status: values.status });
    setIsEditMode(false);
  };

  return (
    <>
      {isEditMode ? (
        <>
          <Prompt hasUnsavedChanges={isDirty} />
          <Form {...form}>
            <form
              id="mutate-job-status-form"
              role="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              className="flex gap-5 items-start"
            >
              <FormSelectField
                control={control}
                name="status"
                placeholder="Select status"
                options={options}
              />

              <div className="absolute right-0 top-0 flex gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    reset();
                    setIsEditMode(false);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={jobApplicationStatusMutation.isLoading || !isDirty}>
                  {jobApplicationStatusMutation.isLoading ? (
                    <LoaderSpinner />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </>
      ) : (
        <div>
          <Badge>{applicationStatus}</Badge>
        </div>
      )}
    </>
  );
};

export default MutateJobApplicationStatus;
