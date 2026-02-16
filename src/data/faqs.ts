export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: "Payment & billing" | "Shopping & Orders" | "Technical Support";
}

export const faqData: FAQ[] = [
  {
    id: 1,
    question: "What materials are ZAYQ cases made from?",
    answer:
      "ZAYQ cases are made from high-quality, durable materials including polycarbonate and TPU (Thermoplastic Polyurethane) for maximum protection and flexibility.",
    category: "Technical Support",
  },
  {
    id: 2,
    question: "Are ZAYQ cases compatible with wireless charging?",
    answer:
      "Yes, all ZAYQ cases are designed to be compatible with wireless charging, allowing you to charge your device without removing the case.",
    category: "Technical Support",
  },
  {
    id: 3,
    question: "What payment methods do you accept?",
    answer:
      "We accept a variety of payments methods including credit cards, PayPal and  Apple Pay for a seamless checkout experience.",
    category: "Payment & billing",
  },
  {
    id: 4,
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you will receive a tracking number via email. You can use this number to track your order on our website or through the carrier's tracking system.",
    category: "Shopping & Orders",
  },
  {
    id: 5,
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary depending on your location and are calculated at checkout.",
    category: "Shopping & Orders",
  },
  {
    id: 6,
    question: "How do I update my saved billing information?",
    answer:
      "You can update your payment methods by logging into your account, navigating to 'Account Settings,' and selecting the 'Billing' tab.",
    category: "Payment & billing",
  },
];
