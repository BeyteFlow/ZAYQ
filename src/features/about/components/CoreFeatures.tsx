import { Shield, Sparkles, Award } from "lucide-react";

const CoreFeatures = () => (
    <section className="py-20 px-4 bg-linear-to-b from-[#F7F7F7] to-[#EFEBE9]">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-[#3D1A12] tracking-tight">
                    Designed for iPhone, Built to Last
                </h2>
                <p className="text-xl text-[#3D1A12]/60 max-w-3xl mx-auto font-light">
                    Premium materials and precision engineering that honor Apple's design philosophy.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {[
                    {
                        icon: Shield,
                        title: "MagSafe Compatible",
                        description: "Perfectly aligned magnets work seamlessly with all MagSafe accessories and wireless chargers. Snap on, charge up, no compromises.",
                        color: "from-[#3D1A12] to-[#5D3A32]"
                    },
                    {
                        icon: Sparkles,
                        title: "Premium Materials",
                        description: "Aircraft-grade aluminum buttons, anti-yellowing polycarbonate, and soft-touch silicone. Materials worthy of your iPhone.",
                        color: "from-[#D4AF37] to-[#B8962E]" // Brand Gold
                    },
                    {
                        icon: Award,
                        title: "Military Protection",
                        description: "12ft drop tested and MIL-STD-810G certified. Advanced air cushion technology protects your iPhone from life's accidents.",
                        color: "from-[#3D1A12] to-[#5D3A32]"
                    }
                ].map((feature, index) => (
                    <div key={index} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-all border border-[#3D1A12]/5 group">
                        <div className={`inline-flex p-4 rounded-2xl bg-linear-to-br ${feature.color} text-white mb-6 transition-transform group-hover:scale-110`}>
                            <feature.icon size={36} />
                        </div>
                        <h3 className="text-2xl font-semibold mb-4 text-[#3D1A12]">{feature.title}</h3>
                        <p className="text-[#3D1A12]/70 leading-relaxed font-light">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default CoreFeatures;