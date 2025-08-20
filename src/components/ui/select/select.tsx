import clsx from "clsx";
import type { SelectProps } from "./types";

export const Select = ({
  options,
  label,
  size = "md",
  variant = "neutral",
  bordered,
  ghost,
  disabled,
  className,
  labelClassName,
  ...rest
}: SelectProps) => {
  const sizeClass = {
    xs: "select-xs",
    sm: "select-sm",
    md: "select-md",
    lg: "select-lg",
  }[size];

  const variantClass = {
    primary: "select-primary",
    secondary: "select-secondary",
    accent: "select-accent",
    neutral: "select-neutral",
    info: "select-info",
    success: "select-success",
    warning: "select-warning",
    error: "select-error",
  }[variant];

  const classes = clsx(
    "select",
    sizeClass,
    variantClass,
    bordered && "select-bordered",
    ghost && "select-ghost",
    className
  );

  const select = (
    <select className={classes} disabled={disabled} {...rest}>
      {options.map((opt, i) => (
        <option key={i} value={opt.value} disabled={opt.disabled}>
          {opt.label}
        </option>
      ))}
    </select>
  );

  if (!label) return select;

  return (
    <label
      className={clsx("form-control w-full flex flex-col", labelClassName)}
    >
      <span className="label-text mb-1">{label}</span>
      {select}
    </label>
  );
};
