import { Smartphone } from "lucide-react";

const ModelGrid = () => (
    <section className="py-20 px-4 bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-[#3D1A12] tracking-tight">
                Perfect Fit for Every iPhone
            </h2>
            <p className="text-xl text-[#3D1A12]/60 mb-16 max-w-3xl mx-auto font-light">
                From the latest iPhone 16 Pro Max to classic models, we've got you covered.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[
                    "iPhone 16 Pro Max", "iPhone 16 Pro", "iPhone 16 Plus", "iPhone 16",
                    "iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15 Plus", "iPhone 15",
                    "iPhone 14 Pro Max", "iPhone 14 Pro", "iPhone 14 Plus", "iPhone 14"
                ].map((model, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-[#D4AF37]/30 transition-all border border-[#3D1A12]/5 group">
                        {/* Swapped blue for Brand Brown with a Gold hover effect */}
                        <Smartphone className="text-[#3D1A12] mx-auto mb-3 transition-colors group-hover:text-[#D4AF37]" size={32} />
                        <div className="text-sm font-semibold text-[#3D1A12] tracking-tight">{model}</div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default ModelGrid;