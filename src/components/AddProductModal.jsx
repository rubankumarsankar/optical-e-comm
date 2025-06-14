import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function ProductFormModal({ onClose, onSubmit, productToEdit }) {
  const isEdit = Boolean(productToEdit);

  const [formData, setFormData] = useState({
    image: "",
    title: "",
    brand: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    if (isEdit && productToEdit) {
      setFormData({
        image: productToEdit.image,
        title: productToEdit.title,
        brand: productToEdit.brand,
        price: productToEdit.price,
        quantity: productToEdit.quantity,
      });
    }
  }, [productToEdit]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    const { image, title, brand, price, quantity } = formData;

    if (!image || !title || !brand || !price || !quantity) {
      toast.error("All fields are required!");
      return;
    }

    const newProduct = {
      id: isEdit ? productToEdit.id : Date.now(),
      image,
      title,
      brand,
      price: parseFloat(price),
      quantity: parseInt(quantity),
    };

    // Get products from localStorage
    const existing = JSON.parse(localStorage.getItem("optic_products")) || [];

    let updated;
    if (isEdit) {
      updated = existing.map((p) => (p.id === newProduct.id ? newProduct : p));
      toast.success("Product updated successfully!");
    } else {
      updated = [...existing, newProduct];
      toast.success("Product added successfully!");
    }

    localStorage.setItem("optic_products", JSON.stringify(updated));
    onSubmit(newProduct); // update parent state
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          {isEdit ? "Edit Product" : "Add New Product"}
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded outline-blue-500"
          />
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded outline-blue-500"
          />
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded outline-blue-500"
          />
          <input
            type="number"
            name="price"
            placeholder="Price (₹)"
            value={formData.price}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded outline-blue-500"
          />
          <input
            type="number"
            name="quantity"
            placeholder="Stock Quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded outline-blue-500"
          />
        </div>

        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {isEdit ? "Update" : "Add"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
