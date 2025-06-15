import { useEffect, useState } from "react";
import { FaBoxOpen, FaMapMarkerAlt, FaRupeeSign, FaCalendarAlt } from "react-icons/fa";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("optic_orders") || "[]");
    setOrders(savedOrders.reverse()); // Show recent first
  }, []);

  return (
    <div className="min-h-screen px-4 py-16 bg-gradient-to-b from-gray-50 to-secondary">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-secondary mb-10 text-center">My Orders</h2>

        {orders.length === 0 ? (
          <p className="text-center text-secondary text-lg">You have no orders yet.</p>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-md p-6 border border-secondary transition hover:shadow-lg"
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
                  <div className="flex items-center gap-3 text-primary">
                    <FaBoxOpen className="text-xl" />
                    <div>
                      <p className="font-semibold text-lg">Order #{order.id}</p>
                      <p className="text-sm text-secondary flex items-center gap-1">
                        <FaCalendarAlt /> {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                      {order.status || "Confirmed"}
                    </span>
                  </div>
                </div>

                {/* Shipping */}
                <div className="mb-6">
                  <p className="font-semibold text-secondary mb-1">Shipping Address</p>
                  <p className="text-sm text-secondary flex items-start gap-2">
                    <FaMapMarkerAlt className="mt-0.5 text-primary" />
                    <span>
                      {order.customer.name}, {order.customer.phone}<br />
                      {order.customer.address}, {order.customer.zip}
                    </span>
                  </p>
                </div>

                {/* Items */}
                <div className="mb-4">
                  <p className="font-semibold text-secondary mb-2">Items</p>
                  <div className="divide-y divide-secondary">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="py-3 flex items-center gap-4">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-14 h-14 rounded object-cover"
                          />
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-secondary">{item.title}</p>
                          <p className="text-sm text-secondary">
                            {item.qty || 1} × ₹{item.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          ₹{(item.price * (item.qty || 1)).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center pt-4 border-t mt-4">
                  <div className="text-sm text-secondary">
                    Paid via: <span className="capitalize font-medium text-secondary">{order.paymentMethod}</span>
                  </div>
                  <div className="text-lg font-bold text-primary flex items-center gap-1">
                    <FaRupeeSign /> {order.total.toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
