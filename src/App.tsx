import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Navbar from "./assets/components/layout/Navbar"
import Footer from "./assets/components/layout/Footer"
import About from "./features/about/About"
import Homepage from "./features/home/Homepage"
import ProductsPage from "./features/products/components/Page/ProductsPage"
import Contact from "./features/contact/Contact"
import AddProductPage from "./admin/page/AddProductPage"
import { CheckoutPage } from "./features/checkout/CheckoutPage"

import NotFound from "./pages/404Page"
import PrivacyPolicy from "./features/legal/PrivacyPolicy"
import RefundPolicy from "./features/legal/RefundPolicy"
import TermsOfService from "./features/legal/TermsOfService"
const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/about" element={<About/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/add" element={<AddProductPage/>}/>
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />  
            <Route path="/refund-policy" element={<RefundPolicy />} />  
            <Route path="/terms-of-service" element={<TermsOfService />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  )
}

export default App