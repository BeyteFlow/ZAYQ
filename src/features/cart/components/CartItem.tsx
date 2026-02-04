import { useCart } from "../hooks/useCart";
import type { CartItem as CartItemType } from "../types";

interface CartItemProps {
  item: CartItemType;
}

interface QuantityButtonProps {
  onClick: () => void;
  label: string;
  ariaLabel: string;
}

function QuantityButton({ onClick, label, ariaLabel }: QuantityButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-6 h-6 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
      aria-label={ariaLabel}
    >
      {label}
    </button>
  );
}

export function CartItem({ item }: CartItemProps) {
  const { removeItem, updateQuantity, formatPrice } = useCart();

  return (
    <div className="flex items-start gap-3 py-4 border-b border-gray-100 last:border-0">
      <div className="w-16 h-16 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
        {item.image ? (
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
            Sem imagem
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800 truncate">{item.name}</p>
        <p className="text-xs text-gray-500 mt-0.5">
          Unitário: {formatPrice(item.price)}
        </p>

        <div className="flex items-center gap-2 mt-2">
          <QuantityButton
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            label="−"
            ariaLabel="Diminuir quantidade"
          />
          <span className="text-sm font-medium text-gray-800 w-5 text-center">
            {item.quantity}
          </span>
          <QuantityButton
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            label="+"
            ariaLabel="Aumentar quantidade"
          />
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <p className="text-sm font-bold text-gray-800">
          {formatPrice(item.price * item.quantity)}
        </p>
        <button
          onClick={() => removeItem(item.id)}
          className="text-xs text-red-500 hover:text-red-700 transition-colors"
          aria-label={`Remover ${item.name} do carrinho`}
        >
          Remover
        </button>
      </div>
    </div>
  );
}
