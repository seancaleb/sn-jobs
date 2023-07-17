import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReactNode } from "react";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";

type FormSelectFieldProps<T extends FieldValues> = {
  control: UseFormReturn<T>["control"];
  name: Path<T>;
  label: string;
  children?: ReactNode;
  placeholder: string;
};

const FormSelectField = <T extends FieldValues>({
  control,
  name,
  label,
  children,
  placeholder,
}: FormSelectFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={(e) => field.onChange(e as PathValue<T, Path<T>>)}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="user">Jobseeker</SelectItem>
              <SelectItem value="employer">Employer</SelectItem>
            </SelectContent>
          </Select>
          {children}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormSelectField;
