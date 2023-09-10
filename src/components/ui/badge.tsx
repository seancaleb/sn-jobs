import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        outline: "text-foreground",
        applied:
          "border-transparent bg-gradient-to-r from-blue-600/5 to-indigo-600/5 text-blue-500",
        "application-viewed":
          "border-transparent bg-gradient-to-r from-green-600/5 to-emerald-600/5 text-green-500",
        "not-selected":
          "border-transparent bg-gradient-to-r from-red-600/5 to-orange-600/5 text-red-500",
        primary: "border-transparent bg-gradient-to-r from-teal-600/5 to-cyan-600/5 text-teal-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
