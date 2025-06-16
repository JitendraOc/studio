"use client"

import * as React from "react"
import { Menu as AntMenu } from "antd"
// Icons from lucide-react might be replaced by antd icons or passed as custom icons
import { Check, ChevronRight, Circle } from "lucide-react"
import { cn } from "@/lib/utils.js"

// Helper to process Radix Menu children into AntD items structure
// This is similar to the one used for DropdownMenu, adapted for Menubar context if needed.
const processRadixMenuItems = (children) => {
  const items = [];
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;

    const { props } = child;
    let antdItem = {
        key: props.key || props.id || Math.random().toString(), // Ensure key is present
        label: props.children, // Default label
        className: cn(props.className),
        disabled: props.disabled,
        onClick: props.onSelect || props.onClick, // Radix onSelect / onClick
    };

    switch (child.type.displayName) {
      case "MenubarItem":
        // Basic item
        if (props.inset) antdItem.icon = <span className="ant-menu-item-icon" style={{marginRight: "8px"}} />;
        break;
      case "MenubarCheckboxItem":
        antdItem.label = props.children;
        antdItem.icon = props.checked ? <Check /> : <span className="ant-menu-item-icon" style={{marginRight: "22px"}} />;
        break;
      case "MenubarRadioItem": // Assumes part of a MenubarRadioGroup
        antdItem.label = props.children;
        // Visual cue for radio selection, actual radio behavior needs state management
        antdItem.icon = props.checked ? <Circle className="h-2 w-2 fill-current" /> : <span className="ant-menu-item-icon" style={{marginRight: "14px"}} />;
        break;
      case "MenubarLabel":
        return items.push({ type: 'group', label: props.children, key: antdItem.key, className: antdItem.className });
      case "MenubarSeparator":
        return items.push({ type: 'divider', key: antdItem.key, className: antdItem.className });
      case "MenubarGroup": // AntD Menu.ItemGroup
        return items.push({
          type: 'group',
          label: findChildDisplayNameRecursive(props.children, "MenubarLabel")?.props.children,
          children: processRadixMenuItems(props.children), // Recursive call for group children
          key: antdItem.key,
          className: antdItem.className,
        });
      case "MenubarSub": // AntD SubMenu
        const subTrigger = findChildDisplayNameRecursive(props.children, "MenubarSubTrigger");
        const subContent = findChildDisplayNameRecursive(props.children, "MenubarSubContent");
        if (subTrigger && subContent) {
          return items.push({
            key: antdItem.key,
            label: subTrigger.props.children,
            children: processRadixMenuItems(subContent.props.children), // Recursive call for submenu items
            className: cn(subTrigger.props.className), // Class from SubTrigger
            // icon: subTrigger.props.icon // if any icon on subtrigger
          });
        }
        return; // Skip if structure is not as expected
      case "MenubarRadioGroup":
         // Similar to DropdownMenu, treat as a group. Actual radio state is external.
         return items.push({
           type: 'group',
           label: "Radio Group (Custom Handling)", // Placeholder or find a label child
           children: processRadixMenuItems(props.children),
           key: antdItem.key,
           className: antdItem.className
         });
      default:
        // Try to render other valid React children as items if they are simple
        if (typeof props.children === 'string' || React.isValidElement(props.children)) {
             // Fallback for simple elements, may need adjustment
        } else {
            // console.warn("Unsupported Menubar child:", child.type.displayName || child.type);
            return; // Skip unsupported types
        }
    }

    // Handle MenubarShortcut: append its content to the label
    const shortcutChild = findChildDisplayNameRecursive(props.children, "MenubarShortcut");
    if (shortcutChild) {
        antdItem.label = (
            <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{antdItem.label || props.children.filter(c => c !== shortcutChild)}</span>
                {shortcutChild}
            </span>
        );
    }
    items.push(antdItem);
  });
  return items;
};

// Helper to find a child by display name, recursively through fragments
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


