import { ReactNode } from "react";

//* type for user path
export type TUserPath = {
  name?: string;
  path?: string;
  element?: ReactNode;
  children?: TUserPath[];
};

//* type for Route
export type TSidebarItem = {
  key?: string;
  label: ReactNode;
  children?: TSidebarItem[];
} | undefined;

//* type for Route
export type TRoute = {
  path: string;
  element: ReactNode;
};

export type TSidebar = {
  name?: string; // Optional name for the route
  path: string; // The path in the URL
  element: ReactNode; // The component to render at this path
  children?: TRoute[]; // Optional children, allowing for nested routes
};