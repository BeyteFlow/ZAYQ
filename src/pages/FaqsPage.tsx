import React, { useState } from "react";
import Accordion from "../components/Accordion";
import { faqData } from "../data/faqs";
import type { FAQ } from "../data/faqs";

// Define the literal types to match your faqs.ts exactly
type Category = FAQ["category"];

const FaqsPage: React.FC = () => {
  // 1. State to track the active category
  const [activeCategory, setActiveCategory] =
    useState<Category>("Technical Support");

  const categories: Category[] = [
    "Technical Support",
    "Shopping & Orders",
    "Payment & billing",
  ];

  // 2. Filter the data based on the state
  const filteredFaqs = faqData.filter(
    (faq: FAQ) => faq.category === activeCategory,
  );

  return (
    <div className="bg-[#F6F4F1] min-h-screen px-6 py-12 md:py-24">
      <h1 className="text-4xl font-bold text-center mt-12 mb-8 text-[#3D1E16]">
        Frequently Asked Questions
      </h1>

      {/* 3. Categories Navigation */}
      <div className="flex flex-wrap justify-center gap-8 mb-12 pb-8 py-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`group cursor-pointer transition-all duration-300 pb-2 border-b-4 outline-none ${
              activeCategory === cat ? "border-[#3D1E16]" : "border-transparent"
            } hover:border-[#3D1E16]`}
          >
            <h2
              className={`text-2xl font-semibold transition-colors duration-300 ${
                activeCategory === cat ? "text-[#3D1E16]" : "text-gray-700"
              } group-hover:text-[#3D1E16]`}
            >
              {cat}
            </h2>
          </button>
        ))}
      </div>

      {/* 4. Pass the filtered list to the Accordion */}
      <div className="max-w-3xl mx-auto">
        {filteredFaqs.length > 0 ? (
          <Accordion key={activeCategory} items={filteredFaqs} />
        ) : (
          <p className="text-center text-gray-500 text-xl">
            No questions found in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default FaqsPage;
