"use client"

import * as React from "react"
// import * as LabelPrimitive from "@radix-ui/react-label" // Used by our Label component
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  FormProvider,
  useFormContext,
  // type ControllerProps, // Removed
  // type FieldPath, // Removed
  // type FieldValues, // Removed
} from "react-hook-form"
import { Form as AntForm, FormItem as AntFormItem } from "antd" // Import AntD Form components

import { cn } from "@/lib/utils.js"
import { Label } from "@/components/ui/label.jsx" // Ensure .jsx extension

const Form = FormProvider; // This remains react-hook-form's FormProvider

// type FormFieldContextValue< // Removed
//   TFieldValues extends FieldValues = FieldValues,
//   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
// > = {
//   name: TName
// }

const FormFieldContext = React.createContext(
  {} // as FormFieldContextValue // Removed type cast
);

const FormField = ({ ...props }) => { // Removed type parameters
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState, control } = useFormContext(); // Added control

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  // Ensure itemContext is available before accessing id (it might not be if useFormField is used outside FormItem)
  const id = itemContext?.id;


  return {
    id,
    name: fieldContext.name,
    formItemId: id ? `${id}-form-item` : undefined, // AntD Form.Item will manage its own ID for label htmlFor
    formDescriptionId: id ? `${id}-form-item-description` : undefined,
    formMessageId: id ? `${id}-form-item-message` : undefined,
    control, // Expose control for potential use with AntD specific integrations
    ...fieldState,
  };
};

// type FormItemContextValue = { // Removed
//   id: string
// }

const FormItemContext = React.createContext(
  {} // as FormItemContextValue // Removed type cast
);

// Modified FormItem to integrate with AntD's Form.Item
const FormItem = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const id = React.useId();
    const { name, error } = useFormField(); // Get field name and error state

    // Extract Label, FormControl (input), FormDescription, FormMessage from children
    let labelContent = null;
    let inputControl = null;
    let descriptionContent = null;
    let messageContent = null; // This will be derived from error state for AntD

    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        if (child.type.displayName === "FormLabel") {
          labelContent = child.props.children;
        } else if (child.type.displayName === "FormControl") {
          inputControl = child; // Keep the whole FormControl Slot for props
        } else if (child.type.displayName === "FormDescription") {
          descriptionContent = child.props.children;
        } else if (child.type.displayName === "FormMessage") {
          // FormMessage content might be used if error is not automatically displayed
          // For now, AntD Form.Item will handle error display based on 'help' and 'validateStatus'
        }
      }
    });

    const helpText = error ? String(error?.message ?? "") : (descriptionContent || undefined);
    const validateStatus = error ? "error" : "";


    return (
      <FormItemContext.Provider value={{ id }}>
        <AntFormItem
          label={labelContent}
          htmlFor={name} // AntD Form.Item uses `name` prop to link to field for accessibility.
                       // The actual input id will be handled by FormControl/Slot
          help={helpText}
          validateStatus={validateStatus}
          className={cn("space-y-2", className)} // Original class was space-y-2, AntD Form.Item has its own layout
          ref={ref}
          {...props} // Other div props
        >
          {inputControl}
        </AntFormItem>
      </FormItemContext.Provider>
    );
  }
);
FormItem.displayName = "FormItem";


const FormLabel = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { error, formItemId, name } = useFormField();
    // In AntD, the label is part of Form.Item. This component might become a simple wrapper
    // or its props used by FormItem. For now, make it render a Label component.
    // It might not be directly used if FormItem's label prop is populated from children.
    return (
      <Label
        ref={ref}
        className={cn(error && "text-destructive", className)}
        htmlFor={formItemId || name} // formItemId might be undefined if not in FormItem context
        {...props}
      />
    );
  }
);
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef(
  ({ ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId, name } = useFormField();
    // The 'id' passed to Slot should ideally be `name` for AntD Form.Item to connect correctly.
    // Or, AntD Form.Item handles this internally if the input is its direct child.
    // For react-hook-form Controller, the `field.name` is often used as `id`.
    return (
      <Slot
        ref={ref}
        id={formItemId || name} // Ensure input gets an ID, preferably linked to field name
        aria-describedby={
          !error
            ? `${formDescriptionId}`
            : `${formDescriptionId} ${formMessageId}`
        }
        aria-invalid={!!error}
        {...props}
      />
    );
  }
);
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const { formDescriptionId } = useFormField();
    // This content is now passed to AntD Form.Item's `help` or `extra` prop.
    // If rendered directly, it's a p tag.
    return (
      <p
        ref={ref}
        id={formDescriptionId}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message ?? "") : children;

    if (!body) {
      return null;
    }
    // This is now handled by AntD Form.Item's `help` and `validateStatus`.
    // If rendered directly, it's a p tag.
    return (
      <p
        ref={ref}
        id={formMessageId}
        className={cn("text-sm font-medium text-destructive", className)}
        {...props}
      >
        {body}
      </p>
    );
  }
);
FormMessage.displayName = "FormMessage";

export {
  useFormField,
  Form, // This is react-hook-form's FormProvider
  AntForm, // Exporting AntD's Form for direct use
  FormItem, // Our wrapper around AntD's Form.Item
  AntFormItem, // Exporting AntD's Form.Item for direct use
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField, // This is react-hook-form's Controller wrapper
};
