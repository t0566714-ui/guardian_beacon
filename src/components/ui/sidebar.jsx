// Basic sidebar components
import React from "react";
import { cn } from "@/lib/utils";

const SidebarProvider = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);

const Sidebar = React.forwardRef(({ className, ...props }, ref) => (
  <aside
    ref={ref}
    className={cn("w-64 bg-sidebar border-r", className)}
    {...props}
  />
));

const SidebarContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-2 p-4", className)}
    {...props}
  />
));

const SidebarGroup = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-1", className)}
    {...props}
  />
));

const SidebarGroupContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-1", className)}
    {...props}
  />
));

const SidebarMenu = React.forwardRef(({ className, ...props }, ref) => (
  <nav
    ref={ref}
    className={cn("flex flex-col gap-1", className)}
    {...props}
  />
));

const SidebarMenuItem = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("", className)}
    {...props}
  />
));

const SidebarMenuButton = React.forwardRef(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn("flex items-center gap-2 w-full p-2 rounded hover:bg-gray-100", className)}
    {...props}
  />
));

const SidebarHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-4 border-b", className)}
    {...props}
  />
));

const SidebarFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-4 border-t", className)}
    {...props}
  />
));

export {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
};