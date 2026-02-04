import ContactForm from "./components/ContactForm";
import ContactHero from "./components/ContactHero";
import ContactInfo from "./components/ContactInfo";
const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F6F4F1] p-6 md:p-12 lg:p-24 selection:bg-[#3D1E16] selection:text-white">
      <div className="max-w-6xl mx-auto">
        <ContactHero />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            <ContactInfo />
            {/* Minimal Map Placeholder */}
            <div className="w-full h-32 bg-[#E6E3DF] rounded-2xl flex items-center justify-center border border-[#DEDAD5]">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#8C7A76]">Our Location</span>
            </div>
          </div>

          <div className="bg-[#EFECE8] p-8 md:p-10 rounded-[2.5rem] border border-[#E6E3DF]">
            <h3 className="text-xl font-bold text-[#3D1E16] tracking-tight mb-8">Direct Message</h3>
            <ContactForm />
          </div>
        </div>

        <footer className="mt-24 pt-8 border-t border-[#E6E3DF] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[9px] font-black uppercase tracking-widest text-[#8C7A76]">© 2024 ZayqCase Studio</p>
          <div className="flex gap-6">
            <span className="text-[9px] font-black uppercase tracking-widest text-[#8C7A76] cursor-pointer">Privacy</span>
            <span className="text-[9px] font-black uppercase tracking-widest text-[#8C7A76] cursor-pointer">Terms</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ContactPage;