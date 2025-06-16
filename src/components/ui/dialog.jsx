"use client"

import * as React from "react"
import { Modal as AntModal } from "antd"
import { X } from "lucide-react" // Retained for custom close button if needed
import { cn } from "@/lib/utils.js"

// Helper to find specific children, similar to how we approached Card
const findChild = (children, displayName) => {
  return React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type.displayName === displayName
  );
};

const Dialog = ({ open, onOpenChange, children, ...props }) => {
  // Props for AntModal
  let modalTitle = null;
  let modalFooter = null;
  const modalContentChildren = [];

  // Iterate through children to find parts like DialogHeader, DialogContent, DialogFooter
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) {
      modalContentChildren.push(child);
      return;
    }

    // This is a simplified mapping. A more direct usage of AntModal is usually preferred.
    if (child.type.displayName === "DialogContent") {
      // Process children of DialogContent
      React.Children.forEach(child.props.children, (contentChild) => {
        if (React.isValidElement(contentChild)) {
          if (contentChild.type.displayName === "DialogHeader") {
            const titleChild = findChild(contentChild.props.children, "DialogTitle");
            if (titleChild) {
              modalTitle = titleChild.props.children;
            }
            // Description could be appended to title or put in content
            const descriptionChild = findChild(contentChild.props.children, "DialogDescription");
            if (descriptionChild) {
              modalTitle = (
                <>
                  {modalTitle}
                  <div style={{ fontSize: '0.85em', color: 'grey', fontWeight: 'normal' }}>
                    {descriptionChild.props.children}
                  </div>
                </>
              );
            }
          } else if (contentChild.type.displayName === "DialogFooter") {
            modalFooter = contentChild.props.children;
          } else if (contentChild.type.displayName !== "DialogClose") { // Assuming DialogClose is handled by Modal's default
            modalContentChildren.push(contentChild);
          }
        } else {
          modalContentChildren.push(contentChild);
        }
      });
      // Pass along DialogContent's own props like className
      // This is tricky because AntModal has its own structure.
      // For now, we'll ignore className on DialogContent itself, apply to Modal.
    } else if (child.type.displayName !== "DialogTrigger" && child.type.displayName !== "DialogClose") {
      // If children are passed directly to Dialog without DialogContent wrapper
      modalContentChildren.push(child);
    }
  });

  // Fallback if title wasn't found in a structured way
  if (!modalTitle) {
     const directTitle = findChild(children, "DialogTitle") || findChild(findChild(children, "DialogHeader")?.props.children, "DialogTitle");
     if(directTitle) modalTitle = directTitle.props.children;
  }
   if (!modalFooter) {
     const directFooter = findChild(children, "DialogFooter");
     if(directFooter) modalFooter = directFooter.props.children;
  }


  return (
    <AntModal
      title={modalTitle}
      open={open}
      onCancel={() => onOpenChange && onOpenChange(false)}
      onOk={() => { /* Default OK, or pass from props */ }}
      footer={modalFooter} // AntD Modal's footer can take ReactNode or an array of buttons
      // className from the root Dialog element can be passed to AntModal
      className={cn(props.className)}
      // {...props} // Spreading all props might be risky, select carefully
      // Radix DialogContent styling (fixed, translate, etc.) is handled by AntModal by default.
      // Custom styling from DialogContent's className might need to be applied to AntModal's `styles` or `wrapClassName` prop.
    >
      {modalContentChildren}
    </AntModal>
  );
};
Dialog.displayName = "Dialog";


// The following components are for structure and might not be directly used
// if the parent component is refactored to use AntModal's props directly.
// Providing them for minimal changes in consuming code, but their styling might not work as before.

const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => (
  // This component is mostly conceptual now. AntModal takes content directly.
  // The className from Radix (border, shadow, etc.) is not directly applicable.
  // We render children, assuming Dialog (AntModal wrapper) will handle them.
  <div ref={ref} className={cn(className)} {...props}>
    {children}
  </div>
));
DialogContent.displayName = "DialogContent";

const DialogHeader = ({ className, ...props }) => (
  <div className={cn("text-center sm:text-left", className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h2 ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
));
DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
DialogDescription.displayName = "DialogDescription";

// DialogTrigger, DialogClose, DialogPortal, DialogOverlay are not directly mapped.
// Trigger is handled by parent state. Close is part of AntModal. Portal/Overlay are internal to AntModal.
// Exporting them as passthroughs or null components if necessary for compatibility,
// but ideally, they should be removed from usage.
const DialogTrigger = ({ children }) => <>{children}</>; // Becomes a pass-through
DialogTrigger.displayName = "DialogTrigger";

const DialogClose = (props) => null; // AntModal has its own close
DialogClose.displayName = "DialogClose";


export {
  Dialog,
  // DialogPortal, // Not needed
  // DialogOverlay, // Not needed
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
