import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import AboutHero from "./components/AboutHero";
import ModelGrid from "./components/ModelGrid";
import AboutStory from "./components/AboutStory";
import CoreFeatures from "./components/CoreFeatures";
import FeatureGrid from "./components/FeatureGrid";
import BrandPromise from "./components/BrandPromise";
import Testimonials from "./components/Testimonials";

function AboutContent() {
  return (
    /* Selection color updated to a soft gold tint */
    <div className="bg-white font-sans selection:bg-[#D4AF37]/30">
      <AboutHero />
      <ModelGrid />
      <AboutStory />
      <CoreFeatures />
      <FeatureGrid />
      <BrandPromise />
      <Testimonials />

      {/* Final CTA Section: Replaced Slate with Deep Brand Brown */}
      <section className="py-24 px-4 bg-[#3D1A12] text-white overflow-hidden relative">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-[#D4AF37]/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-semibold mb-8 leading-tight tracking-tight">
            Ready to Protect Your iPhone?
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-[#F7F7F7]/80 font-light">
            Shop our collection of premium iPhone cases designed for every model.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {/* Primary Gold Button */}
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 bg-[#D4AF37] text-[#3D1A12] px-10 py-4 rounded-full font-bold text-lg hover:bg-[#C29D2C] transition-all shadow-xl active:scale-95"
            >
              Shop iPhone Cases
              <ChevronRight size={22} />
            </Link>

            {/* Secondary Outlined Button */}
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white/20 text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-[#3D1A12] transition-all active:scale-95"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutContent;