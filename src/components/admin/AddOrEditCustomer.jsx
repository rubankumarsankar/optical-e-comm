import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AddOrEditCustomer() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    zip: "",
  });

  useEffect(() => {
    if (isEdit) {
      const customers = JSON.parse(localStorage.getItem("optic_customers")) || [];
      const current = customers.find((c) => String(c.id) === id);
      if (current) setFormData(current);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const customers = JSON.parse(localStorage.getItem("optic_customers")) || [];

    if (isEdit) {
      const updated = customers.map((c) => (String(c.id) === id ? formData : c));
      localStorage.setItem("optic_customers", JSON.stringify(updated));
    } else {
      const newCustomer = {
        ...formData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem("optic_customers", JSON.stringify([...customers, newCustomer]));
    }

    navigate("/admin/customers");
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">{isEdit ? "Edit" : "Add"} Customer</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          className="border px-3 py-2 rounded"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          className="border px-3 py-2 rounded"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          className="border px-3 py-2 rounded"
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
        <input
          className="border px-3 py-2 rounded"
          placeholder="Address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />
        <input
          className="border px-3 py-2 rounded"
          placeholder="Zip Code"
          value={formData.zip}
          onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
        />
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate("/admin/customers")}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
            {isEdit ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}
