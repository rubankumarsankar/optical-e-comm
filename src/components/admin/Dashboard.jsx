import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
} from "recharts";
import {
  ShoppingCart,
  DollarSign,
  AlertTriangle,
  Users,
} from "lucide-react";

import products from "@/data/products";
import sampleCustomers from "@/data/customers";
import sampleOrders from "@/data/orders";

const Dashboard = () => {
  const [summary, setSummary] = useState({});
  const [sales, setSales] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [lowStock, setLowStock] = useState([]);

  useEffect(() => {
    // 1. Load orders from localStorage
    const localOrders = JSON.parse(localStorage.getItem("optic_orders") || "[]");

    // 2. Summary calculation
    const totalRevenue = localOrders.reduce((acc, o) => {
      if (!o.total) return acc;
      const totalNum =
        typeof o.total === "string"
          ? parseFloat(o.total.replace("₹", ""))
          : o.total;
      return acc + (isNaN(totalNum) ? 0 : totalNum);
    }, 0);

    setSummary({
      orders: localOrders.length,
      revenue: `₹${totalRevenue.toFixed(2)}`,
      lowStock: products.filter((p) => p.quantity < 10).length,
      newCustomers: sampleCustomers.length,
    });

    // 3. Sales chart (mock)
    setSales([
      { month: "Jan", sales: 13000 },
      { month: "Feb", sales: 15500 },
      { month: "Mar", sales: 14500 },
      { month: "Apr", sales: 18500 },
      { month: "May", sales: 22500 },
      { month: "Jun", sales: 24500 },
    ]);

    // 4. Category breakdown
    const categoryMap = {};
    products.forEach((p) => {
      const category = p.frameType || "Unknown";
      categoryMap[category] = (categoryMap[category] || 0) + 1;
    });

    const colors = ["#3B82F6", "#38BDF8", "#8B5CF6", "#14B8A6"];
    const categoryList = Object.keys(categoryMap).map((cat, i) => ({
      name: cat,
      value: categoryMap[cat],
      color: colors[i % colors.length],
    }));
    setCategories(categoryList);
    setOrders(localOrders);
    setLowStock(products.filter((p) => p.quantity < 10));
  }, []);

  return (
    <div className="flex bg-secondary/20">
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="p-6 space-y-6 overflow-y-auto">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <SummaryCard
              label="Total Orders"
              value={summary.orders}
              highlight="↑ 12.5%"
              iconKey="orders"
            />
            <SummaryCard
              label="Total Revenue"
              value={summary.revenue}
              highlight="↑ 8.3%"
              iconKey="revenue"
            />
            <SummaryCard
              label="Low Stock Items"
              value={summary.lowStock}
              highlight="↓ stock"
              iconKey="stock"
              warning
            />
            <SummaryCard
              label="New Customers"
              value={summary.newCustomers}
              highlight="↑ 5.2%"
              iconKey="customers"
            />
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
        </main>
      </div>
    </div>
  );
};

// Icon Map
const iconMap = {
  orders: <ShoppingCart className="w-6 h-6 text-blue-500" />,
  revenue: <DollarSign className="w-6 h-6 text-green-500" />,
  stock: <AlertTriangle className="w-6 h-6 text-red-500" />,
  customers: <Users className="w-6 h-6 text-purple-500" />,
};

const SummaryCard = ({ label, value, highlight, warning, iconKey }) => (
  <div className="bg-white p-4 shadow rounded-lg flex items-center gap-4">
    <div className="bg-gray-100 p-2 rounded-full">{iconMap[iconKey]}</div>
    <div>
      <p className="text-sm text-secondary">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
      <p className={`text-sm ${warning ? "text-red-500" : "text-green-500"}`}>
        {highlight}
      </p>
    </div>
  </div>
);

export default Dashboard;
