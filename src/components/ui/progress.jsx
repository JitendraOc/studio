"use client"

import * as React from "react"
import { Progress as AntProgress } from "antd"
// import * as ProgressPrimitive from "@radix-ui/react-progress" // Replaced by AntProgress
import { cn } from "@/lib/utils.js"

const Progress = React.forwardRef(
  ({ className, value, ...props }, ref) => {
    // Radix ProgressPrimitive.Root has specific styling for the container and indicator.
    // AntD Progress has its own styling and structure.
    // The `value` prop (0-100) in Radix maps to `percent` (0-100) in AntD.

    // Radix styling like "relative h-4 w-full overflow-hidden rounded-full bg-secondary"
    // and indicator styling "h-full w-full flex-1 bg-primary transition-all"
    // will be replaced by AntD's default Progress appearance.
    // Customizations can be done via `className` or AntD specific props like `strokeColor`.

    return (
      <AntProgress
        percent={value || 0}
        className={cn(
          // "relative h-4 w-full overflow-hidden rounded-full bg-secondary", // Original Radix root class
          // This may or may not apply well to AntD's structure.
          className
        )}
        // AntD Progress shows percentage text by default. To hide: showInfo={false}
        // props.showInfo can be passed if needed.
        ref={ref} // AntD Progress might not use ref in the same way as Radix for the root.
                  // Ref usually applies to the outermost element.
        {...props} // Spread other AntProgress compatible props
      />
    );
  }
);
Progress.displayName = "Progress"; // Was ProgressPrimitive.Root.displayName

export { Progress };
