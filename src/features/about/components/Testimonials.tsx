import { Star } from "lucide-react";

const Testimonials = () => (
    <section className="py-20 px-4 bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-[#3D1A12] tracking-tight">
                    Loved by iPhone Users
                </h2>
                <p className="text-xl text-[#3D1A12]/60 font-light">Join thousands of satisfied customers</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {[
                    {
                        review: "Finally, a case that doesn't hide my iPhone's beautiful design. The MagSafe works flawlessly and it's survived multiple drops!",
                        name: "Sarah M.",
                        model: "iPhone 15 Pro Max",
                        rating: 5
                    },
                    {
                        review: "Best case I've owned. The camera protection is excellent and wireless charging works perfectly. Worth every penny.",
                        name: "Michael C.",
                        model: "iPhone 16 Pro",
                        rating: 5
                    },
                    {
                        review: "Sleek, protective, and the buttons feel amazing. This is what an iPhone case should be. Highly recommend!",
                        name: "Emily R.",
                        model: "iPhone 15",
                        rating: 5
                    }
                ].map((testimonial, index) => (
                    <div key={index} className="bg-white rounded-3xl p-8 shadow-sm border border-[#3D1A12]/5 hover:shadow-md transition-all">
                        <div className="flex gap-1 mb-6">
                            {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="text-[#D4AF37] fill-[#D4AF37]" size={18} />
                            ))}
                        </div>
                        <p className="text-[#3D1A12]/80 mb-8 text-lg leading-relaxed italic font-light">
                            "{testimonial.review}"
                        </p>
                        <div className="border-t border-[#3D1A12]/10 pt-6">
                            <div className="font-bold text-[#3D1A12] tracking-tight">{testimonial.name}</div>
                            <div className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mt-1">
                                {testimonial.model} Owner
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default Testimonials;