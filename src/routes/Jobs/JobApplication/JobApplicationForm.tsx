/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm } from "react-hook-form";
import { JobApplicationValues, jobApplicationSchema } from "./JobApplicationForm.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormDescription } from "@/components/ui/form";
import FormInputField from "@/components/FormInputField/FormInputField";
import { Button } from "@/components/ui/button";
import { useApplyJob } from "@/api/jobs/jobs";
import LoaderSpinner from "@/components/LoaderSpinner";
import { Send } from "lucide-react";
import FormTextarea from "@/components/FormTextareaField/FormTextareaField";
import Prompt from "@/components/Prompt";
import { useParams } from "react-router-dom";

const JobApplication = () => {
  const form = useForm<JobApplicationValues>({
    defaultValues: {
      resume: "",
      coverLetter: "",
    },
    resolver: zodResolver(jobApplicationSchema),
  });
  const { control, handleSubmit, formState } = form;
  const { isValid, isDirty, isSubmitSuccessful } = formState;
  const applyJobMutation = useApplyJob();
  const { jobId } = useParams<{ jobId: string }>();

  const onSubmit = (values: JobApplicationValues) => {
    isValid && jobId ? applyJobMutation.mutate({ data: values, jobId }) : null;
  };

  return (
    <div className="p-0 space-y-6 sm:p-6 sm:border sm:border-border sm:rounded-md">
      <div className="space-y-1">
        <div className="text-2xl font-semibold">Add your credentials</div>
        <p className="text-[0.9375rem] text-light">
          Highlight your experiences to stand out to employers.
        </p>
      </div>

      <Prompt hasUnsavedChanges={isDirty && !isSubmitSuccessful} />

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

          <div className="flex flex-col xs:block">
            <Button type="submit" disabled={applyJobMutation.isLoading}>
              {applyJobMutation.isLoading ? <LoaderSpinner /> : <Send className="h-4 w-4 mr-2" />}
              Submit Application
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default JobApplication;
