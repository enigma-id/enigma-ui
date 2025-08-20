import type { ReactNode } from "react";

const Header = ({ children }: { children: ReactNode }) => {
  return <div className="text-lg font-semibold mb-4">{children}</div>;
};

export default Header;