const Menubar = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const menubarItems = [];

    React.Children.forEach(children, (menuChild) => { // Iterate over MenubarMenu components
      if (React.isValidElement(menuChild) && menuChild.type.displayName === "MenubarMenu") {
        const trigger = findChildDisplayNameRecursive(menuChild.props.children, "MenubarTrigger");
        const content = findChildDisplayNameRecursive(menuChild.props.children, "MenubarContent");

        if (trigger && content) {
          menubarItems.push({
            key: trigger.props.key || trigger.props.children?.toString() || Math.random().toString(),
            label: trigger.props.children, // Content of MenubarTrigger becomes the label of SubMenu
            children: processRadixMenuItems(content.props.children),
            className: cn(trigger.props.className) // class from MenubarTrigger
          });
        } else if (trigger) { // If it's a trigger without content, maybe a direct action?
            menubarItems.push({
                key: trigger.props.key || trigger.props.children?.toString() || Math.random().toString(),
                label: trigger.props.children,
                onClick: trigger.props.onClick || trigger.props.onSelect, // if it's meant to be clickable
                className: cn(trigger.props.className)
            });
        }
      }
    });

    return (
      <AntMenu
        mode="horizontal"
        items={menubarItems}
        className={cn(
          // "flex h-10 items-center space-x-1 rounded-md border bg-background p-1", // Original Radix Root styling
          // AntD Menu has its own styling for horizontal mode.
          className
        )}
        ref={ref}
        {...props} // Pass other AntMenu props (e.g., theme, selectedKeys, onSelect)
      />
    );
  }
);
Menubar.displayName = "Menubar";


// --- Placeholder/Conceptual components for original Radix structure ---
// Their direct usage should be replaced by structuring data for the main Menubar (AntMenu).
const MenubarMenu = ({ children, ...props }) => <div {...props} data-slot="menubar-menu-placeholder">{children}</div>;
MenubarMenu.displayName = "MenubarMenu";

const MenubarTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("menubar-trigger-placeholder", className)} {...props}>{children}</div>
));
MenubarTrigger.displayName = "MenubarTrigger";

const MenubarContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("menubar-content-placeholder", className)} {...props}>{children}</div>
));
MenubarContent.displayName = "MenubarContent";

const MenubarItem = React.forwardRef(({ className, children, inset, ...props }, ref) => (
  <div ref={ref} className={cn("menubar-item-placeholder", inset && "pl-8", className)} {...props}>{children}</div>
));
MenubarItem.displayName = "MenubarItem";

const MenubarSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("menubar-separator-placeholder -mx-1 my-1 h-px bg-muted", className)} {...props} />
));
MenubarSeparator.displayName = "MenubarSeparator";

const MenubarLabel = React.forwardRef(({ className, children, inset, ...props }, ref) => (
  <div ref={ref} className={cn("menubar-label-placeholder", inset && "pl-8", className)} {...props}>{children}</div>
));
MenubarLabel.displayName = "MenubarLabel";

const MenubarCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => (
  <div ref={ref} className={cn("menubar-checkbox-item-placeholder pl-8", className)} {...props}>
    {/* Visual cue for checked state can be added here if used directly */}
    {children}
  </div>
));
MenubarCheckboxItem.displayName = "MenubarCheckboxItem";

const MenubarRadioGroup = React.forwardRef(({ className, children, value, ...props }, ref) => (
  <div ref={ref} className={cn("menubar-radiogroup-placeholder", className)} {...props} data-value={value}>
    {children}
  </div>
));
MenubarRadioGroup.displayName = "MenubarRadioGroup";

const MenubarRadioItem = React.forwardRef(({ className, children, value, ...props }, ref) => (
  <div ref={ref} className={cn("menubar-radioitem-placeholder pl-8", className)} {...props} data-value={value}>
    {children}
  </div>
));
MenubarRadioItem.displayName = "MenubarRadioItem";

const MenubarPortal = ({ children }) => <>{children}</>; // Portal is conceptual in AntD Menu
MenubarPortal.displayName = "MenubarPortal";

const MenubarSubContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("menubar-subcontent-placeholder", className)} {...props}>{children}</div>
));
MenubarSubContent.displayName = "MenubarSubContent";

const MenubarSubTrigger = React.forwardRef(({ className, children, inset, ...props }, ref) => (
  <div ref={ref} className={cn("menubar-subtrigger-placeholder", inset && "pl-8", className)} {...props}>
    {children}
    {/* <ChevronRight className="ml-auto h-4 w-4" /> */}
  </div>
));
MenubarSubTrigger.displayName = "MenubarSubTrigger";

const MenubarGroup = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("menubar-group-placeholder", className)} {...props}>{children}</div>
));
MenubarGroup.displayName = "MenubarGroup";

const MenubarSub = ({ children, ...props }) => <div {...props} className="menubar-sub-placeholder">{children}</div>;
MenubarSub.displayName = "MenubarSub";

const MenubarShortcut = ({ className, ...props }) => (
  <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props} />
);
MenubarShortcut.displayName = "MenubarShortcut"; // Corrected from displayname

export {
  Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator,
  MenubarLabel, MenubarCheckboxItem, MenubarRadioGroup, MenubarRadioItem, MenubarPortal,
  MenubarSubContent, MenubarSubTrigger, MenubarGroup, MenubarSub, MenubarShortcut,
};
