"use client"

import * as React from "react"
// import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area" // Radix parts removed
import { cn } from "@/lib/utils.js"

// Radix ScrollArea provides custom styled scrollbars.
// AntD generally relies on native browser scrollbars or component-specific scrolling.
// This conversion will provide a simple div with overflow CSS.
// Custom scrollbar styling from Radix (Thumb, Corner, specific track styles) will be lost.

const ScrollArea = React.forwardRef(
  ({ className, children, style, ...props }, ref) => {
    // Props from ScrollAreaPrimitive.Root like 'type', 'scrollHideDelay', 'dir' are Radix-specific
    // and don't have direct equivalents for a simple div scroll.

    // Default style for a scrollable area
    const scrollableStyle = {
      overflow: "auto", // Or 'scroll' to always show scrollbars
      // Radix "relative overflow-hidden" was on Root, Viewport had rounded-[inherit]
      // For a simple div, overflow: 'auto' is key.
      // Height/width should be constrained by parent or via style/className for scroll to activate.
      // e.g., style={{ height: '300px', width: '100%' }}
      ...style,
    };

    return (
      <div
        ref={ref}
        className={cn("relative overflow-hidden", className)} // Keep relative for potential absolute positioned children if any
                                                        // overflow-hidden was on Radix Root, Viewport made it scroll.
                                                        // Here, the main div itself will scroll.
        {...props} // Pass other div attributes
      >
        <div
            className="h-full w-full" // Mimic Viewport behavior
            style={scrollableStyle}
        >
             {children}
        </div>
        {/* ScrollBar and Corner components are removed as native scrollbars will be used. */}
      </div>
    );
  }
);
ScrollArea.displayName = "ScrollArea"; // Was ScrollAreaPrimitive.Root.displayName


// ScrollBar component from Radix is for the custom scrollbar element.
// Since we're defaulting to native scrollbars, this component might not be directly useful
// unless one were to rebuild custom scrollbar logic.
// For now, it's a placeholder if someone tries to import it.
const ScrollBar = React.forwardRef(
  ({ className, orientation = "vertical", style, ...props }, ref) => {
    // This component is now a conceptual placeholder.
    // It doesn't render a visible custom scrollbar in this simplified version.
    // console.warn("ScrollBar component is a placeholder when using native scrollbars.");
    return (
      <div
        ref={ref}
        className={cn(
          "flex touch-none select-none transition-colors", // Original base classes
          // Visibility would be handled by native scroll behavior
          className
        )}
        style={style}
        data-orientation={orientation}
        {...props}
      >
        <div className="relative flex-1 rounded-full bg-border" /> {/* Placeholder thumb style */}
      </div>
    );
    // return null; // Or render nothing
  }
);
ScrollBar.displayName = "ScrollBar"; // Was ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar };
