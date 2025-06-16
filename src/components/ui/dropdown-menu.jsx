"use client"

import * as React from "react"
import { Dropdown as AntDropdown, Menu as AntMenu } from "antd"
// Icons from lucide-react might be replaced by antd icons or passed as custom icons
import { Check, ChevronRight, Circle } from "lucide-react"
import { cn } from "@/lib/utils.js"

// Helper to process children and build AntD menu items structure
const processChildrenForMenu = (children) => {
  const items = [];
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;

    const { props } = child;
    switch (child.type.displayName) {
      case "DropdownMenuItem":
        items.push({
            key: props.key || props.children?.toString() || Math.random().toString(),
            label: props.children,
            icon: props.inset ? <span className="ant-menu-item-icon" style={{marginRight: "8px"}} /> : (props.icon || null) , // crude inset
            disabled: props.disabled,
            className: cn(props.className), // May or may not work well with AntD item styling
            onClick: props.onSelect, // Radix onSelect maps to onClick
            // title: props.title // AntD items can have title attribute
        });
        break;
      case "DropdownMenuCheckboxItem":
        items.push({
          key: props.key || props.children?.toString() || Math.random().toString(),
          label: props.children,
          icon: props.checked ? <Check /> : <span className="ant-menu-item-icon" style={{marginRight: "22px"}} />, // Approximate
          disabled: props.disabled,
          className: cn(props.className),
          onClick: props.onSelect,
        });
        break;
      case "DropdownMenuRadioItem":
         // Part of DropdownMenuRadioGroup, handled there ideally
        items.push({
          key: props.key || props.value || props.children?.toString() || Math.random().toString(),
          label: props.children,
          icon: props.checked ? <Circle className="h-2 w-2 fill-current" /> : <span className="ant-menu-item-icon" style={{marginRight: "14px"}} />, // Approximate
          disabled: props.disabled,
          className: cn(props.className),
          onClick: props.onSelect,
         // value: props.value // for radio group logic
        });
        break;
      case "DropdownMenuLabel":
        // AntD Menu.ItemGroup can have a title, or use a disabled item as a label
        items.push({ type: 'group', label: props.children, key: props.key || Math.random().toString(), className: cn(props.className) });
        break;
      case "DropdownMenuSeparator":
        items.push({ type: 'divider', key: props.key || Math.random().toString(), className: cn(props.className) });
        break;
      case "DropdownMenuGroup":
        items.push({
          type: 'group',
          label: findChildDisplayNameRecursive(props.children, "DropdownMenuLabel")?.props.children,
          children: processChildrenForMenu(props.children),
          key: props.key || Math.random().toString(),
          className: cn(props.className)
        });
        break;
      case "DropdownMenuSub": // This is a wrapper for SubTrigger and SubContent
        const triggerChild = findChildDisplayNameRecursive(props.children, "DropdownMenuSubTrigger");
        const contentChild = findChildDisplayNameRecursive(props.children, "DropdownMenuSubContent");
        if (triggerChild && contentChild) {
          items.push({
            key: triggerChild.props.key || triggerChild.props.children?.toString() || Math.random().toString(),
            label: triggerChild.props.children,
            children: processChildrenForMenu(contentChild.props.children),
            icon: triggerChild.props.icon, // You might need to handle inset here too
            className: cn(triggerChild.props.className) // class from SubTrigger
          });
        }
        break;
       case "DropdownMenuRadioGroup":
         // This needs special handling for AntD. AntD Menu has selectable prop or radio-like behavior.
         // For simplicity, treat as a group, individual items handle their checked state visually.
         // True radio behavior requires managing state outside.
         items.push({
           type: 'group',
           label: "Radio Group (Needs Custom Handling)", // Placeholder label
           children: processChildrenForMenu(props.children),
           key: props.key || props.value || Math.random().toString(),
           className: cn(props.className)
         });
         break;

      default:
        // console.warn("Unsupported DropdownMenu child:", child.type.displayName || child.type);
        break;
    }
  });
  return items;
};

// Helper to find a child by display name, even if nested in Fragments
const findChildDisplayNameRecursive = (children, displayName) => {
  let found = null;
  React.Children.forEach(children, child => {
    if (found || !React.isValidElement(child)) return;
    if (child.type.displayName === displayName) {
      found = child;
    } else if (child.type === React.Fragment && child.props.children) {
      found = findChildDisplayNameRecursive(child.props.children, displayName);
    }
  });
  return found;
};


