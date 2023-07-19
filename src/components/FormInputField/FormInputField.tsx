import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ComponentProps, ReactNode } from "react";

type FormInputFieldProps<T extends FieldValues> = {
  control: UseFormReturn<T>["control"];
  name: Path<T>;
  label?: string;
  type?: string;
  placeholder?: string;
  InputProps?: ComponentProps<typeof Input>;
  children?: ReactNode;
};

const FormInputField = <T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  placeholder = "",
  InputProps,
  children,
}: FormInputFieldProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="flex-1">
        {label && <FormLabel>{label}</FormLabel>}
        <FormControl>
          <Input type={type} placeholder={placeholder} {...field} {...InputProps} />
        </FormControl>
        {children}
        <FormMessage />
      </FormItem>
    )}
  />
);

export default FormInputField;
