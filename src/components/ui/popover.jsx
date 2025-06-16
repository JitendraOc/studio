"use client"

import * as React from "react"
import { Popover as AntPopover } from "antd"
import { cn } from "@/lib/utils.js"

// Helper to map Radix align and side to AntD placement
const getAntdPlacement = (align, side) => {
  // Radix align: "start", "center", "end"
  // Radix side: "top", "bottom", "left", "right"
  // AntD placement: "topLeft", "top", "topRight", "leftTop", "left", "leftBottom",
  //                 "rightTop", "right", "rightBottom", "bottomLeft", "bottom", "bottomRight"
  side = side || "bottom"; // Default side if not specified
  align = align || "center";

  if (side === "top") {
    if (align === "start") return "topLeft";
    if (align === "end") return "topRight";
    return "top";
  }
  if (side === "bottom") {
    if (align === "start") return "bottomLeft";
    if (align === "end") return "bottomRight";
    return "bottom";
  }
  if (side === "left") {
    if (align === "start") return "leftTop"; // AntD calls this leftTop
    if (align === "end") return "leftBottom";
    return "left";
  }
  if (side === "right") {
    if (align === "start") return "rightTop";
    if (align === "end") return "rightBottom";
    return "right";
  }
  return "bottom"; // Default
};


const Popover = React.forwardRef(
  ({ children, className, open, onOpenChange, modal, ...props }, ref) => {
    // Radix PopoverPrimitive.Root props: open, onOpenChange, defaultOpen, modal
    // AntD Popover props: open, onOpenChange, defaultOpen, trigger (click, hover, etc.)
    // AntD Popover doesn't have a direct 'modal' prop in the same way, it's always non-modal.

    let triggerElement = null;
    let contentElement = null;
    let contentProps = {};

    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        if (child.type.displayName === "PopoverTrigger") {
          triggerElement = child.props.children;
        } else if (child.type.displayName === "PopoverContent") {
          contentElement = child.props.children;
          // Capture props from PopoverContent to pass to AntPopover
          contentProps = {
            align: child.props.align,
            side: child.props.side, // Assuming 'side' might be a prop on PopoverContent
            sideOffset: child.props.sideOffset,
            className: child.props.className // This is overlayClassName for AntD
          };
        }
      }
    });

    const antdPlacement = getAntdPlacement(contentProps.align, contentProps.side);

    // Props to pass to AntPopover
    const antPopoverProps = {
      open,
      onOpenChange, // AntD uses onOpenChange, maps to Radix's onOpenChange
      // defaultOpen is also a valid prop for AntD
      content: contentElement,
      placement: antdPlacement,
      overlayClassName: cn(
        // "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none...", // Original Radix content classes
        // These are for the popover overlay. AntD has its own styling.
        contentProps.className
      ),
      // trigger: "click", // Default, can be customized
      ref, // Forward ref to AntPopover if needed, though AntPopover itself doesn't take a ref directly for the popover.
             // Ref is usually for the trigger element.
      ...props // Spread other PopoverPrimitive.Root props if they map.
    };

    // Filter out undefined props that AntPopover might not like
    if (open === undefined) delete antPopoverProps.open;
    if (onOpenChange === undefined) delete antPopoverProps.onOpenChange;


    return (
      <AntPopover {...antPopoverProps}>
        {triggerElement}
      </AntPopover>
    );
  }
);
Popover.displayName = "Popover";


// PopoverTrigger: Its children become the trigger for AntPopover.
// This component is mostly conceptual for data extraction.
const PopoverTrigger = ({ children, ...props }) => {
  // If used directly, it's just a wrapper.
  // In the context of Popover, its children are extracted.
  return <span {...props}>{children}</span>; // Using span as a default wrapper
};
PopoverTrigger.displayName = "PopoverTrigger";


// PopoverContent: Its children become the 'content' for AntPopover.
// This component is mostly conceptual.
const PopoverContent = React.forwardRef(
  ({ className, children, align = "center", sideOffset = 4, ...props }, ref) => {
    // Props like align, sideOffset are used by the main Popover component.
    // If rendered directly, it's just a div.
    // Radix animations (animate-in, fade-out, etc.) are replaced by AntD's.
    return (
      <div
        ref={ref}
        className={cn(
          "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none",
          className
        )} // Fallback direct rendering style
        {...props}
      >
        {children}
      </div>
    );
  }
);
PopoverContent.displayName = "PopoverContent";

export { Popover, PopoverTrigger, PopoverContent };
