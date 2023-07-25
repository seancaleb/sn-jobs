/* eslint-disable @typescript-eslint/no-misused-promises */
import { Form } from "@/components/ui/form";
import FormInputField from "@/components/FormInputField/FormInputField";
import FormCombobox from "@/components/FormCombobox/FormCombobox";
import { DevTool } from "@hookform/devtools";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { displayErrorNotification } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import useNotification from "@/features/notification/useNotification";
import { useAppSelector } from "@/app/hooks";
import { selectNotification } from "@/features/notification/notificationSlice";

const locations = [
  { value: "manila", label: "Manila" },
  { value: "makati city", label: "Makati City" },
  { value: "taguig city", label: "Taguig City" },
  { value: "pasig city", label: "Pasig City" },
  { value: "quezon city", label: "Quezon City" },
];

const querySchema = z.object({
  keyword: z.string(),
  location: z.union([
    z.enum(["manila", "makati city", "taguig city", "pasig city", "quezon city"]),
    z.literal(""),
  ]),
});

type QueryValues = z.infer<typeof querySchema>;

type SearchJobProps = {
  keyword: string | null;
  location: string | null;
};

const SearchJob = ({ keyword, location }: SearchJobProps) => {
  const form = useForm<QueryValues>({
    defaultValues: {
      keyword: "",
      location: "",
    },
    resolver: zodResolver(querySchema),
  });
  const { control, handleSubmit, setValue, getValues, reset } = form;
  const [, setSearchParams] = useSearchParams();
  const { toast, dismiss } = useToast();
  const { initNotificationId } = useNotification();
  const { id } = useAppSelector(selectNotification);
  const navigate = useNavigate();
  const urlLocation = useLocation();

  const onSubmit = (values: QueryValues) => {
    id && dismiss(id);

    const emptySearchOptions = !getValues("location") && !getValues("keyword");
    const containsSearchParams =
      urlLocation.search.includes("keyword") || urlLocation.search.includes("location");

    if (emptySearchOptions && !containsSearchParams) {
      displayErrorNotification(
        "Start your job search!: Enter a job title or location to start a search",
        toast,
        initNotificationId
      );

      containsSearchParams && navigate("/jobs");
    } else {
      const valuesEntries = Object.entries(values).filter((arr) => !!arr[1]);
      setSearchParams(valuesEntries);
    }
  };

  useEffect(() => {
    if (!urlLocation.search) {
      reset({ keyword: "", location: "" });
    } else {
      reset({
        keyword: keyword ? keyword : "",
        location: location ? (location as QueryValues["location"]) : "",
      });
    }
  }, [urlLocation, reset, keyword, location]);

  return (
    <>
      {/* Search  */}
      <Form {...form}>
        <form
          id="search-form"
          role="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col sm:flex-row gap-4 max-w-3xl w-full"
        >
          <FormInputField control={control} name="keyword" placeholder="Job titles or keyword" />

          <FormCombobox
            control={control}
            name="location"
            placeholder="Select location"
            setValue={setValue}
            options={locations}
            btnPlaceholder="Select a location"
            notFoundMessage="Location not found."
          />

          <Button type="submit">Find jobs</Button>
        </form>
      </Form>
      <DevTool control={control} />
    </>
  );
};

export default SearchJob;
