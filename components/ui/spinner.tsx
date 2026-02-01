import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  spinnerClass?: string;
}

const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, spinnerClass, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-center h-full", className)}
        {...props}
      >
        <div
          className={cn(
            "w-6 h-6 border-4 border-blue-500 border-dashed rounded-full animate-spin",
            spinnerClass
          )}
        ></div>
      </div>
    );
  }
);

Spinner.displayName = "Spinner"; // Set displayName for better debugging

export default Spinner;
