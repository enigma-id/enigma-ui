import type { InputHTMLAttributes, ReactNode } from "react";

export type FileInputSize = "xs" | "sm" | "md" | "lg";
export type FileInputVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "error";

export interface FileInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label?: ReactNode;
  size?: FileInputSize;
  variant?: FileInputVariant;
  bordered?: boolean;
  ghost?: boolean;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
}
