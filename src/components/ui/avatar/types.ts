import type { ReactNode } from "react";

export type AvatarProps = {
  src?: string;
  alt?: string;
  mask?: "heart" | "squircle" | "hexagon" | "circle" | "default";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  placeholder?: boolean;
  status?: "online" | "offline" | "none";
  className?: string;
  children?: ReactNode;
};
