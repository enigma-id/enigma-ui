import clsx from "clsx";
import type { TooltipProps } from "./types";

export const Tooltip = ({
  children,
  label,
  position = "top",
  size = "md",
  variant = "neutral",
  className,
}: TooltipProps) => {
  const positionClass = {
    top: "tooltip-top",
    bottom: "tooltip-bottom",
    left: "tooltip-left",
    right: "tooltip-right",
  }[position];

  const sizeClass = {
    xs: "tooltip-xs",
    sm: "tooltip-sm",
    md: "tooltip-md",
    lg: "tooltip-lg",
  }[size];

  const variantClass = {
    neutral: "tooltip-neutral",
    primary: "tooltip-primary",
    secondary: "tooltip-secondary",
    accent: "tooltip-accent",
    info: "tooltip-info",
    success: "tooltip-success",
    warning: "tooltip-warning",
    error: "tooltip-error",
  }[variant];

  return (
    <div
      className={clsx(
        "tooltip",
        positionClass,
        sizeClass,
        variantClass,
        className
      )}
      data-tip={label}
    >
      {children}
    </div>
  );
};
