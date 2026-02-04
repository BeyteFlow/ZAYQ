import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { CartIcon } from "../../../features/cart"

interface NavItem {
  label: string
  path: string
}

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems: NavItem[] = [
    { label: "Cases", path: "/products" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-[#f4f4f4] px-6 py-2 md:px-12 md:py-3 border-b border-gray-200">
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-[#f4f4f4] px-6 py-2 md:px-12 md:py-3 border-b border-[#3D1A12]/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <div className="shrink-0">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#3D1A12]">
            ZAYQ
          </h1>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-12">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative group py-1 font-medium transition-colors ${location.pathname === item.path ? "text-[#3D1A12]" : "text-[#3D1A12]/60"
                }`}
            >
              {item.label}
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-[#3D1A12] transition-all duration-300 ${location.pathname === item.path ? "w-full" : "w-0 group-hover:w-full"
                  }`}
              />
            </Link>
          ))}
        </div>

        {/* Action Button + Cart + Mobile Toggle */}
        <div className="flex items-center space-x-4">
          {/* Carrinho (aparece no desktop e mobile) */}
          <CartIcon />

          <Link
            to="/buy"
            className="hidden md:block bg-[#3D1A12] text-white px-8 py-3 rounded-xl font-semibold text-sm hover:bg-[#4D2A22] transition-colors shadow-sm"
          >
            Own now
          </Link>

          <button
            className="md:hidden p-2 text-[#3D1A12]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 pb-4 space-y-4 flex flex-col items-center animate-in fade-in slide-in-from-top-4 duration-200">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-lg font-medium ${location.pathname === item.path
                  ? "text-[#3D1A12] border-b-2 border-[#3D1A12]"
                  : "text-[#3D1A12]/60"
                }`}
            >
              {item.label}
            </Link>
          ))}

          <Link
            to="/buy"
            className="w-full text-center max-w-50 bg-[#3D1A12] text-white px-6 py-3 rounded-xl font-semibold text-sm"
          >
            Buy Now
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar;