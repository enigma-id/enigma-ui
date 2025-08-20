import type { Dayjs } from "dayjs";

export type DatePickerMode = "single" | "range";

export type DatePickerProps = {
  mode?: DatePickerMode;
  value?: Dayjs | [Dayjs | null, Dayjs | null];
  onChange?: (date: Dayjs | [Dayjs | null, Dayjs | null] | null) => void;
  placeholder?: string;
  format?: string;
  className?: string;
};
