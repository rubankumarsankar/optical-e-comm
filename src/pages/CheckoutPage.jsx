import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
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

  // Load cart items on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("optic_cart") || "[]");
    setCartItems(storedCart);
  }, []);

  // Calculate total amount
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle order placement
  const handleCheckout = () => {
    const { name, email, phone, address, zip, paymentMethod } = form;

    // Basic validation
    if (!name || !email || !phone || !address || !zip || !paymentMethod) {
      toast.error("Please fill in all fields and choose a payment method.");
      return;
    }

    // Create new order
    const order = {
      id: Date.now(),
      customer: form,
      items: cartItems,
      total,
      paymentMethod,
      createdAt: new Date().toISOString(),
    };

    const orders = JSON.parse(localStorage.getItem("optic_orders") || "[]");
    orders.push(order);
    localStorage.setItem("optic_orders", JSON.stringify(orders));

    // Clear cart and notify
    localStorage.removeItem("optic_cart");
    toast.success("Order placed successfully!");
    navigate("/my-orders");
  };

  return (
    <motion.div
      className="bg-secondary/20 px-4 py-20"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Billing Form */}
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-3xl font-bold text-secondary mb-6">Billing Info</h2>
          <form className="space-y-5">
            {[
              { name: "name", type: "text", placeholder: "Full Name" },
              { name: "email", type: "email", placeholder: "Email Address" },
              { name: "phone", type: "tel", placeholder: "Phone Number" },
              { name: "zip", type: "text", placeholder: "Zip Code" },
            ].map((field) => (
              <input
                key={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={form[field.name]}
                onChange={handleChange}
                className="w-full p-3 border border-secondary rounded-lg"
                required
              />
            ))}

            <textarea
              name="address"
              rows="3"
              placeholder="Shipping Address"
              value={form.address}
              onChange={handleChange}
              className="w-full p-3 border border-secondary rounded-lg"
            />

            <div>
              <label className="block font-semibold text-secondary mb-2">
                Payment Method
              </label>
              <div className="space-y-3">
                {["cod", "upi", "card"].map((method) => (
                  <label key={method} className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={form.paymentMethod === method}
                      onChange={handleChange}
                      className="accent-primary"
                    />
                    <span className="capitalize">{method}</span>
                  </label>
                ))}
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
          <h2 className="text-3xl font-bold text-secondary mb-6">Order Summary</h2>

          {cartItems.length === 0 ? (
            <p className="text-secondary">No items in cart.</p>
          ) : (
            <div className="space-y-5">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-start border-b pb-3"
                >
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-secondary">Qty: {item.qty || 1}</p>
                  </div>
                  <p className="font-medium text-secondary text-right">
                    ₹{(item.price * (item.qty || 1)).toFixed(2)}
                  </p>
                </div>
              ))}

              <div className="flex justify-between font-bold text-lg border-t pt-4">
                <span>Total</span>
                <span className="text-primary">₹{total.toFixed(2)}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full mt-6 px-6 py-3 text-lg bg-primary text-white rounded-lg hover:bg-primary-dark transition"
              >
                Confirm Order
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CheckoutPage;
