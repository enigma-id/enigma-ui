import type { ReactNode } from "react";

export type MenuItem = {
  label?: string;
  icon?: ReactNode;
  badge?: string | ReactNode;
  disabled?: boolean;
  active?: boolean;
  title?: boolean;
  collapsible?: boolean;
  children?: MenuItem[];
  onClick?: (item: MenuItem) => void;
};

export type MenuSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface MenuProps {
  items: MenuItem[];
  size?: MenuSize;
  horizontal?: boolean;
  className?: string;
  activeClass?: string;
  inactiveClass?: string;
}
