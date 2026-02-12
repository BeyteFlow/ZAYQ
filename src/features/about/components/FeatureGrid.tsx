import { Zap, Camera, Palette, Radio, Volume2, Hand, Droplets, Leaf } from "lucide-react";

const FeatureGrid = () => (
    <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-semibold mb-16 text-center text-[#3D1A12] tracking-tight">
                Everything Your iPhone Case Should Be
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { icon: Zap, title: "Wireless Charging", desc: "Works with MagSafe & Qi chargers", color: "text-[#3D1A12]" },
                    { icon: Camera, title: "Camera Protection", desc: "Raised bezels protect your lenses", color: "text-[#D4AF37]" }, // Gold accent
                    { icon: Palette, title: "Premium Finish", desc: "Scratch-resistant coating", color: "text-[#3D1A12]" },
                    { icon: Radio, title: "MagSafe Ready", desc: "Built-in magnetic ring", color: "text-[#3D1A12]" },
                    { icon: Volume2, title: "Crystal Clear Audio", desc: "Precision-cut speaker holes", color: "text-[#3D1A12]" },
                    { icon: Hand, title: "Grip & Comfort", desc: "Non-slip textured sides", color: "text-[#D4AF37]" }, // Gold accent
                    { icon: Droplets, title: "Color Options", desc: "Match your iPhone style", color: "text-[#3D1A12]" },
                    { icon: Leaf, title: "Eco-Friendly", desc: "Recyclable packaging", color: "text-[#3D1A12]" }
                ].map((item, index) => (
                    <div key={index} className="bg-[#F7F7F7] rounded-2xl p-6 hover:bg-white hover:shadow-xl hover:shadow-[#3D1A12]/5 transition-all border border-[#3D1A12]/5 group">
                        <item.icon className={`${item.color} mb-4 transition-transform group-hover:scale-110`} size={32} />
                        <h3 className="font-semibold text-[#3D1A12] mb-2">{item.title}</h3>
                        <p className="text-sm text-[#3D1A12]/60 font-light">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default FeatureGrid;