import * as React from "react"
import { Tag as AntTag } from "antd"
import { cn } from "@/lib/utils.js"

// Mapping Radix variants to AntD Tag colors
// AntD Tag has preset colors like "blue", "green", "red", "volcano", "gold", "lime", etc.
// It can also take hex color codes.
const getAntdTagColor = (variant) => {
  switch (variant) {
    case "destructive":
      return "red"; // Or "error" if using status-like colors, but "red" is a common Tag color
    case "secondary":
      return "gold"; // Example, can be any color
    case "outline":
      // For outline, AntD Tag doesn't have a direct 'outline' variant like buttons.
      // It's either colored or not. We can use a default color or leave it to default.
      // Or, apply custom styling via className for an outline effect.
      // For now, let's map it to a default-like appearance (no specific color prop).
      return undefined;
    case "default":
    default:
      return "blue"; // Default to "blue" or another standard color
  }
};

function Badge({ className, variant, ...props }) {
  const antdColor = getAntdTagColor(variant);

  // The original badge had specific styling (px, py, text-xs, font-semibold).
  // AntD Tag has its own padding and font size. We pass className for overrides.
  // The cva styles like "inline-flex items-center rounded-full border" are largely
  // handled by AntD Tag's default appearance.
  return (
    <AntTag
      color={antdColor}
      className={cn(
        // "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold", // Base cva classes
        // These might conflict or be redundant with AntD Tag styles.
        // It's generally better to rely on AntD's styling and use className for minor adjustments.
        className
      )}
      {...props} // Spread other HTML attributes
    />
  );
}

// badgeVariants is not exported as it's cva-specific.
export { Badge };
