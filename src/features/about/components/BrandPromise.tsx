import { Check, Shield } from "lucide-react";
const BrandPromise = () => (
  <section className="py-20 px-4 bg-[#3D1A12] text-[#F7F7F7]">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 leading-tight">
            The iPhone Case Promise
          </h2>
          <div className="space-y-6">
            {[
              "Precision-cut for your exact iPhone model",
              "100% MagSafe and wireless charging compatible",
              "Military-grade drop protection tested",
              "Premium materials that won't yellow or fade",
              "Lifetime warranty against defects",
              "Free returns within 30 days"
            ].map((promise, index) => (
              <div key={index} className="flex items-start gap-4">
                <Check className="text-[#D4AF37] shrink-0 mt-1" size={24} />
                <span className="text-lg text-gray-300">{promise}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative h-100 rounded-3xl overflow-hidden">
          <div className="w-full h-full bg-linear-to-br from-blue-600 to-purple-600 flex items-center justify-center">
            <Shield className="text-white opacity-40" size={140} />
            <img
              src="https://cdn.thewirecutter.com/wp-content/media/2024/10/BEST-IPHONE-16-CASES-2048px-4833-2x1-1.jpg?width=2048&quality=75&crop=2:1&auto=webp"
              alt="Quality"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);
export default BrandPromise;