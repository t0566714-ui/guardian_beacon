// Basic form components
import React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
));

const Switch = React.forwardRef(({ className, ...props }, ref) => (
  <button
    type="button"
    role="switch"
    ref={ref}
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
  />
));

const Select = ({ children, ...props }) => <div {...props}>{children}</div>;
const SelectContent = ({ children, ...props }) => <div {...props}>{children}</div>;
const SelectItem = ({ children, ...props }) => <div {...props}>{children}</div>;
const SelectTrigger = ({ children, ...props }) => <button {...props}>{children}</button>;
const SelectValue = ({ ...props }) => <span {...props} />;

const Tabs = ({ children, ...props }) => <div {...props}>{children}</div>;
const TabsList = ({ children, className, ...props }) => (
  <div className={cn("flex space-x-1", className)} {...props}>{children}</div>
);
const TabsTrigger = ({ children, ...props }) => <button {...props}>{children}</button>;
const TabsContent = ({ children, ...props }) => <div {...props}>{children}</div>;

Input.displayName = "Input";
Label.displayName = "Label";
Switch.displayName = "Switch";

export { 
  Input, 
  Label, 
  Switch, 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
};