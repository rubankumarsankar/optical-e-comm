import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import HomePage from './pages/HomePage';
import CategoryPage from './components/CategoryPage';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import { Toaster } from "react-hot-toast";
import CheckoutPage from './pages/CheckoutPage';

// import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main user layout */}
        <Route element={<MainLayout />}>  
        {/* <Toaster position="top-right" /> */}
          <Route path="/" element={<HomePage />} />
          <Route path="signin" element={<Login />} />
          <Route path="signup" element={<Register />} />
          <Route path="/Eyeglasses" element={<CategoryPage />} />
          <Route path="products" element={<ProductCard />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          
          {/* Add more public routes here */}
        </Route>

        {/* Admin layout */}
        {/* <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
         
        </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
