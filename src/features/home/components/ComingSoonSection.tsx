import { motion } from "framer-motion";

const ComingSoonSection = () => {
    return (
        <section className="relative h-[60vh] bg-[#F4F4F4] overflow-hidden flex items-center justify-center py-20">
            <div className="absolute inset-0 opacity-40">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-[#3D1A12]/30 via-transparent to-transparent" />
            </div>

            <div className="relative z-10 text-center px-6">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    className="inline-block px-4 py-1 border border-[#3D1A12]/20 rounded-full mb-8"
                >
                    <span className="text-[#3D1A12] text-[9px] font-black uppercase tracking-[0.3em]">
                        Drop 02 - Fall 24
                    </span>
                </motion.div>

                <h2 className="text-5xl md:text-7xl font-black text-[#3D1A12] mb-6 tracking-tighter">
                    THE STEALTH
                    <br />
                    <span className="text-[#3D1A12]/30 italic">COLLECTION</span>
                </h2>

                <p className="text-[#3D1A12]/60 max-w-md mx-auto text-sm leading-relaxed mb-10">
                    Our most advanced carbon-fiber series is currently in final testing
                    phases. Be the first to secure the next generation of ZAYQ.
                </p>

                <div className="flex justify-center">
                    <div className="flex bg-[#3D1A12]/5 p-1 rounded-full border border-[#3D1A12]/10 max-w-md w-full">
                        <input
                            type="email"
                            placeholder="ENTER YOUR EMAIL"
                            className="bg-transparent border-none focus:ring-0 text-[#3D1A12] placeholder:text-[#3D1A12]/30 text-[10px] font-bold uppercase tracking-widest px-6 flex-1"
                        />
                        <button className="px-6 py-3 bg-[#3D1A12] text-[#F4F4F4] text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-[#4D2A22] transition-colors">
                            Notify Me
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ComingSoonSection;
