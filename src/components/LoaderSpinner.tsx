import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { ComponentProps } from "react";

type LoaderSpinnerProps = ComponentProps<typeof Loader2>;

const LoaderSpinner = ({ className, ...props }: LoaderSpinnerProps) => {
  return <Loader2 className={cn("mr-2 h-4 w-4 animate-spin", className)} {...props} />;
};

export default LoaderSpinner;
