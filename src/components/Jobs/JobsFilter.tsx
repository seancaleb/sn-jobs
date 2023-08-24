/* eslint-disable @typescript-eslint/no-misused-promises */
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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

const sortByOptions = [
  { value: "createdAt", label: "Date" },
  { value: "updatedAt", label: "Relevance" },
];

const filterSchema = z.object({
  fromAge: z.union([z.enum(["1", "3", "7", "14"]), z.literal("")]),
  sortBy: z.union([z.enum(["createdAt", "updatedAt"]), z.literal("")]),
});

type FilterValues = z.infer<typeof filterSchema>;

const JobsFilter = () => {
  const form = useForm<FilterValues>({
    defaultValues: {
      fromAge: "",
      sortBy: "",
    },
    resolver: zodResolver(filterSchema),
  });
  const { control, reset } = form;
  const [searchParams, setSearchParams] = useSearchParams();

  const onChangeCallback = (key: string, value: string) => {
    updateQueryParams(setSearchParams, [
      { key, value },
      { key: "page", value: "1" },
    ]);
  };

  useEffect(() => {
    const fromAge = searchParams.get("fromAge");
    const sortBy = searchParams.get("sortBy");

    reset({
      fromAge: fromAge ? (fromAge as FilterValues["fromAge"]) : "",
      sortBy: sortBy ? (sortBy as FilterValues["sortBy"]) : "",
    });
  }, [reset, searchParams]);

  return (
    <>
      <Form {...form}>
        <form id="filter-form" role="form" noValidate className="flex gap-2">
          <FormSelectField
            control={control}
            name="sortBy"
            placeholder="Sort By"
            options={sortByOptions}
            onChangeCallback={onChangeCallback}
          />

          <FormSelectField
            control={control}
            name="fromAge"
            placeholder="Date Posted"
            options={fromAgeOptions}
            onChangeCallback={onChangeCallback}
          />
        </form>
      </Form>
    </>
  );
};

export default JobsFilter;
