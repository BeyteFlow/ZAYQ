import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { CartItem } from "./CartItem";
import type { CartItem as CartItemType } from "../types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart, formatPrice } = useCart();

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`fixed top-0 right-0 z-50 h-full w-80 bg-white shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Carrinho de compras"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800">🛒 Carrinho</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors"
            aria-label="Fechar carrinho"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5">
          {!items || items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <span className="text-5xl mb-4">🛒</span>
              <p className="text-gray-500 font-medium">Seu carrinho está vazio</p>
              <p className="text-gray-400 text-sm mt-1">
                Adicione produtos na loja para começar
              </p>
            </div>
          ) : (
            items.map((item: CartItemType) => <CartItem key={item.id} item={item} />)
          )}
        </div>

        {items && items.length > 0 && (
          <div className="border-t border-gray-200 px-5 py-4 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600 font-medium">Total</span>
              <span className="text-xl font-bold text-gray-800">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full bg-gray-900 text-white font-semibold py-3 rounded-xl hover:bg-gray-700 transition-colors duration-200"
            >
              Finalizar Compra
            </button>
            <button
              onClick={clearCart}
              className="w-full mt-2 text-sm text-red-500 hover:text-red-700 py-1 transition-colors"
            >
              Limpar carrinho
            </button>
          </div>
        )}
      </aside>
    </>
  );
}