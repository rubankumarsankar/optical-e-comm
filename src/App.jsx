import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

import HomePage from "./pages/HomePage";
import CategoryPage from "./components/CategoryPage";
import ProductCard from "./components/ProductCard";
import ProductDetail from "./components/ProductDetail";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import CheckoutPage from "./pages/CheckoutPage";
import MyOrdersPage from "./pages/MyOrdersPage";

import AdminPage from "./pages/AdminPage";
import Dashboard from "./components/Dashboard";
import ProductPage from "./pages/ProductPage";
import OrderListPage from "./pages/OrderListPage";
import CustomerListPage from "./pages/CustomerListPage";
import AdminSettingsPage from "./pages/AdminSettingsPage";


import { Toaster } from "react-hot-toast";
import AdminLogin from "./components/AdminLogin";

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>

        {/* -------------------- User Layout -------------------- */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="signin" element={<Login />} />
          <Route path="signup" element={<Register />} />
          <Route path="category/:slug" element={<CategoryPage />} />
          <Route path="category" element={<CategoryPage />} />
          <Route path="products" element={<ProductCard />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="my-orders" element={<MyOrdersPage />} />
        </Route>

        {/* -------------------- Admin Login -------------------- */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* -------------------- Protected Admin Routes -------------------- */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route >
            <Route index element={<AdminPage />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<ProductPage />} />
            <Route path="orders" element={<OrderListPage />} />
            <Route path="customers" element={<CustomerListPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
