"use client"

import * as React from "react"
import { cn } from "@/lib/utils.js" // Ensure .js extension

// Radix's LabelPrimitive.Root is essentially a <label> element.
// We'll create a simple React component that renders a <label>.
// The `cva` variants are Tailwind classes and can be passed via className.
// For now, the labelVariants function itself isn't directly used unless
// we reconstruct its logic or bake the default classes in.
// We will keep it simple and expect styling to be passed via className.

const Label = React.forwardRef(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", // Default classes from labelVariants
        className
      )}
      {...props}
    />
  )
)
Label.displayName = "Label"

export { Label }
