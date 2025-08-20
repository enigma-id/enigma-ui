import type { ReactNode } from "react";

export type DropdownPosition =
  | "start"
  | "center"
  | "end"
  | "top"
  | "bottom"
  | "left"
  | "right";

export interface DropdownProps {
  value?: string;
  onChange?: (value: string) => void;
  position?: DropdownPosition;
  trigger: ReactNode;
  children:
    | ReactNode
    | ((props: {
        select: (val: string) => void;
        selected?: string;
      }) => ReactNode);
  className?: string;
  contentClassName?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface DropdownItemProps {
  value: string;
  selected?: string;
  onSelect?: (val: string) => void;
  children: ReactNode;
  className?: string;
}
