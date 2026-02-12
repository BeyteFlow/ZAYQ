import React from "react";
import { useProductStore } from "../../../../store/product.store";

const ProductFilters: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useProductStore();
  const categories = ['All', 'iPhone 15 Pro', 'iPhone 15', 'iPhone 14'];
  
  return (
    <div className="hidden lg:flex flex-col gap-10 w-64 shrink-0 sticky top-12 h-fit">
      <div>
        <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#3D1A12]/50 mb-6">Device Model</h4>
        <div className="flex flex-col gap-3">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-left text-sm font-bold transition-all ${
                selectedCategory === cat ? 'text-[#3D1A12] translate-x-2' : 'text-[#3D1A12]/40 hover:text-[#3D1A12]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#3D1A12]/50 mb-6">Availability</h4>
        <label className="flex items-center gap-3 text-sm font-bold text-[#3D1A12] cursor-pointer">
          <input 
            type="checkbox" 
            className="w-4 h-4 accent-[#3D1A12] rounded border-[#3D1A12]/20" 
            defaultChecked 
          />
          In Stock Only
        </label>
      </div>
    </div>
  );
};

export default ProductFilters;