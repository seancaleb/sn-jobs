/* eslint-disable @typescript-eslint/no-misused-promises */
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DevTool } from "@hookform/devtools";
import FormSelectField from "@/components/FormSelectField/FormSelectField";
import { useEffect } from "react";
import { updateQueryParams } from "@/lib/utils";
import { useSearchParams } from "react-router-dom";

const fromAgeOptions = [
  { value: "1", label: "Last 24 hours" },
  { value: "3", label: "Last 3 days" },
  { value: "7", label: "Last 7 days" },
  { value: "14", label: "Last 14 days" },
];

const filterSchema = z.object({
  fromAge: z.union([z.enum(["1", "3", "7", "14"]), z.literal("")]),
});

type FilterValues = z.infer<typeof filterSchema>;

type JobsFilterProps = {
  fromAge: string;
};

const JobsFilter = ({ fromAge }: JobsFilterProps) => {
  const form = useForm<FilterValues>({
    defaultValues: {
      fromAge: "",
    },
    resolver: zodResolver(filterSchema),
  });
  const { control, reset } = form;
  const [, setSearchParams] = useSearchParams();

  const onChangeCallback = (value: string) => {
    updateQueryParams(setSearchParams, [
      { key: "fromAge", value },
      { key: "page", value: "1" },
    ]);
  };

  useEffect(() => {
    reset({ fromAge: fromAge ? (fromAge as FilterValues["fromAge"]) : "" });
  }, [fromAge, reset]);

  return (
    <>
      <Form {...form}>
        <form id="filter-form" role="form" noValidate className="flex flex-col sm:flex-row gap-4">
          <FormSelectField
            control={control}
            name="fromAge"
            placeholder="Date Posted"
            options={fromAgeOptions}
            onChangeCallback={onChangeCallback}
          />
        </form>
      </Form>
      <DevTool control={control} />
    </>
  );
};

export default JobsFilter;
