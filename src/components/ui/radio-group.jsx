"use client"

import * as React from "react"
import { Radio as AntRadio } from "antd"
// import * as RadioGroupPrimitive from "@radix-ui/react-radio-group" // Replaced
// import { Circle } from "lucide-react" // AntD Radio has its own indicator
import { cn } from "@/lib/utils.js"

const RadioGroup = React.forwardRef(
  ({ className, children, value, defaultValue, onValueChange, ...props }, ref) => {
    // Radix RadioGroupPrimitive.Root props: value, defaultValue, onValueChange, disabled, name, required, orientation, dir, loop
    // AntD Radio.Group props: value, defaultValue, onChange, disabled, name, options (for simpler structures), optionType (button), buttonStyle

    const handleChange = (e) => {
      if (onValueChange) {
        onValueChange(e.target.value);
      }
    };

    // If children are RadioGroupItem, they need to be mapped to AntRadio components.
    // AntD Radio.Group can take Radio components as children or an 'options' array.
    // We'll assume children are RadioGroupItem components.
    const radioOptions = React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type.displayName === "RadioGroupItem") {
            // Pass down props from RadioGroupItem to AntRadio
            // The label for AntRadio is its children. Radix RadioGroupItem usually doesn't have children.
            // If label is needed, it should be passed to RadioGroupItem.
            return (
                <AntRadio
                    key={child.props.value} // value is used as key
                    value={child.props.value}
                    disabled={child.props.disabled}
                    // className={cn(child.props.className)} // className on individual radio might be tricky
                >
                    {/* If RadioGroupItem had a label as child, it would go here */}
                    {child.props.children}
                </AntRadio>
            );
        }
        return null; // Or child, if want to allow other elements
    });


    return (
      <AntRadio.Group
        ref={ref}
        className={cn("grid gap-2", className)} // Original Radix class "grid gap-2"
                                               // AntD Radio.Group has its own layout (default horizontal)
                                               // For vertical, use CSS or wrap each Radio in a div.
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        {...props} // Spread other Radio.Group compatible props (e.g. disabled, name)
      >
          {radioOptions}
      </AntRadio.Group>
    );
  }
);
RadioGroup.displayName = "RadioGroup"; // Was RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef(
  ({ className, value, children, ...props }, ref) => {
    // This component is now conceptually part of RadioGroup's children mapping.
    // If used directly, it should render an AntRadio.
    // The styling from Radix (aspect-square, h-4, w-4, rounded-full, border, etc.)
    // is replaced by AntD's Radio styling.
    // The Circle indicator is also internal to AntD Radio.
    return (
      <AntRadio
        ref={ref}
        value={value} // Crucial prop for AntRadio within a Group
        className={cn(
          // "aspect-square h-4 w-4 rounded-full border border-primary...", // Original Radix classes
          // These are largely incompatible with AntD's Radio structure.
          className
        )}
        {...props} // Spread other AntRadio compatible props
      >
        {children} {/* Label for the radio button */}
      </AntRadio>
    );
  }
);
RadioGroupItem.displayName = "RadioGroupItem"; // Was RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem };
