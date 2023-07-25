import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { nanoid } from "@reduxjs/toolkit";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";

type FormSelectFieldProps<T extends FieldValues> = {
  control: UseFormReturn<T>["control"];
  name: Path<T>;
  label?: string;
  placeholder: string;
  description?: string;
  options: { value: string; label: string }[];
  onChangeCallback?: (value: string) => void;
};

const FormSelectField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  options,
  onChangeCallback,
}: FormSelectFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <Select
            onValueChange={(e: PathValue<T, Path<T>>) => {
              field.onChange(e);
              onChangeCallback && onChangeCallback(e);
            }}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue>
                  {field.value
                    ? options.find((option) => option.value === field.value)?.label
                    : placeholder}
                </SelectValue>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map(({ value, label }) => (
                <SelectItem key={nanoid()} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormSelectField;
