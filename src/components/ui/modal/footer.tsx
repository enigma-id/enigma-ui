import type { ReactNode } from "react";

const Footer = ({ children }: { children: ReactNode }) => {
  return <div className="flex justify-end gap-2">{children}</div>;
};

export default Footer;
