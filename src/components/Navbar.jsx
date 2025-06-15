import { useState, useEffect, useRef } from 'react';
import { FaUser, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Navbar() {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const checkLogin = () => {
      const user = localStorage.getItem('optic_logged_in');
      setIsLoggedIn(!!user);
    };

    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('optic_cart') || '[]');
      const totalQty = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
      setCartCount(totalQty);
    };

    checkLogin();
    updateCartCount();

    window.addEventListener('storage', () => {
      checkLogin();
      updateCartCount();
    });

    return () => {
      window.removeEventListener('storage', () => {
        checkLogin();
        updateCartCount();
      });
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('optic_logged_in');
    setIsLoggedIn(false);
    setDropdownOpen(false);
    toast.success("Logged out successfully!", {
      autoClose: 1500,
      onClose: () => navigate('/')
    });
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <ToastContainer position="top-right" />
      <nav className="w-full bg-white shadow-md fixed z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="text-primary font-bold text-xl">VisionOptic</a>

          <input
            type="text"
            placeholder="Search for frames, lenses, brands..."
            className="hidden md:block w-96 px-4 py-2 border rounded-full shadow-sm text-sm"
          />

          <div className="flex gap-6 items-center text-sm text-secondary">
            <div className="hidden md:flex gap-6">
              <a href="/category/eyeglasses">Eyeglasses</a>
              <a href="/category/sunglasses">Sunglasses</a>
              <a href="/category/lenses">Contact Lenses</a>
              {/* <a href="#">Brands</a> */}
              {/* <a href="#">Sale</a> */}
            </div>

            {/* Icons */}
            <div className="flex items-center gap-4 relative">
              {/* User icon with dropdown */}
              <div className="relative" ref={dropdownRef}>
                <FaUser
                  className="cursor-pointer"
                  onClick={() => setDropdownOpen(!isDropdownOpen)}
                />
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border shadow-md rounded-md py-2 z-50">
                    {!isLoggedIn ? (
                      <>
                        <a
                          href="/signin"
                          className="block px-4 py-2 hover:bg-secondary/40 text-sm"
                        >
                          Sign In
                        </a>
                        <a
                          href="/signup"
                          className="block px-4 py-2 hover:bg-secondary/40 text-sm"
                        >
                          Register
                        </a>
                      </>
                    ) : (
                      <>
                        <a
                          href="/my-orders"
                          className="block px-4 py-2 hover:bg-secondary/40 text-sm"
                        >
                          My Orders
                        </a>
                        <a
                          href="#"
                          onClick={handleLogout}
                          className="block px-4 py-2 hover:bg-secondary/40 text-sm text-red-500"
                        >
                          Logout
                        </a>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Wishlist */}
              <FaHeart
                className="cursor-pointer hover:text-red-500 transition"
                onClick={() => navigate('/wishlist')}
              />

              {/* Cart */}
              <div className="relative">
                <FaShoppingCart
                  className="cursor-pointer hover:text-primary transition"
                  onClick={() => navigate('/cart')}
                />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full px-1.5 text-xs">
                    {cartCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
