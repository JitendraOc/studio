import * as React from "react"
import { Button as AntButton } from "antd"
import { cn } from "@/lib/utils.js" // Ensure .js extension

// Mapping Radix variants and sizes to AntD props
const getAntdButtonProps = ({ variant, size, className, ...props }) => {
  let type = "default";
  if (variant === "destructive") type = "primary"; // AntD's primary can be danger via styles or a specific prop
  else if (variant === "outline") type = "default"; // AntD default has an outline
  else if (variant === "secondary") type = "default";
  else if (variant === "ghost") type = "ghost";
  else if (variant === "link") type = "link";
  else if (variant === "default") type = "primary";


  let antSize = "middle";
  if (size === "sm") antSize = "small";
  else if (size === "lg") antSize = "large";
  // AntD 'icon' size is usually handled by setting `icon` prop and not setting children,
  // or by specific CSS if it's just a size variant of a normal button.
  // For now, we'll map 'icon' to default size and rely on content (e.g. an Icon component)
  // to make it appear like an icon button.

  // For destructive variant, AntD uses a `danger` prop.
  const danger = variant === "destructive";

  return { type, size: antSize, className: cn(className), danger, ...props };
};

const Button = React.forwardRef(
  ({ variant, size, className, children, ...props }, ref) => {
    const antdProps = getAntdButtonProps({ variant, size, className, ...props });

    // If variant is destructive, AntD's Button needs a `danger` prop.
    // And type should be 'primary' or 'default' based on filled/outlined preference.
    // For simplicity, making destructive buttons of type 'primary' and danger.
    if (variant === "destructive") {
      antdProps.type = antdProps.type === "ghost" || antdProps.type === "link" ? antdProps.type : "primary";
      antdProps.danger = true;
    }


    return (
      <AntButton ref={ref} {...antdProps}>
        {children}
      </AntButton>
    );
  }
);
Button.displayName = "Button";

// We are not exporting buttonVariants anymore as it's specific to cva
export { Button };
