import type { ReactNode } from "react";

export const CardBody = ({ children }: { children: ReactNode }) => {
  return <div className="card-body">{children}</div>;
};
