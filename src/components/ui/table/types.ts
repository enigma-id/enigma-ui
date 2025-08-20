import type { ReactNode } from "react";

export interface TableColumn<T> {
  label: string;
  accessor: keyof T;
  sortable?: boolean;
  headerClassName?: string;
  cellClassName?: string;
  render?: (row: T) => ReactNode;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  total: number;
  loading?: boolean;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onSort?: (accessor: keyof T, direction: "asc" | "desc") => void;
  sort?: {
    accessor: keyof T;
    direction: "asc" | "desc";
  };
  className?: string;
}
