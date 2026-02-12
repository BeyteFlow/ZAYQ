import React from "react";
import { Search } from "lucide-react";
import { useProductStore } from "../../../../store/product.store";

const SearchBar: React.FC = () => {
    const { searchQuery, setSearchQuery } = useProductStore();
    return (
        <div className="relative w-full md:w-80 group">
            <Search 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3D1A12]/40 group-focus-within:text-[#3D1A12] transition-colors" 
                size={16} 
            />
            <input
                type="text"
                placeholder="Find your model..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FFFFFF] border-none rounded-2xl py-4 pl-12 pr-6 text-sm focus:ring-1 focus:ring-[#3D1A12]/20 outline-none transition-all placeholder:text-[#3D1A12]/40 text-[#3D1A12]"
            />
        </div>
    );
};

export default SearchBar;