import { create } from "zustand";
import type { CartState, CartItem } from "../features/cart/types";
import { CartItemSchema } from "../features/cart/types";

function calcTotals(items: CartItem[]) {
  return {
    totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
    totalPrice: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
  };
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  totalItems: 0,
  totalPrice: 0,

  addItem: (item) => {
    const parsed = CartItemSchema.safeParse({ ...item, quantity: 1 });
    if (!parsed.success) {
      console.error("Dados do item inválidos:", parsed.error);
      return;
    }

    set((state) => {
      const existe = state.items.some((i) => i.id === item.id);

      const updatedItems = existe
        ? state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...state.items, parsed.data];

      return { items: updatedItems, ...calcTotals(updatedItems) };
    });
  },

  removeItem: (id) => {
    set((state) => {
      const updatedItems = state.items.filter((i) => i.id !== id);
      return { items: updatedItems, ...calcTotals(updatedItems) };
    });
  },

  updateQuantity: (id, quantity) => {
    set((state) => {
      const updatedItems =
        quantity <= 0
          ? state.items.filter((i) => i.id !== id)
          : state.items.map((i) => (i.id === id ? { ...i, quantity } : i));

      return { items: updatedItems, ...calcTotals(updatedItems) };
    });
  },

  clearCart: () =>
    set({
      items: [],
      totalItems: 0,
      totalPrice: 0,
    }),
}));