import React from "react";
import SearchBar from "./SearchBar";
import SortSelect from "./SortSelect";
import {
    LayoutGrid,
    Menu,
    SlidersHorizontal
} from "lucide-react";

const ProductToolbar: React.FC = () => {
    return (
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-20 pb-8 border-b border-[#3D1A12]/10">
            <div className="flex items-center gap-4 w-full md:w-auto">
                <SearchBar />
                <button className="p-4 bg-white rounded-2xl text-[#3D1A12] hover:bg-[#EFEBE9] transition-colors md:hidden" aria-label="Filter products">
                    <SlidersHorizontal size={18} />
                </button>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="hidden md:flex bg-white p-1 rounded-xl gap-1">
                    {/* Active state using a light brown tint */}
                    <button className="p-2 bg-[#EFEBE9] rounded-lg text-[#3D1A12]" aria-label="Grid view">
                        <LayoutGrid size={16} />
                    </button>
                    {/* Inactive state using muted brown */}
                    <button className="p-2 text-[#3D1A12]/40 hover:text-[#3D1A12]" aria-label="List view">
                        <Menu size={16} />
                    </button>
                </div>
                <SortSelect />
            </div>
        </div>
    );
};

export default ProductToolbar;