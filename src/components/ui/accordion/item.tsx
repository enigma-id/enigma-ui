import React from "react";
import clsx from "clsx";
import type { AccordionItemProps } from "./types";

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  type = "arrow",
  defaultOpen,
  children,
}) => {
  return (
    <div
      className={clsx(
        "collapse",
        {
          "collapse-arrow": type === "arrow",
          "collapse-plus": type === "plus",
        },
        "border border-base-300",
        "join-item"
      )}
    >
      <input type="checkbox" defaultChecked={defaultOpen} />
      <div className="collapse-title font-semibold">{title}</div>
      <div className="collapse-content text-sm">{children}</div>
    </div>
  );
};
