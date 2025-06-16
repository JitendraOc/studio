"use client"

import * as React from "react"
import { Checkbox as AntCheckbox } from "antd"
// import { Check } from "lucide-react" // AntD Checkbox has its own check mark
import { cn } from "@/lib/utils.js"

const Checkbox = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    // Radix CheckboxPrimitive.Root has specific styling for peer, border, ring, data-state.
    // AntD Checkbox has its own styling. We'll pass className for overrides.
    // The CheckboxPrimitive.Indicator with the Check icon is internal to AntD's Checkbox.

    // Mapping props:
    // Radix 'checked' can be boolean or 'indeterminate'. AntD 'checked' is boolean, 'indeterminate' is a separate prop.
    // Radix onCheckedChange: (checked: boolean | 'indeterminate') => void
    // AntD onChange: (e: CheckboxChangeEvent) => void where e.target.checked is boolean.
    //                 And indeterminate is a separate boolean prop.

    const { checked, onCheckedChange, ...restProps } = props;

    let antChecked = false;
    let antIndeterminate = false;

    if (checked === 'indeterminate') {
      antIndeterminate = true;
    } else {
      antChecked = Boolean(checked);
    }

    const handleChange = (e) => {
      if (onCheckedChange) {
        // If the original component expected 'indeterminate' state changes via onCheckedChange,
        // this needs careful handling as AntD treats indeterminate purely visually.
        // For now, assume onCheckedChange expects a boolean.
        onCheckedChange(e.target.checked);
      }
    };

    return (
      <AntCheckbox
        ref={ref}
        className={cn(
          // "peer h-4 w-4 shrink-0 rounded-sm border border-primary...", // Original Radix classes
          // These are largely incompatible with AntD's Checkbox structure and styling.
          // Rely on AntD's styling and use `className` for minor adjustments or for a wrapper.
          className
        )}
        checked={antChecked}
        indeterminate={antIndeterminate}
        onChange={handleChange}
        {...restProps} // Pass other standard HTML attributes
      >
        {/* AntD Checkbox can have a label passed as children */}
        {children}
      </AntCheckbox>
    );
  }
);
Checkbox.displayName = "Checkbox"; // Was CheckboxPrimitive.Root.displayName

export { Checkbox };
