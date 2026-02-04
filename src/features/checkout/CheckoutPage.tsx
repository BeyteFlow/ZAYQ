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
  country: string;
  notes: string;
}

interface FormErrors {
  [key: string]: string;
}

// Tipos de resposta das APIs
interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

interface PostcodesIOResponse {
  status: number;
  result?: {
    postcode: string;
    country: string;
    region: string;
    admin_district: string;
    parish: string;
  };
}

interface ZippopotamResponse {
  "post code": string;
  country: string;
  "country abbreviation": string;
  places: Array<{
    "place name": string;
    state: string;
    "state abbreviation": string;
  }>;
}

const COUNTRIES = [
  { code: "BR", name: "Brasil", label: "CEP", format: "00000-000" },
  { code: "US", name: "Estados Unidos", label: "ZIP Code", format: "00000" },
  { code: "GB", name: "Reino Unido", label: "Postcode", format: "AA00 0AA" },
  { code: "CA", name: "Canadá", label: "Postal Code", format: "A0A 0A0" },
  { code: "PT", name: "Portugal", label: "Código Postal", format: "0000-000" },
  { code: "MX", name: "México", label: "Código Postal", format: "00000" },
  { code: "AR", name: "Argentina", label: "Código Postal", format: "A0000AAA" },
  { code: "OTHER", name: "Outro", label: "Código Postal", format: "" },
];

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
    country: "BR",
    notes: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [isSearchingPostal, setIsSearchingPostal] = useState(false);

  const selectedCountry = COUNTRIES.find((c) => c.code === formData.country) || COUNTRIES[0];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Nome é obrigatório";
    if (!formData.email.trim()) newErrors.email = "E-mail é obrigatório";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "E-mail inválido";
    if (!formData.phone.trim()) newErrors.phone = "Telefone é obrigatório";
    if (!formData.street.trim()) newErrors.street = "Rua é obrigatória";
    if (!formData.number.trim()) newErrors.number = "Número é obrigatório";
    if (!formData.city.trim()) newErrors.city = "Cidade é obrigatória";
    if (!formData.state.trim()) newErrors.state = "Estado/Região é obrigatório";
    if (!formData.zipCode.trim()) newErrors.zipCode = `${selectedCountry.label} é obrigatório`;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Busca CEP Brasil (ViaCEP)
  const searchBrazilCEP = async (cep: string) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data: ViaCepResponse = await response.json();

      if (data.erro) {
        return { success: false, error: "CEP não encontrado" };
      }

      return {
        success: true,
        data: {
          street: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.uf,
          complement: data.complemento,
        },
      };
    } catch {
      return { success: false, error: "Erro ao buscar CEP" };
    }
  };

  // Busca Postcode UK (Postcodes.io)
  const searchUKPostcode = async (postcode: string) => {
    try {
      const response = await fetch(`https://api.postcodes.io/postcodes/${postcode}`);
      const data: PostcodesIOResponse = await response.json();

      if (data.status !== 200 || !data.result) {
        return { success: false, error: "Postcode não encontrado" };
      }

      return {
        success: true,
        data: {
          city: data.result.admin_district,
          state: data.result.region,
          neighborhood: data.result.parish || "",
        },
      };
    } catch {
      return { success: false, error: "Erro ao buscar Postcode" };
    }
  };

  // Busca ZIP Code US/CA (Zippopotam)
  const searchZippopotam = async (countryCode: string, zipCode: string) => {
    try {
      const response = await fetch(`https://api.zippopotam.us/${countryCode}/${zipCode}`);
      
      if (!response.ok) {
        return { success: false, error: "Código postal não encontrado" };
      }

      const data: ZippopotamResponse = await response.json();

      if (!data.places || data.places.length === 0) {
        return { success: false, error: "Código postal não encontrado" };
      }

      const place = data.places[0];
      return {
        success: true,
        data: {
          city: place["place name"],
          state: place.state,
        },
      };
    } catch {
      return { success: false, error: "Erro ao buscar código postal" };
    }
  };

  // Busca genérica baseada no país
  const searchPostalCode = async () => {
    const code = formData.zipCode.replace(/\D/g, "");
    
    if (!code && formData.country !== "GB" && formData.country !== "CA") {
      setErrors((prev) => ({ ...prev, zipCode: "Digite o código postal" }));
      return;
    }

    setIsSearchingPostal(true);
    setErrors((prev) => ({ ...prev, zipCode: "" }));

    let result: { success: boolean; error?: string; data?: Partial<FormData> };

    switch (formData.country) {
      case "BR":
        if (code.length !== 8) {
          setErrors((prev) => ({ ...prev, zipCode: "CEP deve ter 8 dígitos" }));
          setIsSearchingPostal(false);
          return;
        }
        result = await searchBrazilCEP(code);
        break;

      case "GB":
        result = await searchUKPostcode(formData.zipCode.trim().toUpperCase());
        break;

      case "US":
        if (code.length !== 5) {
          setErrors((prev) => ({ ...prev, zipCode: "ZIP Code deve ter 5 dígitos" }));
          setIsSearchingPostal(false);
          return;
        }
        result = await searchZippopotam("us", code);
        break;

      case "CA":
        result = await searchZippopotam("ca", formData.zipCode.replace(/\s/g, ""));
        break;

      case "PT":
        result = await searchZippopotam("pt", code);
        break;

      case "MX":
        result = await searchZippopotam("mx", code);
        break;

      case "AR":
        result = await searchZippopotam("ar", code);
        break;

      default:
        setErrors((prev) => ({ ...prev, zipCode: "Busca não disponível para este país" }));
        setIsSearchingPostal(false);
        return;
    }

    if (result.success && result.data) {
      setFormData((prev) => ({
        ...prev,
        street: result.data?.street ?? prev.street,
        neighborhood: result.data?.neighborhood ?? prev.neighborhood,
        city: result.data?.city ?? prev.city,
        state: result.data?.state ?? prev.state,
        complement: result.data?.complement ?? prev.complement,
      }));
    } else {
      setErrors((prev) => ({ ...prev, zipCode: result.error || "Erro ao buscar" }));
    }

    setIsSearchingPostal(false);
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
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.fullName ? "border-red-500" : "border-gray-200"
                      } focus:border-[#111111] focus:outline-none transition-colors`}
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
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.email ? "border-red-500" : "border-gray-200"
                      } focus:border-[#111111] focus:outline-none transition-colors`}
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
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.phone ? "border-red-500" : "border-gray-200"
                      } focus:border-[#111111] focus:outline-none transition-colors`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  {formData.country === "BR" && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-[#111111] mb-2">CPF/CNPJ</label>
                      <input
                        type="text"
                        name="cpfCnpj"
                        value={formData.cpfCnpj}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#111111] focus:outline-none transition-colors"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold text-[#111111] mb-6">Endereço de Entrega</h2>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-[#111111] mb-2">País *</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#111111] focus:outline-none transition-colors"
                    >
                      {COUNTRIES.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-[#111111] mb-2">
                      {selectedCountry.label} *
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        placeholder={selectedCountry.format}
                        className={`flex-1 px-4 py-3 rounded-xl border-2 ${
                          errors.zipCode ? "border-red-500" : "border-gray-200"
                        } focus:border-[#111111] focus:outline-none transition-colors`}
                      />
                      {formData.country !== "OTHER" && (
                        <button
                          type="button"
                          onClick={searchPostalCode}
                          disabled={isSearchingPostal}
                          className={`px-4 py-3 rounded-xl font-semibold text-sm transition-colors whitespace-nowrap ${
                            isSearchingPostal
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : "bg-[#111111] text-white hover:bg-black"
                          }`}
                        >
                          {isSearchingPostal ? "..." : "Buscar"}
                        </button>
                      )}
                    </div>
                    {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
                  </div>

                  <div className="md:col-span-3">
                    <label className="block text-sm font-semibold text-[#111111] mb-2">Rua *</label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.street ? "border-red-500" : "border-gray-200"
                      } focus:border-[#111111] focus:outline-none transition-colors`}
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
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.number ? "border-red-500" : "border-gray-200"
                      } focus:border-[#111111] focus:outline-none transition-colors`}
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
                      placeholder="Apto, bloco, etc"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#111111] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-[#111111] mb-2">Bairro/Distrito</label>
                    <input
                      type="text"
                      name="neighborhood"
                      value={formData.neighborhood}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#111111] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-[#111111] mb-2">Cidade *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.city ? "border-red-500" : "border-gray-200"
                      } focus:border-[#111111] focus:outline-none transition-colors`}
                    />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-[#111111] mb-2">Estado/Região *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.state ? "border-red-500" : "border-gray-200"
                      } focus:border-[#111111] focus:outline-none transition-colors`}
                    />
                    {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
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
                className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
                  isProcessing
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-[#111111] text-white hover:bg-black active:scale-95"
                }`}
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
