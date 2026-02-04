// Formata um número como moeda BRL
// Uso: formatPrice(99.9) → "R$ 99,90"
// Disponível para qualquer parte do app, não só o carrinho.

export function formatPrice(price: number): string {
  return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
