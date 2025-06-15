import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function CustomerViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const customers = JSON.parse(localStorage.getItem("optic_customers")) || [];
    const current = customers.find((c) => String(c.id) === id);
    if (current) setCustomer(current);
  }, [id]);

  if (!customer) return <p className="text-center p-6">Customer not found.</p>;

  return (
    <div className="p-6 max-w-xl bg-white rounded-xl shadow mx-auto">
      <h2 className="text-xl font-bold mb-4">Customer Details</h2>
      <div className="space-y-2 text-secondary">
        <p><strong>Name:</strong> {customer.name}</p>
        <p><strong>Email:</strong> {customer.email}</p>
        <p><strong>Phone:</strong> {customer.phone}</p>
        <p><strong>Address:</strong> {customer.address}</p>
        <p><strong>Zip:</strong> {customer.zip}</p>
        <p><strong>Joined:</strong> {new Date(customer.createdAt).toLocaleDateString()}</p>
      </div>
      <button
        onClick={() => navigate("/admin/customers")}
        className="mt-6 text-primary hover:underline"
      >
        ← Back to Customer List
      </button>
    </div>
  );
}
