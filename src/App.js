import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext'; // <-- Importa el UserProvider
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductPage from './pages/ProductPage';
import AddProductPage from './pages/AddProductPage';
import CartPage from './pages/CartPage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import Header from './components/Header';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import ProductListAdminPage from './pages/ProductListAdminPage';
import ProductCreatePage from './pages/ProductCreatePage';
import ProductEditPage from './pages/ProductEditPage';
import UserListAdminPage from './pages/UserListAdminPage';
import OrderConfirm from './pages/OrderConfirm';
import Footer from './components/Footer';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';
import AboutPage from './pages/AboutPage';
import CatalogPage from './pages/CatalogPage';
import ScrollToTop from './components/ScrollToTop';


function App() {
  return (
    <Router>
      <UserProvider> {/* <-- Envuelve toda la aplicación con el UserProvider */}
      <ScrollToTop />
        <Header />
        <main className="py-3">
          <Routes>
            <Route path="/" element={<HomePage />} exact />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin/add-product" element={<AddProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/payment" element={<PaymentPage />} /> 
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/admin/products" element={<ProductListAdminPage />} />
            <Route path="/admin/products/create" element={<ProductCreatePage />} />
            <Route path="/admin/product/:id/edit" element={<ProductEditPage />} />
            <Route path='/admin/users' element={<UserListAdminPage />} />
            <Route path="/order-confirmation" element={<OrderConfirm />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsAndConditionsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/products" element={<CatalogPage />} />
          </Routes>
        </main>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;