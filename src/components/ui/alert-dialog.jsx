"use client"

import * as React from "react"
import { Modal as AntModal } from "antd"
import { cn } from "@/lib/utils.js"
// Assuming button.jsx exports an AntD-compatible Button
import { Button } from "@/components/ui/button.jsx"

// Helper to find specific children by displayName
const findChild = (children, displayName) => {
  return React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type.displayName === displayName
  );
};

// Helper to extract props from children, to configure the Modal
const extractPropsFromChildren = (children) => {
  let title = null;
  let content = [];
  let actions = [];
  let cancelText = "Cancel"; // Default
  let okText = "OK"; // Default
  let onOk = ()_ => {};
  let onCancel = ()_ => {};

  React.Children.forEach(children, child => {
    if (!React.isValidElement(child)) {
      content.push(child);
      return;
    }
    switch (child.type.displayName) {
      case "AlertDialogContent":
        // Recursively process content of AlertDialogContent
        const nestedProps = extractPropsFromChildren(child.props.children);
        title = title || nestedProps.title;
        content.push(...nestedProps.content);
        actions.push(...nestedProps.actions); // Actions might be defined inside content
        // Retain className from AlertDialogContent for the Modal wrapper itself
        // modalProps.className = child.props.className;
        break;
      case "AlertDialogHeader":
        const titleChild = findChild(child.props.children, "AlertDialogTitle");
        if (titleChild) title = titleChild.props.children;
        const descChild = findChild(child.props.children, "AlertDialogDescription");
        if (descChild) {
          const descriptionElement = <div style={{ fontSize: '0.85em', color: 'grey', fontWeight: 'normal' }}>{descChild.props.children}</div>;
          title = title ? <>{title}{descriptionElement}</> : descriptionElement;
        }
        break;
      case "AlertDialogDescription": // If it's a direct child
        const descriptionElementDirect = <div style={{ fontSize: '0.85em', color: 'grey', fontWeight: 'normal' }}>{child.props.children}</div>;
        title = title ? <>{title}{descriptionElementDirect}</> : descriptionElementDirect;
        break;
      case "AlertDialogTitle": // If it's a direct child
         title = child.props.children;
         break;
      case "AlertDialogFooter":
        React.Children.forEach(child.props.children, footerButton => {
          if (React.isValidElement(footerButton)) {
            if (footerButton.type.displayName === "AlertDialogAction") {
              okText = footerButton.props.children;
              // Try to get onClick for onOk
              if(footerButton.props.onClick) onOk = footerButton.props.onClick;
              actions.push(<Button type="primary" onClick={onOk} {...footerButton.props}>{okText}</Button>);
            } else if (footerButton.type.displayName === "AlertDialogCancel") {
              cancelText = footerButton.props.children;
               if(footerButton.props.onClick) onCancel = footerButton.props.onClick;
              actions.push(<Button onClick={onCancel} {...footerButton.props}>{cancelText}</Button>);
            } else {
               actions.push(footerButton); // Other custom buttons
            }
          }
        });
        break;
      case "AlertDialogAction": // If direct child
        okText = child.props.children;
        if(child.props.onClick) onOk = child.props.onClick;
        actions.push(<Button type="primary" onClick={onOk} {...child.props}>{okText}</Button>);
        break;
      case "AlertDialogCancel": // If direct child
        cancelText = child.props.children;
        if(child.props.onClick) onCancel = child.props.onClick;
        actions.push(<Button onClick={onCancel} {...child.props}>{cancelText}</Button>);
        break;
      default:
        // For AlertDialog, content is usually within AlertDialogDescription or direct.
        // If other elements are direct children of AlertDialog, they are part of content.
        if (child.type.displayName !== "AlertDialogTrigger") {
             content.push(child);
        }
        break;
    }
  });
  return { title, content, actions, okText, cancelText, onOk, onCancel };
};


const AlertDialog = ({ open, onOpenChange, children, ...props }) => {
  const { title, content, actions, okText, cancelText, onOk, onCancel: derivedOnCancel } = extractPropsFromChildren(children);

  const handleCancel = () => {
    if (derivedOnCancel) derivedOnCancel();
    if (onOpenChange) onOpenChange(false);
  };

  const handleOk = () => {
    if (onOk) onOk();
    // AlertDialog doesn't typically close on OK by default unless programmed
    // if (onOpenChange) onOpenChange(false);
  };

  // If actions were explicitly defined (e.g. from AlertDialogFooter), use them.
  // Otherwise, create default OK/Cancel based on extracted text and handlers.
  const finalFooter = actions.length > 0 ? actions : [
    <Button key="cancel" onClick={handleCancel}>{cancelText}</Button>,
    <Button key="ok" type="primary" onClick={handleOk}>{okText}</Button>,
  ];

  // Extract className from AlertDialogContent if it was a child
  const contentChild = findChild(children, "AlertDialogContent");
  const modalClassName = contentChild ? contentChild.props.className : props.className;

  return (
    <AntModal
      title={title}
      open={open}
      onOk={handleOk} // Default OK handler
      onCancel={handleCancel} // Default Cancel handler
      footer={finalFooter}
      // Pass className from the root AlertDialog or from AlertDialogContent
      className={cn(modalClassName)}
      // {...props} // Careful with spreading all props
    >
      {content}
    </AntModal>
  );
};
AlertDialog.displayName = "AlertDialog";

// Placeholder components for structural compatibility.
// Their direct usage should be replaced by configuring the main AlertDialog (AntModal wrapper).
const AlertDialogTrigger = ({children}) => <>{children}</>; // Pass-through
AlertDialogTrigger.displayName = "AlertDialogTrigger";

const AlertDialogContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn(className)} {...props}>{children}</div>
));
AlertDialogContent.displayName = "AlertDialogContent";

const AlertDialogHeader = ({ className, ...props }) => (
  <div className={cn("text-center sm:text-left", className)} {...props} />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = ({ className, ...props }) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h2 ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
));
AlertDialogTitle.displayName = "AlertDialogTitle";

const AlertDialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
AlertDialogDescription.displayName = "AlertDialogDescription";

const AlertDialogAction = React.forwardRef(({ className, children, ...props }, ref) => (
  // This is now a placeholder. Logic is handled in the main AlertDialog.
  // It can be a simple button for styling if used directly, but won't control the modal.
  <Button ref={ref} className={cn(className)} {...props}>{children}</Button>
));
AlertDialogAction.displayName = "AlertDialogAction";

const AlertDialogCancel = React.forwardRef(({ className, children, ...props }, ref) => (
  <Button ref={ref} variant="outline" className={cn("mt-2 sm:mt-0", className)} {...props}>{children}</Button>
));
AlertDialogCancel.displayName = "AlertDialogCancel";

// AlertDialogPortal, AlertDialogOverlay are internal to AntModal
export {
  AlertDialog,
  // AlertDialogPortal, // Not needed
  // AlertDialogOverlay, // Not needed
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