const DropdownMenu = ({ children, ...props }) => {
  const trigger = findChildDisplayNameRecursive(children, "DropdownMenuTrigger")?.props.children;
  const content = findChildDisplayNameRecursive(children, "DropdownMenuContent");

  let menuItems = [];
  if (content && content.props.children) {
    menuItems = processChildrenForMenu(content.props.children);
  }

  const menuProps = { items: menuItems };
  if (content && content.props.className) {
    // Apply className from DropdownMenuContent to the AntD Menu overlay
    // This might not work perfectly due to AntD's own styling structure
    // menuProps.className = content.props.className;
  }


  // Props from DropdownMenuPrimitive.Root (like onOpenChange, open, modal)
  // can be passed to AntDropdown (e.g., open, onOpenChange).
  return (
    <AntDropdown
        menu={menuProps}
        trigger={['click']} // Default trigger, can be customized
        {...props} // Pass open, onOpenChange etc. from original DropdownMenu
    >
      {trigger || <button>Open</button>}
    </AntDropdown>
  );
};
DropdownMenu.displayName = "DropdownMenu";

// --- Re-exporting Radix part names as placeholders or simplified wrappers ---
// Consuming code will need significant changes to use AntD's menu structure.
// These are mostly for reducing immediate import errors.

const DropdownMenuTrigger = ({ children, ...props }) => <div {...props}>{children}</div>; // Becomes a simple wrapper
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

const DropdownMenuContent = React.forwardRef(({ children, className, ...props }, ref) => (
  <div ref={ref} className={cn("dropdown-content-placeholder", className)} {...props}>{children}</div> // Placeholder
));
DropdownMenuContent.displayName = "DropdownMenuContent";

const DropdownMenuItem = React.forwardRef(({ children, className, inset, ...props }, ref) => (
  <div ref={ref} className={cn("dropdown-item-placeholder", inset ? "pl-8" : "", className)} {...props}>{children}</div>
));
DropdownMenuItem.displayName = "DropdownMenuItem";

const DropdownMenuLabel = React.forwardRef(({ children, className, inset, ...props }, ref) => (
  <div ref={ref} className={cn("dropdown-label-placeholder", inset ? "pl-8" : "", className)} {...props}>{children}</div>
));
DropdownMenuLabel.displayName = "DropdownMenuLabel";

const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("dropdown-separator-placeholder -mx-1 my-1 h-px bg-muted", className)} {...props} />
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

const DropdownMenuGroup = React.forwardRef(({ children, className, ...props }, ref) => (
  <div ref={ref} className={cn("dropdown-group-placeholder", className)} {...props}>{children}</div>
));
DropdownMenuGroup.displayName = "DropdownMenuGroup";

const DropdownMenuSub = ({ children, ...props }) => <div {...props} className="dropdown-sub-placeholder">{children}</div>;
DropdownMenuSub.displayName = "DropdownMenuSub";

const DropdownMenuSubTrigger = React.forwardRef(({ children, className, inset, ...props }, ref) => (
  <div ref={ref} className={cn("dropdown-subtrigger-placeholder", inset ? "pl-8" : "", className)} {...props}>
    {children}
    {/* <ChevronRight className="ml-auto" /> */} {/* Chevron is part of AntD submenus */}
  </div>
));
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";

const DropdownMenuSubContent = React.forwardRef(({ children, className, ...props }, ref) => (
  <div ref={ref} className={cn("dropdown-subcontent-placeholder", className)} {...props}>{children}</div>
));
DropdownMenuSubContent.displayName = "DropdownMenuSubContent";

const DropdownMenuCheckboxItem = React.forwardRef(({ children, className, checked, ...props }, ref) => (
  <div ref={ref} className={cn("dropdown-checkbox-item-placeholder pl-8", className)} {...props}>
    {/* Checked state visualization would be custom here, or rely on icon from main mapping */}
    {children}
  </div>
));
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

const DropdownMenuRadioGroup = React.forwardRef(({ children, className, value, ...props }, ref) => (
  <div ref={ref} className={cn("dropdown-radiogroup-placeholder", className)} {...props} data-value={value}>
    {children}
  </div>
));
DropdownMenuRadioGroup.displayName = "DropdownMenuRadioGroup";

const DropdownMenuRadioItem = React.forwardRef(({ children, className, value, ...props }, ref) => (
  <div ref={ref} className={cn("dropdown-radioitem-placeholder pl-8", className)} {...props} data-value={value}>
    {/* Checked state visualization would be custom here */}
    {children}
  </div>
));
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

const DropdownMenuShortcut = ({ className, ...props }) => (
  <span className={cn("ml-auto text-xs tracking-widest opacity-60", className)} {...props} />
);
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

// DropdownMenuPortal is internal to AntD Dropdown
const DropdownMenuPortal = ({children}) => <>{children}</>;
DropdownMenuPortal.displayName = "DropdownMenuPortal";


export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
