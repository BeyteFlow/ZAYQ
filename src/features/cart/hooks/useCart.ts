import { useCartStore } from "../../../store/cart.store";
import { formatPrice } from "../../../utils/formatPrice";

export function useCart() {
  const items = useCartStore((state) => state.items);
  const totalItems = useCartStore((state) => state.totalItems);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  const isInCart = (productId: string): boolean =>
    items?.some((item) => item.id === productId) ?? false;

  const getItemQuantity = (productId: string): number =>
    items?.find((item) => item.id === productId)?.quantity ?? 0;

  return {
    items: items ?? [],
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
    formatPrice,
  };
}