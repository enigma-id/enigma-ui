import clsx from "clsx";
import type { FileInputProps } from "./types";

export const FileInput = ({
  label,
  size = "md",
  variant = "neutral",
  bordered,
  ghost,
  disabled,
  className,
  labelClassName,
  ...rest
}: FileInputProps) => {
  const sizeClass = {
    xs: "file-input-xs",
    sm: "file-input-sm",
    md: "file-input-md",
    lg: "file-input-lg",
  }[size];

  const variantClass = {
    primary: "file-input-primary",
    secondary: "file-input-secondary",
    accent: "file-input-accent",
    neutral: "file-input-neutral",
    info: "file-input-info",
    success: "file-input-success",
    warning: "file-input-warning",
    error: "file-input-error",
  }[variant];

  const classes = clsx(
    "file-input",
    sizeClass,
    variantClass,
    bordered && "file-input-bordered",
    ghost && "file-input-ghost",
    className
  );

  const input = (
    <input type="file" className={classes} disabled={disabled} {...rest} />
  );

  if (!label) return input;

  return (
    <label
      className={clsx(
        "form-control w-full shadow-primary-content flex flex-col",
        labelClassName
      )}
    >
      <span className="label-text mb-1">{label}</span>
      {input}
    </label>
  );
};
