import React, { useState } from "react";
import ProductCard from "@/components/ProductCard";
import products from "@/data/products";
import AddProductModal from "@/components/AddProductModal";

export default function ProductList() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6">
      {/* Header with Add Product Button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Product List</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
        >
          + Add Product
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Add Product Modal */}
      {isModalOpen && <AddProductModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
