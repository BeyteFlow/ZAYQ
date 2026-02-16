import React, { useState } from "react";
import { FaqItem } from "./FaqItem";
import type { FAQ } from "../data/faqs";

interface AccordionProps {
  items: FAQ[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  // We store the ID of the open FAQ. If null, all are closed.
  const [openId, setOpenId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="max-w-3xl mx-auto">
      {items.map((item) => (
        <FaqItem
          key={item.id}
          question={item.question}
          answer={item.answer}
          isOpen={openId === item.id}
          onToggle={() => handleToggle(item.id)}
        />
      ))}
    </div>
  );
};

export default Accordion;
