import * as React from "react"
import { Card as AntCard } from "antd"
import { cn } from "@/lib/utils.js"

// Original Card component and its parts
// const OriginalCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />);
// const OriginalCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />);
// const OriginalCardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />);
// const OriginalCardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />);
// const OriginalCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />);
// const OriginalCardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />);

const Card = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    let title = null;
    let extra = null; // AntD card has 'extra' prop for things like buttons in header
    const contentChildren = [];
    let footerContent = null;

    // Iterate over children to map them to AntD Card structure
    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child)) {
        contentChildren.push(child);
        return;
      }

      // Check child displayNames or types if possible, though this is fragile.
      // A more robust way would be to require specific props or structure if Card parts are used.
      // For this conversion, we assume children might be instances of the old Card parts.
      // This is a best-effort mapping.

      // Simplified: Look for props that might indicate a title or footer
      // This part is heuristic. A better approach for consumers would be to pass props directly.
      if (child.type && child.type.displayName === "CardHeader") {
        React.Children.forEach(child.props.children, headerChild => {
          if (React.isValidElement(headerChild)) {
            if (headerChild.type && headerChild.type.displayName === "CardTitle") {
              title = headerChild.props.children;
            } else if (headerChild.type && headerChild.type.displayName === "CardDescription") {
              // AntD title can be a ReactNode. We can combine Title and Description.
              title = (
                <>
                  {title}
                  <div style={{ fontSize: '0.85em', color: 'grey' }}>{headerChild.props.children}</div>
                </>
              );
            } else {
              // Other elements in header could be 'extra'
              extra = extra ? <>{extra}{headerChild}</> : headerChild;
            }
          } else {
             contentChildren.push(headerChild); // Or treat as part of title if simple string
          }
        });
      } else if (child.type && child.type.displayName === "CardContent") {
        contentChildren.push(child.props.children);
      } else if (child.type && child.type.displayName === "CardFooter") {
        footerContent = child.props.children;
      } else if (child.type && child.type.displayName === "CardTitle") { // Direct CardTitle without CardHeader
        title = child.props.children;
      } else {
        contentChildren.push(child);
      }
    });

    return (
      <AntCard
        title={title}
        extra={extra}
        className={cn(className)} // Original Card classes might need review
        ref={ref}
        {...props} // Pass other HTML attributes
      >
        {contentChildren}
        {footerContent && <div>{footerContent}</div>}
      </AntCard>
    );
  }
);
Card.displayName = "Card";

// Exporting individual parts is not standard for AntD's Card.
// Users should compose content within the main Card component.
// For compatibility, we can provide simple div wrappers that apply old classes,
// but they won't be AntD structures.
const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
));
CardFooter.displayName = "CardFooter";


export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
