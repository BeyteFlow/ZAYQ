import { z } from "zod";

// ---------- Esquema de validação (Zod) ----------
export const CartItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().positive(),
  quantity: z.number().int().min(1),
  image: z.string().url().optional(),
});

// ---------- Tipo do item ----------
export type CartItem = z.infer<typeof CartItemSchema>;

// ---------- Dados do carrinho (serializáveis) ----------
// Apenas os dados puros — sem funções.
// Útil se um dia precisar salvar no localStorage ou enviar por API.
export interface CartData {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

// ---------- Ações do carrinho ----------
// Todas as funções que modificam o estado.
export interface CartActions {
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

// ---------- Estado completo (usado pelo store) ----------
// Junta dados + ações em um único tipo.
export type CartState = CartData & CartActions;
