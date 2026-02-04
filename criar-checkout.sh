#!/bin/bash

echo "📦 Criando estrutura do checkout..."

mkdir -p src/features/checkout

cat > src/features/checkout/CheckoutPage.tsx << 'CHECKOUT_EOF'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../cart";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  cpfCnpj: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  notes: string;
}

interface FormErrors {
  [key: string]: string;
}

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart, formatPrice } = useCart();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    cpfCnpj: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
    notes: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Nome é obrigatório";
    if (!formData.email.trim()) newErrors.email = "E-mail é obrigatório";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "E-mail inválido";
    if (!formData.phone.trim()) newErrors.phone = "Telefone é obrigatório";
    if (!formData.cpfCnpj.trim()) newErrors.cpfCnpj = "CPF/CNPJ é obrigatório";
    if (!formData.street.trim()) newErrors.street = "Rua é obrigatória";
    if (!formData.number.trim()) newErrors.number = "Número é obrigatório";
    if (!formData.neighborhood.trim()) newErrors.neighborhood = "Bairro é obrigatório";
    if (!formData.city.trim()) newErrors.city = "Cidade é obrigatória";
    if (!formData.state.trim()) newErrors.state = "Estado é obrigatório";
    if (!formData.zipCode.trim()) newErrors.zipCode = "CEP é obrigatório";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setOrderComplete(true);

    setTimeout(() => {
      clearCart();
      navigate("/");
    }, 3000);
  };

  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-16 px-6 bg-[#f4f4f4] flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-[#111111] mb-4">Seu carrinho está vazio</p>
          <button
            onClick={() => navigate("/products")}
            className="bg-[#111111] text-white px-8 py-3 rounded-xl font-semibold hover:bg-black transition-colors"
          >
            Ver Produtos
          </button>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen pt-32 pb-16 px-6 bg-[#f4f4f4] flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-3xl p-12 text-center shadow-xl">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#111111] mb-2">Pedido Confirmado!</h2>
          <p className="text-[#8F8F8F] mb-6">
            Enviamos um e-mail de confirmação para {formData.email}
          </p>
          <p className="text-sm text-[#8F8F8F]">Redirecionando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-16 px-6 bg-[#f4f4f4]">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-[#111111] mb-12 tracking-tight">Finalizar Compra</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-sm">
              <div className="mb-8">
                <h2 className="text-xl font-bold text-[#111111] mb-6">Dados Pessoais</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-[#111111] mb-2">Nome Completo *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={\`w-full px-4 py-3 rounded-xl border-2 \${
                        errors.fullName ? "border-red-500" : "border-gray-200"
                      } focus:border-[#111111] focus:outline-none transition-colors\`}
                    />
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#111111] mb-2">E-mail *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={\`w-full px-4 py-3 rounded-xl border-2 \${
                        errors.email ? "border-red-500" : "border-gray-200"
                      } focus:border-[#111111] focus:outline-none transition-colors\`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#111111] mb-2">Telefone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={\`w-full px-4 py-3 rounded-xl border-2 \${
                        errors.phone ? "border-red-500" : "border-gray-200"
                      } focus:border-[#111111] focus:outline-none transition-colors\`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-[#111111] mb-2">CPF/CNPJ *</label>
                    <input
                      type="text"
                      name="cpfCnpj"
                      value={formData.cpfCnpj}
                      onChange={handleChange}
                      className={\`w-full px-4 py-3 rounded-xl border-2 \${
                        errors.cpfCnpj ? "border-red-500" : "border-gray-200"
                      } focus:border-[#111111] focus:outline-none transition-colors\`}
                    />
                    {errors.cpfCnpj && <p className="text-red-500 text-xs mt-1">{errors.cpfCnpj}</p>}
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold text-[#111111] mb-6">Endereço de Entrega</h2>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="md:col-span-3">
                    <label className="block text-sm font-semibold text-[#111111] mb-2">Rua *</label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      className={\`w-full px-4 py-3 rounded-xl border-2 \${
                        errors.street ? "border-red-500" : "border-gray-200"
                      } focus:border-[#111111] focus:outline-none transition-colors\`}
                    />
                    {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#111111] mb-2">Número *</label>
                    <input
                      type="text"
                      name="number"
                      value={formData.number}
                      onChange={handleChange}
                      className={\`w-full px-4 py-3 rounded-xl border-2 \${
                        errors.number ? "border-red-500" : "border-gray-200"
                      } focus:border-[#111111] focus:outline-none transition-colors\`}
                    />
                    {errors.number && <p className="text-red-500 text-xs mt-1">{errors.number}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-[#111111] mb-2">Complemento</label>
                    <input
                      type="text"
                      name="complement"
                      value={formData.complement}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#111111] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-[#111111] mb-2">Bairro *</label>
                    <input
                      type="text"
                      name="neighborhood"
                      value={formData.neighborhood}
                      onChange={handleChange}
                      className={\`w-full px-4 py-3 rounded-xl border-2 \${
                        errors.neighborhood ? "border-red-500" : "border-gray-200"
                      } focus:border-[#111111] focus:outline-none transition-colors\`}
                    />
                    {errors.neighborhood && <p className="text-red-500 text-xs mt-1">{errors.neighborhood}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-[#111111] mb-2">Cidade *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={\`w-full px-4 py-3 rounded-xl border-2 \${
                        errors.city ? "border-red-500" : "border-gray-200"
                      } focus:border-[#111111] focus:outline-none transition-colors\`}
                    />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#111111] mb-2">Estado *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={\`w-full px-4 py-3 rounded-xl border-2 \${
                        errors.state ? "border-red-500" : "border-gray-200"
                      } focus:border-[#111111] focus:outline-none transition-colors\`}
                    />
                    {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#111111] mb-2">CEP *</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className={\`w-full px-4 py-3 rounded-xl border-2 \${
                        errors.zipCode ? "border-red-500" : "border-gray-200"
                      } focus:border-[#111111] focus:outline-none transition-colors\`}
                    />
                    {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#111111] mb-6">Observações</h2>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Alguma observação sobre o pedido?"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#111111] focus:outline-none transition-colors resize-none"
                />
              </div>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-8 shadow-sm sticky top-32">
              <h2 className="text-xl font-bold text-[#111111] mb-6">Resumo do Pedido</h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
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
                      <p className="text-sm font-semibold text-[#111111] truncate">{item.name}</p>
                      <p className="text-xs text-[#8F8F8F]">Qtd: {item.quantity}</p>
                      <p className="text-sm font-semibold text-[#111111] mt-1">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t-2 border-gray-100 pt-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[#8F8F8F]">Subtotal</span>
                  <span className="text-sm font-semibold text-[#111111]">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-[#8F8F8F]">Frete</span>
                  <span className="text-sm font-semibold text-green-600">Grátis</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-[#111111]">Total</span>
                  <span className="text-2xl font-bold text-[#111111]">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isProcessing}
                className={\`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 \${
                  isProcessing
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-[#111111] text-white hover:bg-black active:scale-95"
                }\`}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processando...
                  </span>
                ) : (
                  "Finalizar Compra"
                )}
              </button>

              <p className="text-xs text-center text-[#8F8F8F] mt-4">
                🔒 Pagamento seguro e criptografado
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
CHECKOUT_EOF

echo "✅ CheckoutPage.tsx criado!"
echo ""
echo "Agora adicione a rota no App.tsx:"
echo 'import { CheckoutPage } from "./features/checkout/CheckoutPage"'
echo '<Route path="/checkout" element={<CheckoutPage />} />'
