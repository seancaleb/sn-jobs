/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm } from "react-hook-form";
import { JobApplicationValues, jobApplicationSchema } from "./JobApplicationForm.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormDescription } from "@/components/ui/form";
import FormInputField from "@/components/FormInputField/FormInputField";
import { Button } from "@/components/ui/button";
import { DevTool } from "@hookform/devtools";
import { useApplyJob } from "@/api/jobs/jobs";
import LoaderSpinner from "@/components/LoaderSpinner";
import { Send } from "lucide-react";
import FormTextarea from "@/components/FormTextareaField/FormTextareaField";
import { JobDetails } from "@/api/jobs/jobs.type";

type JobApplicationProps = {
  job: JobDetails;
};

const JobApplication = ({ job }: JobApplicationProps) => {
  const form = useForm<JobApplicationValues>({
    defaultValues: {
      resume: "",
      coverLetter: "",
    },
    resolver: zodResolver(jobApplicationSchema),
  });
  const { control, handleSubmit, formState } = form;
  const { isValid } = formState;
  const applyJobMutation = useApplyJob();

  const onSubmit = (values: JobApplicationValues) => {
    isValid ? applyJobMutation.mutate({ data: values, jobId: job.jobId }) : null;
  };

  return (
    <div className="p-6 border border-slate-200 rounded-md max-w-md w-full space-y-6">
      <div className="space-y-1">
        <div className="text-2xl tracking-tight font-bold">Add your credentials</div>
        <p className="text-[0.9375rem] text-light">
          Highlight your experiences to stand out to employers.
        </p>
      </div>

      <Form {...form}>
        <form
          id="login-form"
          role="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 flex flex-col"
        >
          <FormInputField
            control={control}
            name="resume"
            label="Resume"
            placeholder="Enter a path to your resume"
          >
            <FormDescription>
              Make sure to include a working URL link to your resume.
            </FormDescription>
          </FormInputField>

          <FormTextarea
            control={control}
            name="coverLetter"
            label="Cover letter"
            placeholder="Enter your cover letter"
          />

          <Button type="submit" disabled={applyJobMutation.isLoading}>
            {applyJobMutation.isLoading ? <LoaderSpinner /> : <Send className="h-4 w-4 mr-2" />}
            Submit Application
          </Button>
        </form>
      </Form>

      <DevTool control={control} />
    </div>
  );
};

export default JobApplication;
