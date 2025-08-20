import React from "react";
import clsx from "clsx";
import { AccordionItem } from "./item";
import type { AccordionItemProps } from "./types";

interface AccordionProps {
  children: React.ReactNode;
  join?: boolean;
}

interface AccordionComponent extends React.FC<AccordionProps> {
  Item: React.FC<AccordionItemProps>;
}

const Accordion: AccordionComponent = ({ children, join }) => {
  return (
    <div className={clsx(join && "join join-vertical bg-base-100", "w-full")}>
      {children}
    </div>
  );
};

Accordion.Item = AccordionItem;

export { Accordion };
