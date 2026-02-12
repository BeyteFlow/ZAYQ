import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CartIcon } from "../../../features/cart";

interface NavItem {
  label: string;
  path: string;
}

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { label: "Cases", path: "/products" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 w-full bg-[#f4f4f4]/80 backdrop-blur-md px-6 py-2 md:px-12 md:py-3 border-b border-[#3D1A12]/10"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="shrink-0">
          <Link
            to={"/"}
            className="text-2xl md:text-3xl font-bold tracking-tight text-[#3D1A12]"
          >
            ZAYQ
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-12">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative group py-1 font-medium transition-colors ${
                location.pathname === item.path
                  ? "text-[#3D1A12]"
                  : "text-[#3D1A12]/60"
              }`}
            >
              {item.label}
              <motion.span
                layoutId="navUnderline"
                className={`absolute bottom-0 left-0 h-0.5 bg-[#3D1A12] ${
                  location.pathname === item.path
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                } transition-all duration-300`}
              />
            </Link>
          ))}
        </div>

        {/* Action Button + Cart + Mobile Toggle */}
        <div className="flex items-center space-x-4">
          <CartIcon />

          <Link
            to="/products"
            className="hidden md:block bg-[#3D1A12] text-white px-8 py-3 rounded-xl font-semibold text-sm hover:bg-[#4D2A22] transition-colors shadow-sm"
          >
            Own now
          </Link>

          <button
            className="md:hidden p-2 text-[#3D1A12]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <motion.div animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}>
              {isMobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden pb-6 space-y-4 flex flex-col items-center"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-lg font-medium ${
                  location.pathname === item.path
                    ? "text-[#3D1A12]"
                    : "text-[#3D1A12]/60"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/buy"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center max-w-50 bg-[#3D1A12] text-white px-6 py-3 rounded-xl font-semibold text-sm"
            >
              Buy Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
