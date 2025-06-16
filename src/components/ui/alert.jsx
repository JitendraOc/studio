import * as React from "react"
import { Alert as AntAlert } from "antd"
import { cn } from "@/lib/utils.js"

// Mapping Radix variants to AntD types
const getAntdAlertType = (variant) => {
  if (variant === "destructive") {
    return "error";
  }
  // Add more mappings if other variants exist (e.g., "warning", "success")
  // For "default" variant, AntD's "info" or no type (default) can be used.
  // Let's use "info" as a sensible default if not "destructive".
  return "info";
};

const Alert = React.forwardRef(
  ({ className, variant, children, ...props }, ref) => {
    let message = null;
    let description = null;
    const otherChildren = [];

    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        if (child.type && child.type.displayName === "AlertTitle") {
          message = child.props.children;
        } else if (child.type && child.type.displayName === "AlertDescription") {
          description = child.props.children;
        } else {
          otherChildren.push(child); // Should not happen if used as intended
        }
      } else {
        otherChildren.push(child); // Strings or other nodes as description or part of it
      }
    });

    // If only non-AlertTitle/Description children are present, they become the description
    if (!message && !description && otherChildren.length > 0) {
        description = <>{otherChildren}</>;
    } else if (message && !description && otherChildren.length > 0) {
        // If there's a title and also other direct children, append them to description.
        // This case might be rare.
        description = <>{otherChildren}</>;
    }


    return (
      <AntAlert
        message={message}
        description={description}
        type={getAntdAlertType(variant)}
        className={cn(className)} // Original classes might need review for compatibility
        showIcon // Defaulting to show icon, common for alerts
        ref={ref}
        {...props} // Be cautious with spreading all props
      />
    );
  }
);
Alert.displayName = "Alert";

// AlertTitle and AlertDescription are now helper components to structure content for the main Alert.
// They don't render directly but their children are extracted by the main Alert component.
// For direct usage, they can render a simple div/h5, but their main role is data extraction.
const AlertTitle = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    // This component's children will be extracted as 'message' for AntAlert
    // If used standalone, it's just a styled heading.
    <h5
      ref={ref}
      className={cn("mb-1 font-medium leading-none tracking-tight", className)}
      {...props}
    >
      {children}
    </h5>
  )
);
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    // This component's children will be extracted as 'description' for AntAlert
    // If used standalone, it's just a styled div.
    <div
      ref={ref}
      className={cn("text-sm [&_p]:leading-relaxed", className)}
      {...props}
    >
      {children}
    </div>
  )
);
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
