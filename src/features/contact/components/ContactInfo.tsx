import { MessageCircle,Mail,MapPin,Instagram,Twitter,Globe } from "lucide-react";
const ContactInfo: React.FC = () => (
  <div className="space-y-10">
    <div className="space-y-6">
      <div className="flex items-center gap-6 group cursor-pointer">
        <div className="w-12 h-12 bg-[#3D1E16]/5 rounded-xl flex items-center justify-center text-[#3D1E16]">
          <MessageCircle size={24} />
        </div>
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#8C7A76]">WhatsApp</h4>
          <p className="font-semibold text-[#3D1E16]">+91 00000 00000</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="w-12 h-12 bg-[#3D1E16]/5 rounded-xl flex items-center justify-center text-[#3D1E16]">
          <Mail size={20} />
        </div>
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#8C7A76]">Email</h4>
          <p className="font-semibold text-[#3D1E16]">hello@luxecase.com</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="w-12 h-12 bg-[#3D1E16]/5 rounded-xl flex items-center justify-center text-[#3D1E16]">
          <MapPin size={20} />
        </div>
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#8C7A76]">Studio</h4>
          <p className="font-semibold text-[#3D1E16]">Noida, Sector 62</p>
        </div>
      </div>
    </div>

    <div className="flex gap-4 pt-6 border-t border-[#E6E3DF]">
      {[Instagram, Twitter, Globe].map((Icon, i) => (
        <button key={i} className="w-10 h-10 bg-white border border-[#E6E3DF] rounded-full flex items-center justify-center text-[#3D1E16] hover:bg-[#3D1E16] hover:text-white transition-all shadow-sm" aria-label="social-button">
          <Icon size={16} />
        </button>
      ))}
    </div>
  </div>
);
export default ContactInfo;