/* eslint-disable @typescript-eslint/no-misused-promises */
import { useFieldArray, useForm } from "react-hook-form";
import { MutateJobValues, mutateJobSchema, defaultCities } from "./MutateJob.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import FormInputField from "@/components/FormInputField/FormInputField";
import FormTextarea from "@/components/FormTextareaField/FormTextareaField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import FormSelectField from "@/components/FormSelectField/FormSelectField";
import { useCreateNewJobPost, useUpdateJobPost } from "@/api/employer/employer";
import LoaderSpinner from "@/components/LoaderSpinner";
import { JobDetails } from "@/api/jobs/jobs.type";
import { z } from "zod";
import { useState } from "react";
import UnsavedChangesDialog from "@/components/UnsavedChangesDialog";
import { useNavigate } from "react-router-dom";
import { Save } from "lucide-react";
import Prompt from "@/components/Prompt";

type MutateJobProps = {
  mode?: "edit" | "create";
  job?: JobDetails;
};

const defaultValues = {
  title: "",
  description: "",
  requirements: [{ requirement: "" }],
};

const MutateJob = ({ mode = "create", job }: MutateJobProps) => {
  const form = useForm<MutateJobValues>({
    defaultValues:
      mode === "create"
        ? defaultValues
        : {
            title: job?.title,
            description: job?.description,
            location: job?.location as z.infer<typeof mutateJobSchema>["location"],
            requirements: job?.requirements.map((req) => ({ requirement: req })),
          },
    resolver: zodResolver(mutateJobSchema),
  });
  const { control, handleSubmit, register, formState } = form;
  const { errors, isDirty, isSubmitSuccessful } = formState;
  const createJobMutation = useCreateNewJobPost();
  const updateJobMutation = useUpdateJobPost();
  const [isOpenUnsavedChanges, setIsOpenUnsavedChanges] = useState(false);
  const navigate = useNavigate();

  const { fields, append, remove } = useFieldArray({
    name: "requirements",
    control,
  });

  const onSubmit = (values: MutateJobValues) => {
    const modifiedRequirements = values.requirements.map((req) => req.requirement);

    const updatedValues = {
      ...values,
      requirements: modifiedRequirements,
    };

    if (mode === "create") createJobMutation.mutate({ data: updatedValues });
    else updateJobMutation.mutate({ data: updatedValues, jobId: job?.jobId as string });
  };

  const navigateOutOfMutate = () => {
    return mode === "create"
      ? navigate("/employer/job-listings", { replace: true })
      : navigate(`/employer/job-listings/${job?.jobId as string}`, { replace: true });
  };

  const handleUnsavedOnClose = () => {
    setIsOpenUnsavedChanges(false);
    navigateOutOfMutate();
  };

  const handleEditOnClose = () => {
    if (isDirty) setIsOpenUnsavedChanges(true);
    else navigateOutOfMutate();
  };

  return (
    <>
      {isOpenUnsavedChanges ? null : <Prompt hasUnsavedChanges={isDirty && !isSubmitSuccessful} />}
      <Form {...form}>
        <form
          id="mutate-job-form"
          role="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="flex gap-5 items-start"
        >
          <div className="flex flex-col gap-5 flex-1">
            <FormInputField
              control={control}
              name="title"
              placeholder="Enter job title"
              label="Job title"
            />

            <FormSelectField
              control={control}
              label="Location"
              name="location"
              placeholder="Select location"
              description=" Select a designated location for this new job opportunity."
              options={defaultCities.map((val) => ({ value: val, label: val }))}
            />

            <FormTextarea
              control={control}
              name="description"
              placeholder="Enter job description"
              label="Job description"
            />
          </div>

          <div className="flex-1 space-y-5">
            <FormItem>
              <FormLabel>List of requirements</FormLabel>
              <div className="space-y-8">
                {fields.map((field, index) => {
                  return (
                    <div key={field.id} className="flex gap-4">
                      <div className="space-y-2 w-full">
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter job requirement"
                            {...register(`requirements.${index}.requirement` as const)}
                          />
                        </FormControl>
                        <FormMessage>
                          {errors.requirements?.[index]?.requirement?.message}
                        </FormMessage>
                      </div>
                      {index > 0 ? (
                        <Button
                          size="icon"
                          variant="outline"
                          type="button"
                          onClick={() => remove(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </FormItem>
            <Button type="button" variant="outline" onClick={() => append({ requirement: "" })}>
              <Plus className="h-4 w-4 mr-2" />
              Requirement
            </Button>
          </div>

          <div className="absolute top-0 right-0 flex gap-3">
            <Button variant="secondary" type="button" onClick={handleEditOnClose}>
              Cancel
            </Button>
            {mode === "create" ? (
              <Button type="submit" disabled={createJobMutation.isLoading}>
                {createJobMutation.isLoading ? (
                  <LoaderSpinner />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save Changes
              </Button>
            ) : (
              <Button type="submit" disabled={updateJobMutation.isLoading || !isDirty}>
                {updateJobMutation.isLoading ? (
                  <LoaderSpinner />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save Changes
              </Button>
            )}
          </div>
        </form>
      </Form>

      <UnsavedChangesDialog
        isOpen={isOpenUnsavedChanges}
        setIsOpen={setIsOpenUnsavedChanges}
        onClose={handleUnsavedOnClose}
      />
    </>
  );
};

export default MutateJob;
