import { useRef, useState } from "react";
import clsx from "clsx";
import { useOutsideClick } from "./useOutsideClick";
import type { DropdownProps } from "./types";
import { DropdownItem } from "./item";

interface DropdownComponent extends React.FC<DropdownProps> {
  Item: typeof DropdownItem;
}

const Dropdown: DropdownComponent = ({
  value,
  onChange,
  position = "start",
  trigger,
  children,
  className,
  contentClassName,
  open: controlledOpen,
  onOpenChange,
}: DropdownProps) => {
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const open = isControlled ? controlledOpen : internalOpen;

  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => {
    if (!isControlled) setInternalOpen(false);
    onOpenChange?.(false);
  });

  const toggle = () => {
    const next = !open;
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  const handleSelect = (val: string) => {
    onChange?.(val);
    if (!isControlled) setInternalOpen(false);
    onOpenChange?.(false);
  };

  const positionClass = {
    start: "dropdown-start",
    end: "dropdown-end",
    center: "dropdown-center",
    top: "dropdown-top",
    bottom: "dropdown-bottom",
    left: "dropdown-left",
    right: "dropdown-right",
  };

  return (
    <div
      ref={ref}
      tabIndex={0}
      className={clsx("dropdown", positionClass[position], className)}
    >
      <div onClick={toggle} className="cursor-pointer">
        {trigger}
      </div>
      {open && (
        <ul
          className={`dropdown-content menu rounded-box bg-base-100 z-10 w-auto p-2 shadow-md ${
            contentClassName ?? ""
          }`}
        >
          {/* langsung render children */}
          {typeof children === "function"
            ? children({ select: handleSelect, selected: value })
            : children}
        </ul>
      )}
    </div>
  );
};

Dropdown.Item = DropdownItem;

export { Dropdown };
