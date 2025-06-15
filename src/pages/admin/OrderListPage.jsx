import React, { useEffect, useState } from "react";
import sampleOrders from "../../data/orders";
import { FaEye } from "react-icons/fa";
import { toast } from "react-toastify";

// Status color
const getStatusColor = (status) => {
  switch (status) {
    case "Pending": return "bg-yellow-100 text-yellow-700";
    case "Shipped": return "bg-primary text-primary";
    case "Delivered": return "bg-green-100 text-green-700";
    case "Cancelled": return "bg-red-100 text-red-700";
    default: return "bg-secondary/20 text-secondary";
  }
};

export default function OrderListPage() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const localOrders = JSON.parse(localStorage.getItem("optic_orders")) || [];
    const allOrders = [...sampleOrders, ...localOrders];

    const enriched = allOrders.map((order) => ({
      ...order,
      status: order.status || "Pending",
      createdAt: order.createdAt || new Date().toISOString(),
      customer: {
        ...order.customer,
        name: order.customer?.name || "Unknown",
        email: order.customer?.email || "N/A",
        phone: order.customer?.phone || "N/A",
        address: order.customer?.address || "-",
        zip: order.customer?.zip || "-",
        paymentMethod: order.customer?.paymentMethod || "N/A",
      },
    }));

    setOrders(enriched);
  }, []);

  const closeModal = () => setSelectedOrder(null);

  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-secondary">Order List</h2>
        <p className="text-sm text-secondary">Showing {orders.length} orders</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-xl">
          <thead>
            <tr className="bg-secondary/20 text-sm font-semibold text-secondary">
              <th className="py-2 px-4 border">Order ID</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Phone</th>
              <th className="py-2 px-4 border">Payment</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b hover:bg-gray-50 text-sm text-secondary"
              >
                <td className="py-2 px-4 border font-medium">{order.id}</td>
                <td className="py-2 px-4 border">{order.customer.name}</td>
                <td className="py-2 px-4 border">{order.customer.email}</td>
                <td className="py-2 px-4 border">{order.customer.phone}</td>
                <td className="py-2 px-4 border capitalize">
                  {order.customer.paymentMethod}
                </td>
                <td className="py-2 px-4 border">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(order.status)}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-2 px-4 border">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border">
                  <button
                    className="text-primary hover:text-primary"
                    onClick={() => setSelectedOrder(order)}
                    title="View Order Details"
                  >
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="text-center py-6 text-secondary">No orders found.</p>
        )}
      </div>

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative">
            <h3 className="text-lg font-bold mb-4 text-secondary">
              Order #{selectedOrder.id} Details
            </h3>
            <div className="text-sm text-secondary space-y-2">
              <p><strong>Name:</strong> {selectedOrder.customer.name}</p>
              <p><strong>Email:</strong> {selectedOrder.customer.email}</p>
              <p><strong>Phone:</strong> {selectedOrder.customer.phone}</p>
              <p><strong>Address:</strong> {selectedOrder.customer.address}, {selectedOrder.customer.zip}</p>
              <p><strong>Payment:</strong> {selectedOrder.customer.paymentMethod}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(selectedOrder.status)}`}>
                  {selectedOrder.status}
                </span>
              </p>
              <p><strong>Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>

              {/* Product Items if available */}
              {selectedOrder.items?.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Items:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedOrder.items.map((item, i) => (
                      <li key={i}>
                        {item.name} × {item.qty} – ₹{item.price}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <button
              className="absolute top-2 right-3 text-secondary hover:text-red-600 text-lg"
              onClick={closeModal}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
