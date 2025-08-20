import React from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import clsx from "clsx";
import type { InputProps } from "./types";
import { currencyFormat } from "../../utils/common";

export const Input: React.FC<InputProps> = ({
  id,
  label,
  required,
  error,
  type = "text",
  size = "md",
  variant = "default",
  prefix,
  suffix,
  disabled,
  value,
  onChange,
  className,
  ...rest
}) => {
  const [secured, setSecured] = React.useState("password");

  const sizeClassMap = {
    xs: "input-xs",
    sm: "input-sm",
    md: "input-md",
    lg: "input-lg",
    xl: "input-xl",
  }[size];

  const variantClassMap = error
    ? "input-error"
    : {
        default: "input-default",
        neutral: "input-neutral",
        primary: "input-primary",
        secondary: "input-secondary",
        accent: "input-accent",
        info: "input-info",
        success: "input-success",
        warning: "input-warning",
        error: "input-error",
      }[variant];

  const renderLabel = () =>
    label && (
      <label htmlFor={id} className="pb-2 block">
        <span className="text-base-content text-[10px] leading-[1.2] uppercase font-bold tracking-[.6px]">
          {label} {required && <span className="text-error">*</span>}
        </span>
      </label>
    );

  const renderError = () =>
    error && (
      <div className="text-error text-xs font-medium leading-[1.66] pt-1">
        {error}
      </div>
    );

  const inputClass = clsx(
    "input",
    sizeClassMap,
    variantClassMap,
    {
      "!border-base-300 !text-gray-400 !cursor-not-allowed": disabled,
      "!pl-10": prefix,
      "!pr-10": type === "password" || suffix,
    },
    className
  );

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        value: raw,
      },
    };
    onChange?.(syntheticEvent as React.ChangeEvent<HTMLInputElement>);
  };

  const renderField = () => {
    if (type === "textarea") {
      return (
        <textarea
          {...rest}
          value={value}
          onChange={onChange}
          className={clsx(inputClass, "min-h-[120px]")}
        />
      );
    }

    if (type === "currency") {
      return (
        <input
          {...rest}
          id={id}
          type="text"
          className={inputClass}
          value={currencyFormat(value)}
          onChange={handleCurrencyChange}
          disabled={disabled}
        />
      );
    }

    return (
      <input
        {...rest}
        id={id}
        type={type === "password" ? secured : type}
        value={value}
        onChange={onChange}
        className={inputClass}
        disabled={disabled}
      />
    );
  };

  return (
    <div className="w-full">
      {renderLabel()}
      <div className="relative w-full flex items-center">
        {prefix && <div className="absolute left-3">{prefix}</div>}

        {renderField()}

        {type === "password" ? (
          <div className="absolute right-3 cursor-pointer">
            {secured === "password" ? (
              <FaRegEyeSlash onClick={() => setSecured("text")} />
            ) : (
              <FaRegEye onClick={() => setSecured("password")} />
            )}
          </div>
        ) : (
          suffix && <div className="absolute right-3">{suffix}</div>
        )}
      </div>
      {renderError()}
    </div>
  );
};
