import * as React from "react"
import { Input as AntInput } from "antd"
import { cn } from "@/lib/utils.js" // Ensure .js extension

const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    // AntD Input has its own styling. We'll pass through className for overrides.
    // Type prop is standard for AntInput.
    // Specific styling classes from the original component like "flex h-10..."
    // might not all apply directly or might conflict. AntD handles sizing and basic styling.
    // For now, we preserve `cn` for any custom classes the user might add.
    return (
      <AntInput
        type={type}
        className={cn(className)} // Original classes might need review for compatibility with AntD
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
