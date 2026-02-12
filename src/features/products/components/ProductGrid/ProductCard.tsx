import { useCart } from "../../../cart";
import type { Product } from "../../../../store/product.store"

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const { addItem, isInCart, getItemQuantity } = useCart();
    const isComingSoon = product.status === 'coming-soon';
    const isOutOfStock = product.status === 'out-of-stock';
    const inCart = isInCart(product.id);
    const quantity = getItemQuantity(product.id);

    const handleBuyNow = () => {
        if (isComingSoon || isOutOfStock) return;
        const message = encodeURIComponent(`Hi ZAYQ! I'm interested in the ${product.name} (₹${product.price}). Is it in stock?`);
        window.open(`https://wa.me/917306912910?text=${message}`, '_blank');
    };

    const handleAddToCart = () => {
        if (isComingSoon || isOutOfStock) return;
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.imageUrl,
        });
    };

    return (
        <div className="flex flex-col group">
            {/* Image Wrapper - Using a warmer brand-compatible gray */}
            <div className="relative aspect-4/5 rounded-2xl bg-[#EFEBE9] overflow-hidden transition-all duration-500 group-hover:bg-[#EAE4E1]">
                
                {/* Status Badge */}
                {(isComingSoon || isOutOfStock) && (
                    <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full shadow-sm">
                        <p className="text-[9px] font-black uppercase tracking-widest text-[#3D1A12]">
                            {isComingSoon ? 'Coming Soon' : 'Sold Out'}
                        </p>
                    </div>
                )}

                {/* Cart Badge (quando item está no carrinho) */}
                {inCart && (
                    <div className="absolute top-4 right-4 z-20 px-3 py-1.5 bg-black text-white rounded-full shadow-lg">
                        <p className="text-[10px] font-bold">
                            {quantity} no carrinho
                        </p>
                    </div>
                )}

                {/* Actual Product Image */}
                <div className={`w-full h-full transition-all duration-700 ease-in-out ${!isComingSoon && 'group-hover:scale-110'} ${isComingSoon ? 'blur-xl opacity-50' : 'opacity-100'}`}>
                    {product.imageUrl ? (
                        <img 
                            src={product.imageUrl} 
                            alt={product.name}
                            className="w-full h-full object-cover"
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
                <h3 className="text-base font-bold text-[#3D1A12] tracking-tight">{product.name}</h3>
                <p className="text-[#3D1A12]/50 text-xs font-medium uppercase tracking-wider mt-1">{product.category}</p>
                <p className="text-[#3D1A12] font-semibold mt-2">₹{product.price.toLocaleString()}</p>
                
                {/* Botões */}
                <div className="w-full mt-4 flex flex-col gap-2">
                    {/* Adicionar ao Carrinho */}
                    <button 
                        onClick={handleAddToCart}
                        disabled={isComingSoon || isOutOfStock}
                        className={`w-full py-3 text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl transition-all duration-300 
                            ${isComingSoon || isOutOfStock 
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                                : inCart
                                ? 'bg-green-600 text-white hover:bg-green-700 active:scale-95'
                                : 'bg-[#111111] text-white hover:bg-black active:scale-95'}`}
                    >
                        {isComingSoon ? 'Coming Soon' : isOutOfStock ? 'Sold Out' : inCart ? '✓ No Carrinho' : 'Adicionar ao Carrinho'}
                    </button>

                    {/* Order via WhatsApp */}
                    {!isComingSoon && !isOutOfStock && (
                        <button 
                            onClick={handleBuyNow}
                            className="w-full py-3 text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl transition-all duration-300 border-2 border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white active:scale-95"
                        >
                            Order via WhatsApp
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;