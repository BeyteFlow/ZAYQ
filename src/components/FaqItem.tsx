import React from "react";
import { Plus, Minus } from "lucide-react";

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export const FaqItem: React.FC<FaqItemProps> = ({
  question,
  answer,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="rounded-[50px] shadow-sm border border-gray-100 py-10 px-12 transition-all hover:shadow-2xl shadow-[#3D1E16] bg-white mb-4">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between text-left focus:outline-none"
      >
        <span className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
          {question}
        </span>
        <span className="ml-6 flex-shrink-0 text-blue-500">
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 mt-4"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="text-lg overflow-hidden text-gray-600 leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
};
