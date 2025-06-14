import React, { useEffect, useState } from "react";
import sampleCustomers from "../data/customers";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

export default function CustomerListPage() {
  const [customers, setCustomers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // 'add', 'edit', 'view'
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("optic_customers")) || [];
    const initData = localData.length > 0 ? localData : sampleCustomers;
    setCustomers(initData);
    localStorage.setItem("optic_customers", JSON.stringify(initData));
  }, []);

  const openModal = (type, customer = null) => {
    setModalType(type);
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const closeModal = () => {
    setModalType("");
    setSelectedCustomer(null);
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updated = [...customers];

    if (modalType === "add") {
      const newCustomer = {
        ...selectedCustomer,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };
      updated.push(newCustomer);
      toast.success("Customer added");
    } else if (modalType === "edit") {
      const index = updated.findIndex((c) => c.id === selectedCustomer.id);
      if (index !== -1) {
        updated[index] = selectedCustomer;
        toast.success("Customer updated");
      }
    }

    setCustomers(updated);
    localStorage.setItem("optic_customers", JSON.stringify(updated));
    closeModal();
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this customer?");
    if (!confirmed) return;

    const updated = customers.filter((c) => c.id !== id);
    setCustomers(updated);
    localStorage.setItem("optic_customers", JSON.stringify(updated));
    toast.success("Customer deleted");
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Customer List</h2>
        <button
          onClick={() => openModal("add", { name: "", email: "", phone: "", address: "", zip: "" })}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Customer
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border rounded">
          <thead>
            <tr className="bg-gray-100 text-sm font-semibold text-gray-700">
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Phone</th>
              <th className="py-2 px-4 border">Address</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b hover:bg-gray-50 text-sm">
                <td className="px-4 py-2 border">{customer.name}</td>
                <td className="px-4 py-2 border">{customer.email}</td>
                <td className="px-4 py-2 border">{customer.phone}</td>
                <td className="px-4 py-2 border">{customer.address}</td>
                <td className="px-4 py-2 border flex gap-3">
                  <FaEye
                    className="text-blue-600 hover:text-blue-800 cursor-pointer"
                    onClick={() => openModal("view", customer)}
                  />
                  <FaEdit
                    className="text-green-600 hover:text-green-800 cursor-pointer"
                    onClick={() => openModal("edit", customer)}
                  />
                  <FaTrash
                    className="text-red-600 hover:text-red-800 cursor-pointer"
                    onClick={() => handleDelete(customer.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={closeModal}
            >
              ✕
            </button>

            {modalType === "view" ? (
              <>
                <h2 className="text-lg font-semibold mb-4">Customer Details</h2>
                <p><strong>Name:</strong> {selectedCustomer.name}</p>
                <p><strong>Email:</strong> {selectedCustomer.email}</p>
                <p><strong>Phone:</strong> {selectedCustomer.phone}</p>
                <p><strong>Address:</strong> {selectedCustomer.address}</p>
                <p><strong>Zip:</strong> {selectedCustomer.zip}</p>
                <p><strong>Joined:</strong> {new Date(selectedCustomer.createdAt).toLocaleDateString()}</p>
              </>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-4">
                <h2 className="text-lg font-semibold mb-2">
                  {modalType === "edit" ? "Edit Customer" : "Add Customer"}
                </h2>
                <input
                  className="border px-3 py-2 rounded"
                  placeholder="Name"
                  value={selectedCustomer.name}
                  onChange={(e) =>
                    setSelectedCustomer({ ...selectedCustomer, name: e.target.value })
                  }
                  required
                />
                <input
                  className="border px-3 py-2 rounded"
                  placeholder="Email"
                  value={selectedCustomer.email}
                  onChange={(e) =>
                    setSelectedCustomer({ ...selectedCustomer, email: e.target.value })
                  }
                  required
                />
                <input
                  className="border px-3 py-2 rounded"
                  placeholder="Phone"
                  value={selectedCustomer.phone}
                  onChange={(e) =>
                    setSelectedCustomer({ ...selectedCustomer, phone: e.target.value })
                  }
                  required
                />
                <input
                  className="border px-3 py-2 rounded"
                  placeholder="Address"
                  value={selectedCustomer.address}
                  onChange={(e) =>
                    setSelectedCustomer({ ...selectedCustomer, address: e.target.value })
                  }
                />
                <input
                  className="border px-3 py-2 rounded"
                  placeholder="Zip"
                  value={selectedCustomer.zip}
                  onChange={(e) =>
                    setSelectedCustomer({ ...selectedCustomer, zip: e.target.value })
                  }
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    {modalType === "edit" ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
