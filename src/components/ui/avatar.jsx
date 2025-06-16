"use client"

import * as React from "react"
import { Avatar as AntAvatar } from "antd"
import { cn } from "@/lib/utils.js"

const Avatar = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    let imageSrc = null;
    let fallbackContent = null;
    const otherChildren = [];

    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        if (child.type && child.type.displayName === "AvatarImage") {
          imageSrc = child.props.src;
          // Pass along other props from AvatarImage to AntAvatar if needed, e.g. alt
          // props.alt = child.props.alt;
        } else if (child.type && child.type.displayName === "AvatarFallback") {
          fallbackContent = child.props.children;
        } else {
          otherChildren.push(child); // Should not happen for typical usage
        }
      } else {
        otherChildren.push(child); // Text nodes, etc. Could be part of fallback.
      }
    });

    // If fallbackContent wasn't explicitly found via AvatarFallback, but other children exist
    if (!fallbackContent && otherChildren.length > 0) {
        fallbackContent = <>{otherChildren}</>;
    }


    // AntD Avatar props: src, icon, children (for fallback text)
    // className is for the root element. Radix styling on Root is similar.
    return (
      <AntAvatar
        src={imageSrc}
        className={cn(
          // Original Radix classes for root like "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full"
          // AntD Avatar has its own sizing and shaping, these might conflict or be redundant.
          // For now, we include them via cn() but review might be needed.
          "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", // Default Radix styling
          className
        )}
        ref={ref}
        {...props} // Spread other props from the original Avatar (e.g., style)
      >
        {fallbackContent}
      </AntAvatar>
    );
  }
);
Avatar.displayName = "Avatar";

// AvatarImage and AvatarFallback are now helper components for structuring.
// Their props/children are extracted by the main Avatar component.
// If used directly, they are simple placeholders.
const AvatarImage = React.forwardRef(
  ({ className, src, alt, ...props }, ref) => {
    // This component's props (src, alt) are extracted by the main Avatar.
    // If rendered directly, it's just an img tag (or nothing in this simplified version).
    // For direct rendering (though not typical for this pattern):
    // return <img ref={ref} src={src} alt={alt} className={cn("aspect-square h-full w-full", className)} {...props} />;
    return null; // Or a placeholder, as its role is data provision to parent Avatar
  }
);
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    // This component's children are extracted as fallback for the main Avatar.
    // If rendered directly:
    // return <div ref={ref} className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)} {...props}>{children}</div>;
    return null; // Or a placeholder
  }
);
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
