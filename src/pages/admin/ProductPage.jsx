import React, { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import AddProductModal from "@/components/admin/AddProductModal";
import ViewProductModal from "./ViewProductModal";
import { toast } from "react-toastify";
import defaultProducts from "@/data/products"; // Your hardcoded base products

export default function ProductPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [productList, setProductList] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewingProduct, setViewingProduct] = useState(null);

  // Load hardcoded + localStorage products on mount
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("optic_products")) || [];

    // Filter out any duplicates from default based on `id`
    const combined = [...defaultProducts.filter(dp => !storedProducts.find(sp => sp.id === dp.id)), ...storedProducts];
    setProductList(combined);
  }, []);

  // Save custom products only to localStorage (not hardcoded)
  const saveProducts = (products) => {
    // Remove base products (assumed to be static) before saving
    const customProducts = products.filter(p => !defaultProducts.find(dp => dp.id === p.id));
    setProductList(products);
    localStorage.setItem("optic_products", JSON.stringify(customProducts));
  };

  const handleAddOrUpdate = (product) => {
    let updated;
    if (editingProduct) {
      updated = productList.map((p) => (p.id === product.id ? product : p));
      toast.success("Product updated!");
    } else {
      updated = [...productList, product];
      toast.success("Product added!");
    }
    saveProducts(updated);
    setEditingProduct(null);
  };

  const handleDelete = (id) => {
    const updated = productList.filter((p) => p.id !== id);
    saveProducts(updated);
    toast.success("Product deleted");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-secondary">Product Management</h2>
        <button
          onClick={() => {
            setEditingProduct(null);
            setShowAddModal(true);
          }}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary"
        >
          + Add Product
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-xl">
          <thead>
            <tr className="bg-secondary/20 text-left text-sm font-semibold text-secondary">
              <th className="py-2 px-4 border">Image</th>
              <th className="py-2 px-4 border">Title</th>
              <th className="py-2 px-4 border">Brand</th>
              <th className="py-2 px-4 border">Price</th>
              <th className="py-2 px-4 border">Stock</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4 border">
                  <img src={product.image} alt="" className="h-10 w-10 rounded object-cover" />
                </td>
                <td className="py-2 px-4 border font-medium">{product.title}</td>
                <td className="py-2 px-4 border">{product.brand}</td>
                <td className="py-2 px-4 border">₹{product.price.toFixed(2)}</td>
                <td className="py-2 px-4 border">{product.quantity}</td>
                <td className="py-2 px-4 border">
                  <div className="flex gap-3 text-secondary">
                    <button
                      title="View"
                      onClick={() => {
                        setViewingProduct(product);
                        setShowViewModal(true);
                      }}
                    >
                      <FaEye className="hover:text-primary" />
                    </button>
                    <button
                      title="Edit"
                      onClick={() => {
                        setEditingProduct(product);
                        setShowAddModal(true);
                      }}
                    >
                      <FaEdit className="hover:text-green-500" />
                    </button>
                    <button
                      title="Delete"
                      onClick={() => handleDelete(product.id)}
                    >
                      <FaTrash className="hover:text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {productList.length === 0 && (
          <p className="text-center text-secondary py-4">No products available.</p>
        )}
      </div>

      {showAddModal && (
        <AddProductModal
          onClose={() => {
            setShowAddModal(false);
            setEditingProduct(null);
          }}
          onAdd={handleAddOrUpdate}
          editingProduct={editingProduct}
        />
      )}

      {showViewModal && viewingProduct && (
        <ViewProductModal
          product={viewingProduct}
          onClose={() => {
            setShowViewModal(false);
            setViewingProduct(null);
          }}
        />
      )}
    </div>
  );
}
