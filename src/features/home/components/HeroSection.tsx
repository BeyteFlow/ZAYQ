import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  return (
    <section
      ref={targetRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-[#f4f4f4]"
    >
      <motion.div
        style={{ opacity, scale, y }}
        className="z-10 text-center px-6"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[#3D1A12]/60 font-bold uppercase tracking-[0.5em] text-[10px] md:text-xs mb-6"
        >
          Essential Protection Series
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-7xl md:text-9xl font-black text-[#3D1A12] tracking-tighter leading-none"
        >
          ZAYQ<span className="text-[#3D1A12]/40 font-light italic">CASE</span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="mt-8 flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <Link
            to="/products"
            className="px-10 py-4 bg-[#3D1A12] text-white text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-[#4D2A22] transition-all active:scale-95 flex items-center gap-3 shadow-lg shadow-[#3D1A12]/10"
          >
            Shop Collection <ArrowRight size={14} />
          </Link>
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-linear-to-b from-transparent via-[#3D1A12]/5 to-transparent rotate-12" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-[#3D1A12]/10 rounded-full blur-3xl opacity-40" />
      </div>
    </section>
  );
};

export default HeroSection;
