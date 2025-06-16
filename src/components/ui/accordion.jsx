"use client"

import * as React from "react"
import { Collapse as AntCollapse } from "antd"
// import { ChevronDown } from "lucide-react" // AntD Collapse has its own expand icon
import { cn } from "@/lib/utils.js"

const { Panel: AntPanel } = AntCollapse;

// Main Accordion component maps to AntD Collapse
const Accordion = React.forwardRef(
  ({ className, children, type, defaultValue, value, onValueChange, ...props }, ref) => {
    // Map Radix 'type' ("single", "multiple") to AntD 'accordion' prop or activeKey behavior
    // AntD 'accordion' prop means only one panel can be open at a time.
    // Radix 'type="single"' is like AntD 'accordion={true}'.
    // Radix 'type="multiple"' is like AntD default behavior (accordion={false}).
    const isAccordion = type === "single";

    // Map Radix defaultValue/value to AntD defaultActiveKey/activeKey
    // AntD activeKey can be string[] or string. Radix value can be string[] or string.
    let activeKeyProp = {};
    if (value !== undefined) {
      activeKeyProp.activeKey = value;
    } else if (defaultValue !== undefined) {
      activeKeyProp.defaultActiveKey = defaultValue;
    }

    // AntD onChange gives (key: string | string[]) => void
    // Radix onValueChange gives (value: string | string[]) => void
    const handleChange = (key) => {
        if (onValueChange) {
            onValueChange(key);
        }
    };

    return (
      <AntCollapse
        accordion={isAccordion}
        onChange={handleChange}
        className={cn(className)}
        ref={ref}
        {...activeKeyProp}
        {...props} // Spread other Collapse props
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type.displayName === "AccordionItem") {
            // Pass down necessary props to AccordionItem which will render an AntPanel
            return React.cloneElement(child, {
              // AntPanel needs a key, AccordionItem value is suitable
              // This assumes AccordionItem has a 'value' prop that's unique
              key: child.props.value,
            });
          }
          return null; // Or child, if want to allow non-AccordionItems
        })}
      </AntCollapse>
    );
  }
);
Accordion.displayName = "Accordion";


// AccordionItem maps to AntD Collapse.Panel
const AccordionItem = React.forwardRef(
  ({ className, children, value, ...props }, ref) => { // `value` prop from Radix is used as `key` for Panel
    let header = null;
    let contentChildren = null;

    // Extract AccordionTrigger (for header) and AccordionContent
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        if (child.type.displayName === "AccordionTrigger") {
          header = child.props.children; // The actual content of the trigger
        } else if (child.type.displayName === "AccordionContent") {
          contentChildren = child.props.children;
        }
      }
    });

    return (
      <AntPanel
        key={value} // Key is crucial for Collapse
        header={header}
        className={cn("border-b", className)} // Original Radix item class
        ref={ref}
        {...props} // Spread other Panel props
      >
        {contentChildren}
      </AntPanel>
    );
  }
);
AccordionItem.displayName = "AccordionItem";

// AccordionTrigger: Its children become the 'header' for AntPanel.
// This component might not be directly rendered but its props/children used by AccordionItem.
const AccordionTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    // This component is mostly conceptual for data extraction by AccordionItem.
    // If rendered directly, it's a div.
    // The ChevronDown icon is implicitly handled by AntD Panel.
    return (
      <div
        ref={ref}
        // Removed Radix-specific styling like hover:underline, [&[data-state=open]>svg]:rotate-180
        // AntD Panel handles its own trigger styling and icons.
        className={cn("flex flex-1 items-center justify-between py-4 font-medium", className)}
        {...props}
      >
        {children}
        {/* <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" /> */}
      </div>
    );
  }
);
AccordionTrigger.displayName = "AccordionTrigger";


// AccordionContent: Its children become the content of AntPanel.
// This component might not be directly rendered.
const AccordionContent = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    // This component is mostly conceptual.
    // Radix animations (accordion-up, accordion-down) are replaced by AntD's.
    return (
      <div
        ref={ref}
        // Removed Radix data-state animations
        className={cn("overflow-hidden text-sm", className)} // Simplified classes
        {...props}
      >
        <div className={cn("pb-4 pt-0")}>{children}</div>
      </div>
    );
  }
);
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
