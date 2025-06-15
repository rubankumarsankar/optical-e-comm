import { useEffect, useState } from "react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Load cart items from localStorage when the page loads
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("optic_cart") || "[]");
    const initializedCart = storedCart.map((item) => ({
      ...item,
      qty: item.qty || 1,
    }));
    setCartItems(initializedCart);
  }, []);

  // Save cart items to localStorage whenever there's an update
  const updateCart = (items) => {
    localStorage.setItem("optic_cart", JSON.stringify(items));
    setCartItems(items);
  };

  // Quantity controls
  const increaseQty = (id) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    );
    updateCart(updated);
  };

  const decreaseQty = (id) => {
    const updated = cartItems
      .map((item) =>
        item.id === id ? { ...item, qty: item.qty - 1 } : item
      )
      .filter((item) => item.qty > 0);
    updateCart(updated);
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    updateCart(updated);
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      navigate("/checkout");
    }
  };

  return (
    <div className="bg-gray-100 px-4 py-20">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="max-w-5xl mx-auto space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded shadow flex flex-col sm:flex-row items-center gap-4"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-cover rounded"
              />

              <div className="flex-1">
                <h4 className="font-semibold">{item.title}</h4>
                <p className="text-sm text-gray-500">{item.brand}</p>
                <p className="text-primary font-medium mt-1">
                  ₹{item.price.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  <FaMinus size={12} />
                </button>
                <span className="w-8 text-center">{item.qty}</span>
                <button
                  onClick={() => increaseQty(item.id)}
                  className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  <FaPlus size={12} />
                </button>
              </div>

              <p className="w-24 text-right font-semibold">
                ₹{(item.price * item.qty).toFixed(2)}
              </p>

              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-600"
              >
                <FaTrash />
              </button>
            </div>
          ))}

          <div className="bg-white p-6 rounded shadow text-right">
            <p className="text-xl font-bold">
              Total:{" "}
              <span className="text-primary">₹{totalAmount.toFixed(2)}</span>
            </p>
            <button
              onClick={handleCheckout}
              className="mt-4 px-6 py-3 bg-primary text-white rounded hover:bg-primary-dark"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
