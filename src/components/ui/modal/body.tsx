import type { ReactNode } from "react";

const Body = ({ children }: { children: ReactNode }) => {
  return <div className="mb-4">{children}</div>;
};

export default Body;
