import React, { useState } from "react";
import type { Product } from "../../../../store/product.store";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const isComingSoon = product.status === "coming-soon";
  const isOutOfStock = product.status === "out-of-stock";
  const [imgFailed, setImgFailed] = useState(false);

  const handleBuyNow = () => {
    if (isComingSoon || isOutOfStock) return;
    const message = encodeURIComponent(
      `Hi ZAYQ! I'm interested in the ${product.name} (₹${product.price}). Is it in stock?`,
    );
    window.open(`https://wa.me/917306912910?text=${message}`, "_blank");
  };

  return (
    <div className="flex flex-col group">
      {/* Image Wrapper - Using a warmer brand-compatible gray */}
      <div className="relative aspect-4/5 rounded-2xl bg-[#EFEBE9] overflow-hidden transition-all duration-500 group-hover:bg-[#EAE4E1]">
        {/* Status Badge */}
        {(isComingSoon || isOutOfStock) && (
          <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full shadow-sm">
            <p className="text-[9px] font-black uppercase tracking-widest text-[#3D1A12]">
              {isComingSoon ? "Coming Soon" : "Sold Out"}
            </p>
          </div>
        )}

        {/* Actual Product Image */}
        <div
          className={`w-full h-full transition-all duration-700 ease-in-out ${!isComingSoon && "group-hover:scale-110"} ${isComingSoon ? "blur-xl opacity-50" : "opacity-100"}`}
        >
          {product.imageUrl && !imgFailed ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#3D1A12]/30 text-xs font-medium">
              No Image Available
            </div>
          )}
        </div>

        {/* Hover Overlay */}
        {!isComingSoon && !isOutOfStock && (
          <div className="absolute inset-0 bg-[#3D1A12]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}
      </div>

      {/* Details Section */}
      <div className="mt-5 flex flex-col items-center text-center">
        <h3 className="text-base font-bold text-[#3D1A12] tracking-tight">
          {product.name}
        </h3>
        <p className="text-[#3D1A12]/50 text-xs font-medium uppercase tracking-wider mt-1">
          {product.category}
        </p>
        <p className="text-[#3D1A12] font-semibold mt-2">
          ₹{product.price.toLocaleString()}
        </p>

        <button
          onClick={handleBuyNow}
          disabled={isComingSoon || isOutOfStock}
          className={`mt-4 w-full py-3 text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl transition-all duration-300 
                        ${
                          isComingSoon || isOutOfStock
                            ? "bg-[#3D1A12]/10 text-[#3D1A12]/40 cursor-not-allowed"
                            : "bg-[#3D1A12] text-white hover:opacity-90 active:scale-95 shadow-sm"
                        }`}
        >
          {isComingSoon
            ? "Coming Soon"
            : isOutOfStock
              ? "Sold Out"
              : "Order via WhatsApp"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
