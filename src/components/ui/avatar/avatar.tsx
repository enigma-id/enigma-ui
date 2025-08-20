import clsx from "clsx";
import type { AvatarProps } from "./types";

export const Avatar = ({
  src,
  alt = "avatar",
  mask = "default",
  size = "md",
  placeholder = false,
  status = "none",
  className,
  children,
}: AvatarProps) => {
  const sizeClass = {
    xs: "w-8 text-xs",
    sm: "w-12 text-sm",
    md: "w-16 text-base",
    lg: "w-20 text-lg",
    xl: "w-24 text-xl",
  }[size];

  const maskClass =
    {
      heart: "mask mask-heart",
      squircle: "mask mask-squircle",
      hexagon: "mask mask-hexagon",
      circle: "rounded-full",
      default: "rounded",
    }[mask] || mask;

  const statusClass = {
    none: "",
    online: "avatar-online",
    offline: "avatar-offline",
  }[status];

  return (
    <div
      className={clsx(
        "avatar",
        statusClass,
        placeholder && "avatar-placeholder",
        className
      )}
    >
      <div
        className={clsx(
          sizeClass,
          maskClass,
          placeholder && "bg-neutral text-neutral-content"
        )}
      >
        {placeholder ? (
          <span>{children ?? "?"}</span>
        ) : (
          <img src={src} alt={alt} />
        )}
      </div>
    </div>
  );
};
