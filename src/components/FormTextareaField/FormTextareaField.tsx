import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ComponentProps, ReactNode } from "react";
import { Textarea } from "@/components/ui/textarea";

type FormTextareaProps<T extends FieldValues> = {
  control: UseFormReturn<T>["control"];
  name: Path<T>;
  label?: string;
  type?: string;
  placeholder?: string;
  TextareaProps?: ComponentProps<typeof Textarea>;
  children?: ReactNode;
};

const FormTextarea = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "",
  TextareaProps,
  children,
}: FormTextareaProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="flex-1">
        {label && <FormLabel>{label}</FormLabel>}
        <FormControl>
          <Textarea
            placeholder={placeholder}
            className="resize-none"
            rows={8}
            {...field}
            {...TextareaProps}
          />
        </FormControl>
        {children}
        <FormMessage />
      </FormItem>
    )}
  />
);

export default FormTextarea;
