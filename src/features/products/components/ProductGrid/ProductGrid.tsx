import React from "react";
import type { Product } from "../../../../store/product.store";
import ProductCard from "./ProductCard";

const ProductGrid: React.FC<{ products: Product[] }> = ({ products }) => {
    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-40 bg-white/50 rounded-3xl border-2 border-dashed border-[#3D1A12]/10">
                <p className="text-[#3D1A12]/40 font-medium italic">No cases match your filter.</p>
            </div>
        );
    }
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
    );
};

export default ProductGrid;