import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    zip: "",
    paymentMethod: "cod",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("optic_cart") || "[]");
    setCartItems(cart);
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckout = () => {
    const { name, email, phone, address, zip, paymentMethod } = form;

    if (!name || !email || !phone || !address || !zip || !paymentMethod) {
      toast.error("Please fill in all fields and select a payment method.");
      return;
    }

    // Simulate successful checkout
    localStorage.removeItem("optic_cart");
    toast.success(`Order placed successfully via ${paymentMethod.toUpperCase()}!`);
    navigate("/");
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-100 px-4 py-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Billing Form */}
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Billing Info</h2>
          <form className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="address"
              placeholder="Shipping Address"
              rows="3"
              value={form.address}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="zip"
              placeholder="Zip Code"
              value={form.zip}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div>
              <label className="font-semibold text-gray-700 mb-2 block">
                Payment Method
              </label>
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={form.paymentMethod === "cod"}
                    onChange={handleChange}
                    className="accent-blue-600"
                  />
                  <span>Cash on Delivery (COD)</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={form.paymentMethod === "upi"}
                    onChange={handleChange}
                    className="accent-blue-600"
                  />
                  <span>UPI</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={form.paymentMethod === "card"}
                    onChange={handleChange}
                    className="accent-blue-600"
                  />
                  <span>Credit/Debit Card</span>
                </label>
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <motion.div
          className="bg-white p-8 rounded-xl shadow-md"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Order Summary</h2>

          {cartItems.length === 0 ? (
            <p className="text-gray-500">No items in cart.</p>
          ) : (
            <div className="space-y-5">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-start border-b pb-3"
                >
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-500">Qty: {item.qty || 1}</p>
                  </div>
                  <p className="text-right font-medium text-gray-800">
                    ₹{(item.price * (item.qty || 1)).toFixed(2)}
                  </p>
                </div>
              ))}
              <div className="flex justify-between text-lg font-bold pt-4 border-t">
                <span>Total</span>
                <span className="text-blue-600">₹{total.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="mt-6 w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 text-lg"
              >
                Confirm Order
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
