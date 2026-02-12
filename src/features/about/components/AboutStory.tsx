import { Smartphone } from "lucide-react";

const AboutStory = () => (
    <section className="py-20 px-4 bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                {/* Image Section with Brand Brown Placeholder */}
                <div className="relative h-125 rounded-3xl overflow-hidden shadow-2xl order-2 md:order-1">
                    <div className="w-120 h-full bg-linear-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                        <Smartphone className="text-white opacity-30" size={150} />
                        <img
                            src="https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGFF4_AV3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=Y01nUlJVNy9ZdHZDc1p5K2d3UndCRlZya2lKWlJmUEwrYndWOTJiVWJWQUYwVmtIbGRkS25RMVpBRlo0bk5DUUV4N25mN091OHlyTTc3bnpLWHlnN1E"
                            alt="iPhone Cases"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                <div className="order-1 md:order-2">
                    {/* Badge updated to Gold/Brown theme */}
                    <div className="inline-block bg-[#D4AF37]/10 px-4 py-2 rounded-full mb-6 border border-[#D4AF37]/20">
                        <span className="text-[#3D1A12] font-bold text-xs tracking-widest uppercase">OUR STORY</span>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-[#3D1A12] leading-tight">
                        Protecting iPhones Since 2014
                    </h2>
                    
                    <div className="space-y-4 text-lg text-[#3D1A12]/70 leading-relaxed font-light">
                        <p>
                            We started with a simple mission: create the perfect iPhone case. One that protects
                            without adding bulk, showcases Apple's beautiful design, and feels premium in your hand.
                        </p>
                        <p>
                            Today, we're trusted by over 500,000 iPhone users worldwide. Our cases combine
                            military-grade protection with sleek aesthetics that complement your iPhone's design language.
                        </p>
                        <p className="font-semibold text-[#3D1A12]">
                            Every case is precision-engineered for your specific iPhone model, ensuring perfect
                            alignment with buttons, cameras, and wireless charging.
                        </p>
                    </div>

                    {/* Stats section using the Gold accent for impact */}
                    <div className="flex gap-8 mt-8 border-t border-[#3D1A12]/10 pt-8">
                        {[
                            { number: "500K+", label: "iPhone Users" },
                            { number: "4.9★", label: "App Store Rating" },
                            { number: "10+", label: "Years" }
                        ].map((stat, index) => (
                            <div key={index}>
                                <div className="text-3xl font-bold text-[#D4AF37] mb-1">{stat.number}</div>
                                <div className="text-xs uppercase tracking-widest text-[#3D1A12]/50 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default AboutStory;