import { Dropdown } from "../dropdown";
import { Menu, type MenuItem } from "../menu";

export interface NavbarMobileToggleProps {
  items: MenuItem[];
}

const HamburgerIcon = () => (
  <div role="button" className="btn btn-ghost lg:hidden">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h8m-8 6h16"
      />
    </svg>
  </div>
);

export const NavbarMobileToggle = ({ items }: NavbarMobileToggleProps) => (
  <Dropdown trigger={<HamburgerIcon />} position="start">
    <Menu items={items} className="bg-transparent min-w-32 p-0" />
  </Dropdown>
);
