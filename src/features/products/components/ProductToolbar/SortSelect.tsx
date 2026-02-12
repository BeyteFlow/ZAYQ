import React from "react"
import { ChevronDown } from "lucide-react"
import { useProductStore } from "../../../../store/product.store"

const SortSelect: React.FC = () => {
    const { sortBy, setSortBy } = useProductStore()

    return (
        <div className="relative">
            <label htmlFor="sortSelect" className="sr-only">Sort Products</label>
            <select
                id="sortSelect"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc')}
                className="appearance-none bg-[#FFFFFF] border-none rounded-2xl py-4 pl-6 pr-12 text-xs font-bold uppercase tracking-widest text-[#3D1A12] focus:ring-1 focus:ring-[#3D1A12]/20 outline-none cursor-pointer"
            >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low</option>
                <option value="price-desc">Price: High</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#3D1A12]/40 pointer-events-none" size={14} />
        </div>
    )
}

export default SortSelect