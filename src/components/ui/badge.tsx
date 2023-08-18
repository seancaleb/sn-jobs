import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Eye, Frown, Send } from "lucide-react";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        applied:
          "border-transparent bg-gradient-to-r from-blue-600/5 to-indigo-600/5 text-blue-500",
        "application-viewed":
          "border-transparent bg-gradient-to-r from-green-600/5 to-emerald-600/5 text-green-500",
        "not-selected":
          "border-transparent bg-gradient-to-r from-red-600/5 to-orange-600/5 text-red-500",
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
      {variant === "applied" ? <Send className="h-4 w-4 mr-2" /> : null}
      {variant === "application-viewed" ? <Eye className="h-4 w-4 mr-2" /> : null}
      {variant === "not-selected" ? <Frown className="h-4 w-4 mr-2" /> : null}
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
