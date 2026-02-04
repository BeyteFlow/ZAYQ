import React from "react";
import { ArrowRight } from "lucide-react";
const ContactForm: React.FC = () => (
  <div className="space-y-6 p-8 bg-white rounded-xl">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input 
        type="text" 
        placeholder="Name"
        className="w-full bg-white border border-[#E6E3DF] rounded-xl py-4 px-6 text-sm outline-none focus:border-[#3D1E16] transition-colors text-[#3D1E16]"
      />
      <input 
        type="email" 
        placeholder="Email"
        className="w-full bg-white border border-[#E6E3DF] rounded-xl py-4 px-6 text-sm outline-none focus:border-[#3D1E16] transition-colors text-[#3D1E16]"
      />
    </div>
    <textarea 
      placeholder="Your message"
      rows={4}
      className="w-full bg-white border border-[#E6E3DF] rounded-xl py-4 px-6 text-sm outline-none focus:border-[#3D1E16] transition-colors resize-none text-[#3D1E16]"
    ></textarea>
    <button className="w-full bg-[#3D1E16] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-[#2A150F] transition-all shadow-sm">
      Send Message
      <ArrowRight size={14} />
    </button>
  </div>
);

export default ContactForm;