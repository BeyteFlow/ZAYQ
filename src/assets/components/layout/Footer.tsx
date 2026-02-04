import React from "react";
import { Link, useLocation } from "react-router-dom";

const Footer: React.FC = () => {
  const { pathname } = useLocation();

  const linkClass = (path: string) =>
    `transition-colors ${pathname === path
      ? "text-[#3D1A12] font-semibold"
      : "text-[#3D1A12]/60 hover:text-[#3D1A12]"
    }`;

  return (
    <footer className="w-full bg-[#f4f4f4] pt-16 pb-8 px-6 md:px-12 border-t border-[#3D1A12]/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 md:gap-8 mb-16">

          {/* Shop Column */}
          <div>
            <h3 className="font-bold text-[#3D1A12] mb-6">Shop</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/products" className={linkClass("/products")}>
                  Cases
                </Link>
              </li>
              <li>
                <Link to="/faqs" className={linkClass("/faqs")}>
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Info Column */}
          <div>
            <h3 className="font-bold text-[#3D1A12] mb-6">Info</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className={linkClass("/about")}>
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className={linkClass("/contact")}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us Column */}
          <div>
            <h3 className="font-bold text-[#3D1A12] mb-6">Follow Us</h3>
            <div className="flex space-x-4">
              {/* Instagram Icon */}
              <a
                href="#"
                className="text-[#3D1A12]/70 hover:text-[#3D1A12] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              {/* Twitter/X Icon */}
              <a
                href="#"
                className="text-[#3D1A12]/70 hover:text-[#3D1A12] transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-8 border-t border-[#3D1A12]/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-[#3D1A12]/50 font-medium">
          <div className="order-2 md:order-1">
            © 2024 ZAYQ. All rights reserved.
          </div>
          <div className="flex space-x-8 order-1 md:order-2">
            <Link to="/privacy-policy" className="hover:text-[#3D1A12] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-[#3D1A12] transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/refund-policy" className="hover:text-[#3D1A12] transition-colors">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;