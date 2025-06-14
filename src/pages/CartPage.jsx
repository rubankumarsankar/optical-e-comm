import { useEffect, useState } from "react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();


  /** Load cart from localStorage on mount */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("optic_cart") || "[]");
    // Ensure each item has a qty field (fallback to 1)
    setCartItems(stored.map((i) => ({ ...i, qty: i.qty || 1 })));
  }, []);

  /** Write the updated cart back to localStorage */
  const syncCart = (items) => {
    localStorage.setItem("optic_cart", JSON.stringify(items));
    setCartItems(items);
  };

  /** Increment, decrement, or remove helpers */
  const incrementQty = (id) => {
    const updated = cartItems.map((p) =>
      p.id === id ? { ...p, qty: p.qty + 1 } : p
    );
    syncCart(updated);
  };

  const decrementQty = (id) => {
    let updated = cartItems.map((p) =>
      p.id === id ? { ...p, qty: p.qty - 1 } : p
    );
    // Remove if qty drops to 0
    updated = updated.filter((p) => p.qty > 0);
    syncCart(updated);
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((p) => p.id !== id);
    syncCart(updated);
  };

  /** Compute grand total */
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );


const handleCheckout = () => {
  if (cartItems.length === 0) return;
  navigate("/checkout");
};


  return (
    <div className="bg-gray-100 min-h-screen px-4 py-20">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-6 max-w-5xl mx-auto">
          {/* Cart rows */}
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded shadow flex flex-col sm:flex-row gap-4 items-center"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-cover rounded"
              />

              {/* Info */}
              <div className="flex-1">
                <h4 className="font-semibold">{item.title}</h4>
                <p className="text-sm text-gray-500">{item.brand}</p>
                <p className="font-medium text-blue-600 mt-1">
                  ₹{item.price.toFixed(2)}
                </p>
              </div>

              {/* Quantity controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => decrementQty(item.id)}
                  className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  <FaMinus size={12} />
                </button>

                <span className="w-8 text-center">{item.qty}</span>

                <button
                  onClick={() => incrementQty(item.id)}
                  className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  <FaPlus size={12} />
                </button>
              </div>

              {/* Sub‑total */}
              <p className="w-24 text-right font-semibold">
                ₹{(item.price * item.qty).toFixed(2)}
              </p>

              {/* Remove */}
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-600"
                title="Remove"
              >
                <FaTrash />
              </button>
            </div>
          ))}

          {/* Order summary */}
          <div className="bg-white p-6 rounded shadow text-right">
            <p className="text-xl font-bold">
              Total: <span className="text-blue-600">₹{total.toFixed(2)}</span>
            </p>
           <button
  onClick={handleCheckout}
  className="mt-4 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
>
  Proceed to Checkout
</button>

          </div>
        </div>
      )}
    </div>
  );
}
