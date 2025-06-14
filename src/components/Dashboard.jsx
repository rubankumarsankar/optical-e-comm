import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis } from "recharts";
import Sidebar from "../components/Sidebar";
import TopHeader from "../components/TopHeader";

const Dashboard = () => {
  const [summary, setSummary] = useState({});
  const [sales, setSales] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [lowStock, setLowStock] = useState([]);

  useEffect(() => {
    // Mock Data
    setSummary({
      orders: 1243,
      revenue: "$187,659.99",
      lowStock: 12,
      newCustomers: 87,
    });

    setSales([
      { month: "Jan", sales: 13000 },
      { month: "Feb", sales: 15500 },
      { month: "Mar", sales: 14500 },
      { month: "Apr", sales: 18500 },
      { month: "May", sales: 22500 },
      { month: "Jun", sales: 24500 },
    ]);

    setCategories([
      { name: "Eyeglasses", value: 40, color: "#3B82F6" },
      { name: "Sunglasses", value: 30, color: "#38BDF8" },
      { name: "Contact Lenses", value: 20, color: "#8B5CF6" },
      { name: "Accessories", value: 10, color: "#14B8A6" },
    ]);

    setOrders([
      { id: "#1001", name: "Emma Johnson", date: "2025-06-12", total: "$349.98", status: "Completed" },
      { id: "#1002", name: "Michael Chen", date: "2025-06-12", total: "$199.99", status: "Processing" },
      { id: "#1003", name: "Sophia Rodriguez", date: "2025-06-11", total: "$459.97", status: "Shipped" },
    ]);

    setLowStock([
      { name: "Rectangle Titanium Frame", brand: "Oakley", stock: 5, status: "Critical" },
      { name: "Aviator Blue Light Glasses", brand: "Tom Ford", stock: 8, status: "Low" },
    ]);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* <Sidebar /> */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* <TopHeader /> */}

        <main className="p-6 space-y-6 overflow-y-auto">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <SummaryCard label="Total Orders" value={summary.orders} highlight="↑ 12.5%" />
            <SummaryCard label="Total Revenue" value={summary.revenue} highlight="↑ 8.3%" />
            <SummaryCard label="Low Stock Items" value={summary.lowStock} highlight="↓ 3 items" warning />
            <SummaryCard label="New Customers" value={summary.newCustomers} highlight="↑ 5.2%" />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-2 bg-white p-4 shadow rounded-lg">
              <h2 className="font-semibold text-lg mb-2">Monthly Sales</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={sales}>
                  <XAxis dataKey="month" />
                  <Bar dataKey="sales" fill="#3B82F6" />
                  <Tooltip />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-4 shadow rounded-lg">
              <h2 className="font-semibold text-lg mb-2">Product Categories</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={categories}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    label
                  >
                    {categories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Orders + Low Stock */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-4 shadow rounded-lg">
              <h2 className="font-semibold text-lg mb-2">Recent Orders</h2>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} className="border-b">
                      <td>{o.id}</td>
                      <td>{o.name}</td>
                      <td>{o.date}</td>
                      <td>{o.total}</td>
                      <td>
                        <span className={`px-2 py-1 rounded text-white text-xs ${
                          o.status === "Completed"
                            ? "bg-green-500"
                            : o.status === "Processing"
                            ? "bg-blue-500"
                            : "bg-purple-500"
                        }`}>
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-white p-4 shadow rounded-lg">
              <h2 className="font-semibold text-lg mb-2">Low Stock Items</h2>
              <ul>
                {lowStock.map((item, index) => (
                  <li key={index} className="flex justify-between py-2 border-b text-sm">
                    <div>
                      <p>{item.name} <span className="text-gray-500">({item.brand})</span></p>
                      <p className="text-gray-500">Stock: {item.stock}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs font-semibold ${
                        item.status === "Critical"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}>
                        {item.status}
                      </span>
                      <button className="block text-blue-500 hover:underline text-xs mt-1">
                        Reorder
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Reusable Summary Card
const SummaryCard = ({ label, value, highlight, warning }) => (
  <div className="bg-white p-4 shadow rounded-lg">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-2xl font-bold">{value}</p>
    <p className={`text-sm ${warning ? "text-red-500" : "text-green-500"}`}>{highlight}</p>
  </div>
);

export default Dashboard;
